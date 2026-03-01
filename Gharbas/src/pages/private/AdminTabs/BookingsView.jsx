import React, { useEffect, useState } from "react";
import useApi from "../../../hooks/useAPI";
import { toast } from "react-toastify";

const getStatusClasses = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const BookingsView = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { callApi } = useApi();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await callApi("GET", "/bookings/admin/all");
      setBookings(response.data || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading bookings...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">All Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No bookings found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white border rounded-lg p-4 shadow hover:shadow-md transform hover:-translate-y-1 transition">
              <div className="flex justify-between items-start border-b pb-2 mb-3">
                <h3 className="text-lg font-semibold">{booking.Listing?.ListingName || "N/A"}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <div className="flex flex-col gap-2 text-sm text-gray-700">
                <p><strong className="text-gray-800">Booking ID:</strong> {booking.id}</p>
                <p><strong className="text-gray-800">Customer:</strong> {booking.User?.customerName}</p>
                <p><strong className="text-gray-800">Email:</strong> {booking.User?.customerEmail}</p>
                <p><strong className="text-gray-800">Phone:</strong> {booking.User?.phone}</p>
                <p><strong className="text-gray-800">Location:</strong> {booking.Listing?.ListingLocation}</p>
                <p><strong className="text-gray-800">Check-in:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                <p><strong className="text-gray-800">Check-out:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                <p><strong className="text-gray-800">Rooms:</strong> {booking.numberOfRooms}</p>
                <p><strong className="text-gray-800">Total Price:</strong> Rs. {booking.totalPrice}</p>
                {booking.notes && (
                  <p><strong className="text-gray-800">Notes:</strong> {booking.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsView;
