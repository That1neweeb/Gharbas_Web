import React, { useEffect, useState } from "react";
import useApi from "../../../hooks/useAPI";
import { toast } from "react-toastify";


const ListingsManagement = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { callApi } = useApi();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await callApi("GET", "/listings/admin/all");
      setListings(response.data || []);
    } catch (error) {
      toast.error(error.message || "Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async (listingId) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    try {
      await callApi("DELETE", `/listings/${listingId}`);
      setListings(listings.filter((listing) => listing.id !== listingId));
      toast.success("Listing deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete listing");
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading listings...</div>;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Listings Management</h2>
      {listings.length === 0 ? (
        <p className="text-center text-gray-500 py-10">No listings found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rooms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Host Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {listings.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{listing.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{listing.ListingName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{listing.ListingLocation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Rs. {listing.Price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{listing.Rooms}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{listing.host?.customerName || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{listing.host?.customerEmail || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteListing(listing.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListingsManagement;
