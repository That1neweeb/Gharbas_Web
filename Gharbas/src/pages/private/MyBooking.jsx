import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useAPI";
import { toast } from "react-toastify";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { callApi } = useApi();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await callApi("GET", "/bookings");
      setBookings(res.data || []);
    } catch (err) {
      toast.error(err.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await callApi("PATCH", `/bookings/${bookingId}/cancel`);
      toast.success("Booking cancelled successfully");
      fetchBookings();
    } catch (err) {
      toast.error(err.message || "Failed to cancel booking");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-gray-600 mb-4">No bookings yet</p>
            <a
              href="/home"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
            >
              Browse Listings
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Listing Image */}
                {booking.Listing?.image_URLS && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={`http://localhost:3000${booking.Listing.image_URLS[0] || ""}`}
                      alt={booking.Listing.ListingName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Booking Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {booking.Listing?.ListingName}
                      </h2>
                      <p className="text-gray-600 mb-2">
                        📍 {booking.Listing?.ListingLocation}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>

                  {/* Dates and Details */}
                  <div className="space-y-3 mb-4 border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Check-in:</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(booking.checkInDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Check-out:</span>
                      <span className="font-semibold text-gray-900">
                        {new Date(booking.checkOutDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Number of Rooms:</span>
                      <span className="font-semibold text-gray-900">
                        {booking.numberOfRooms}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Total Price:</span>
                      <span className="font-bold text-orange-500 text-lg">
                        ${booking.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  {booking.notes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded">
                      <p className="text-sm text-gray-600">
                        <strong>Notes:</strong> {booking.notes}
                      </p>
                    </div>
                  )}

                  {/* Cancel Button */}
                  {booking.status === "pending" || booking.status === "confirmed" ? (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
                    >
                      Cancel Booking
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;
