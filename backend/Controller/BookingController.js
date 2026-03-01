import { Users } from "../Model/UserModel.js";
import { Bookings } from "../Model/BookingModel.js";
import { Listings } from "../Model/ListingModel.js";

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        console.log(req.body);
        const { listingId, checkInDate, checkOutDate, numberOfRooms, notes } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ message: "User not authenticated" });
        }

        if (!listingId || !checkInDate || !checkOutDate || !numberOfRooms) {
            return res.status(400).json({ message: "Missing required booking details" });
        }

        // Get listing details
        const listing = await Listings.findByPk(listingId);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Validate room count
        if (numberOfRooms > listing.Rooms) {
            return res.status(400).json({ message: "Not enough rooms available" });
        }

        // Calculate total price
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        
        if (nights <= 0) {
            return res.status(400).json({ message: "Check-out date must be after check-in date" });
        }

        const totalPrice = listing.Price * numberOfRooms * nights;

        // Create booking
        const booking = await Bookings.create({
            userId,
            listingId,
            checkInDate,
            checkOutDate,
            numberOfRooms,
            totalPrice,
            notes,
            status: "pending"
        });

        res.status(201).json({
            message: "Booking created successfully",
            data: booking
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating booking", error: err.message });
    }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(400).json({ message: "User not authenticated" });
        }

        const bookings = await Bookings.findAll({
            where: { userId },
            include: [
                {
                    model: Listings,
                    attributes: ["id", "ListingName", "Price", "ListingLocation", "image_URLS"]
                },
                {
                    model: Users,
                    attributes: ["id", "customerName", "customerEmail", "phone"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({
            message: "Bookings retrieved successfully",
            data: bookings
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching bookings", error: err.message });
    }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Bookings.findByPk(id, {
            include: [
                {
                    model: Listings,
                    attributes: ["ListingName", "Price", "ListingLocation", "image_URLS"]
                }
            ]
        });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({
            message: "Booking retrieved successfully",
            data: booking
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching booking", error: err.message });
    }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        const booking = await Bookings.findByPk(id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Only allow user to cancel their own booking
        if (booking.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized to cancel this booking" });
        }

        await booking.update({ status: "cancelled" });

        res.status(200).json({
            message: "Booking cancelled successfully",
            data: booking
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error cancelling booking", error: err.message });
    }
};

// Update booking status (admin/host only)
export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const booking = await Bookings.findByPk(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        await booking.update({ status });

        res.status(200).json({
            message: "Booking status updated successfully",
            data: booking
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating booking", error: err.message });
    }
};

// Get all bookings for admin
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Bookings.findAll({
            include: [
                {
                    model: Listings,
                    attributes: ["ListingName", "Price", "ListingLocation", "image_URLS"]
                },
                {
                    model: Users,
                    attributes: ["id", "customerName", "customerEmail", "phone"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({
            message: "All bookings retrieved successfully",
            data: bookings
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching bookings", error: err.message });
    }
};

// Get bookings for a host (pending bookings for their listings)
export const getHostBookings = async (req, res) => {
    try {
        const hostId = req.user?.id;

        if (!hostId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const bookings = await Bookings.findAll({
            include: [
                {
                    model: Listings,
                    where: { hostId },
                    attributes: ["ListingName", "Price", "ListingLocation", "image_URLS", "hostId"]
                },
                {
                    model: Users,
                    attributes: ["id", "customerName", "customerEmail", "phone"]
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        res.status(200).json({
            message: "Host bookings retrieved successfully",
            data: bookings
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching host bookings", error: err.message });
    }
};

// Host approve booking
export const approveBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const hostId = req.user?.id;

        const booking = await Bookings.findByPk(id, {
            include: [
                {
                    model: Listings,
                    attributes: ["ListingName", "hostId"]
                }
            ]
        });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Verify host owns the listing
        if (booking.Listing.hostId !== hostId) {
            return res.status(403).json({ message: "Unauthorized to approve this booking" });
        }

        await booking.update({ status: "confirmed" });

        res.status(200).json({
            message: "Booking approved successfully",
            data: booking
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error approving booking", error: err.message });
    }
};

// Host reject booking
export const rejectBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const hostId = req.user?.id;

        const booking = await Bookings.findByPk(id, {
            include: [
                {
                    model: Listings,
                    attributes: ["ListingName", "hostId"]
                }
            ]
        });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Verify host owns the listing
        if (booking.Listing.hostId !== hostId) {
            return res.status(403).json({ message: "Unauthorized to reject this booking" });
        }

        await booking.update({ status: "cancelled" });

        res.status(200).json({
            message: "Booking rejected successfully",
            data: booking
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error rejecting booking", error: err.message });
    }
};
