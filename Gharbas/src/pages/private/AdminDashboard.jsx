import React, { useState } from "react";
import UserManagement from "./AdminTabs/UserManagement";
import ListingsManagement from "./AdminTabs/ListingsManagement";
import BookingsView from "./AdminTabs/BookingsView";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

        <div className="flex gap-3 mb-6">
          <button
            className={`px-4 py-2 rounded-md font-medium shadow-sm ${
              activeTab === "users"
                ? "bg-indigo-600 text-white"
                : "bg-white border text-gray-700"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium shadow-sm ${
              activeTab === "listings"
                ? "bg-indigo-600 text-white"
                : "bg-white border text-gray-700"
            }`}
            onClick={() => setActiveTab("listings")}
          >
            Listings
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium shadow-sm ${
              activeTab === "bookings"
                ? "bg-indigo-600 text-white"
                : "bg-white border text-gray-700"
            }`}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </button>
        </div>

        <div className="admin-content">
          {activeTab === "users" && <UserManagement />}
          {activeTab === "listings" && <ListingsManagement />}
          {activeTab === "bookings" && <BookingsView />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
