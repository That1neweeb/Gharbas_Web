import React, { useState, useEffect } from "react";
import { apiRequest } from "../../utils/api";
import { toast } from "react-toastify";

const Host = () => {
  const [form, setForm] = useState({
    ListingName: "",
    Price: "",
    Rooms: "",
    Description: "",
    ListingLocation: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ListingName: form.ListingName,
        Price: parseFloat(form.Price),
        Rooms: parseInt(form.Rooms, 10),
        Description: form.Description,
        ListingLocation: form.ListingLocation,
      };
      const res = await apiRequest("post", "/listings", { data });
      toast.success(res.message || "Listing created");
    } catch (err) {
      toast.error(err.message || "Failed to create listing");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "32px auto" }}>
      <h2>Create Host Listing</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Listing Name</label>
          <input name="ListingName" value={form.ListingName} onChange={handleChange} required />
        </div>
        <div>
          <label>Price</label>
          <input name="Price" type="number" value={form.Price} onChange={handleChange} required />
        </div>
        <div>
          <label>Rooms</label>
          <input name="Rooms" type="number" value={form.Rooms} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input name="ListingLocation" value={form.ListingLocation} onChange={handleChange} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="Description" value={form.Description} onChange={handleChange} required />
        </div>
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
};

export default Host;
