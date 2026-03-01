import React, { useEffect, useState } from "react";
// import { Navbar } from "../../component/Navbar";
import useApi from "../../hooks/useAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const HostBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("pending");
  const { callApi } = useApi();

  useEffect(() => {
    fetchHostBookings();
  }, []);

  const fetchHostBookings = async () => {
    setLoading(true);
    try {
      const response = await callApi("GET", "/bookings/host/bookings");
      setBookings(response.data || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveBooking = async (bookingId) => {
    try {
      await callApi("PATCH", `/bookings/${bookingId}/approve`);
      toast.success("Booking approved successfully");
      fetchHostBookings();
    } catch (error) {
      toast.error(error.message || "Failed to approve booking");
    }
  };

  const handleRejectBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to reject this booking?")) {
      return;
    }
    try {
      await callApi("PATCH", `/bookings/${bookingId}/reject`);
      toast.success("Booking rejected successfully");
      fetchHostBookings();
    } catch (error) {
      toast.error(error.message || "Failed to reject booking");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filterStatus === "all") return true;
    return booking.status === filterStatus;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-600 text-lg">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Booking Requests</h1>
        <p className="text-gray-600 text-lg mb-8">Manage and approve booking requests from customers</p>

        <div className="flex flex-wrap gap-3 mb-8">
          {["pending", "confirmed", "cancelled", "all"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                filterStatus === status
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-white text-gray-700 border-2 border-gray-300 hover:border-red-500 hover:text-red-500"
              }`}
            >
              {status === "all"
                ? `All (${bookings.length})`
                : `${status.charAt(0).toUpperCase() + status.slice(1)} (${
                    bookings.filter((b) => b.status === status).length
                  })`}
            </button>
          ))}
        </div>

        {filteredBookings.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">
              No {filterStatus !== "all" ? filterStatus : ""} bookings found
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Status Header */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-end">
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide ${getStatusBadgeClass(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                {/* Content */}
                <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Listing Details */}
                  <div className="md:border-r md:border-gray-200 md:pr-6">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4 pb-2 border-b-2 border-red-500 inline-block">
                      Listing Details
                    </h3>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-900">Property:</strong> {booking.Listing?.ListingName}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-900">Location:</strong> {booking.Listing?.ListingLocation}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-900">Price per night:</strong> Rs. {booking.Listing?.Price}
                      </p>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="md:border-r md:border-gray-200 md:pr-6">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4 pb-2 border-b-2 border-red-500 inline-block">
                      Customer Information
                    </h3>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-900">Name:</strong> {booking.User?.customerName}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-900">Email:</strong> {booking.User?.customerEmail}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-900">Phone:</strong> {booking.User?.phone}
                      </p>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4 pb-2 border-b-2 border-red-500 inline-block">
                      Booking Details
                    </h3>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-900">Check-in:</strong>{" "}
                        {new Date(booking.checkInDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-900">Check-out:</strong>{" "}
                        {new Date(booking.checkOutDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-900">Rooms:</strong> {booking.numberOfRooms}
                      </p>
                      <p className="text-sm font-semibold text-red-600 pt-2 border-t border-gray-200">
                        <strong>Total Price:</strong> Rs. {booking.totalPrice}
                      </p>
                      {booking.notes && (
                        <p className="text-sm text-gray-700 mt-3">
                          <strong className="text-gray-900">Notes:</strong> {booking.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-3">
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApproveBooking(booking.id)}
                        className="flex-1 min-w-[150px] px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg uppercase text-sm tracking-wide"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => handleRejectBooking(booking.id)}
                        className="flex-1 min-w-[150px] px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg uppercase text-sm tracking-wide"
                      >
                        ✕ Reject
                      </button>
                    </>
                  )}
                  {booking.status === "confirmed" && (
                    <div className="w-full px-4 py-2 bg-green-100 text-green-800 rounded-lg text-center font-semibold">
                      ✓ Booking Approved
                    </div>
                  )}
                  {booking.status === "cancelled" && (
                    <div className="w-full px-4 py-2 bg-red-100 text-red-800 rounded-lg text-center font-semibold">
                      ✕ Booking Rejected
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostBookings;
