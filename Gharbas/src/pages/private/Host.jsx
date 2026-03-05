import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../../hooks/useAPI";
import { set } from "zod";

const Host = () => {
  const [form, setForm] = useState({
    ListingName: "",
    Price: "",
    Rooms: "",
    Description: "",
    ListingLocation: "",
    image_URLS: "",

  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {callApi} = useApi();

  // Initial Loading
  useEffect(()=> {
    const fetchContent = async() => {
     try{
        const res =  await callApi("GET","/listings/getListingByHost");
        // console.log(res.data)
        setForm((res.data)?res.data:[]);  
        setImagePreview(`http://localhost:3000${res.data.image_URLS}`);
      
    }
    catch(err){
      console.log(res.message);
    } 
    }
    
    fetchContent();
  },[])

// handle change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

// Handle submission 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('ListingName', form.ListingName);
      formData.append('Price', form.Price);
      formData.append('Rooms', form.Rooms);
      formData.append('Description', form.Description);
      formData.append('ListingLocation', form.ListingLocation);
      if (image) formData.append('image', image);

      const res = await callApi("POST", "/listings", { data: formData });
      toast.success(res.message || "Listing Updated");
    } catch (err) {
      toast.error(err.message || "Failed to create listing");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        
        <div className="flex justify-between items-start mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create a New Listing
            </h2>
            <p className="text-gray-500">
              Add details about your property to start hosting.
            </p>
          </div>
          <Link
            to="/host/bookings"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition shadow-md hover:shadow-lg whitespace-nowrap flex-shrink-0"
          >
            View Bookings
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Listing Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Listing Name
            </label>
            <input
              name="ListingName"
              value={form.ListingName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Cozy Apartment in City Center"
            />
          </div>

          {/* Price & Rooms Row */}
          <div className="grid grid-cols-2 gap-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (per night)
              </label>
              <input
                name="Price"
                type="number"
                value={form.Price}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="120"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rooms
              </label>
              <input
                name="Rooms"
                type="number"
                value={form.Rooms}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="2"
              />
            </div>

          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              name="ListingLocation"
              value={form.ListingLocation}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Kathmandu, Nepal"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="Description"
              value={form.Description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              placeholder="Describe your property..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            {imagePreview && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
            {!imagePreview && form.image_URLS && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                <img 
                  src={`http://localhost:3000/${form.image_URLS}`}
                  alt="Current" 
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (file) {
                  setImage(file);
                  const preview = URL.createObjectURL(file);
                  setImagePreview(preview);
                }
              }}
              className="w-full"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600
                        text-white px-5 py-2 rounded-lg
                        transition shadow-md hover:shadow-lg"
            >
              Create Listing
          </button>
          </div>
          

        </form>
      </div>
    </div>
  );
};

export default Host;