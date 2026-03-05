  import { useState,useEffect } from "react";
  import { useParams } from "react-router-dom";
  import useApi from "../../hooks/useAPI";
  import { toast } from "react-toastify";

export default function ProductDetails() {
  const {callApi} = useApi();

  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await callApi("GET",`/listings/getlistingbyId/${id}`);  
        setContent(res.data || null);
      } catch (err) {
        toast.error("Failed to load listing");
      }
    };
    fetchContent();
  }, [id]);

  if (!content) return <p className="text-black text-center py-10">Loading...</p>;

  // Room selection handler functions
  const increment = () => {
    if (rooms < content.Rooms) setRooms(rooms + 1);
    else toast.error("No more rooms available")
  };
  
  const decrement = () => {
    if (rooms > 1) setRooms(rooms - 1);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return 0;
    return content.Price * rooms * nights;
  };

  // Handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!checkInDate || !checkOutDate) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    try {
      setLoading(true);
      const totalPrice = calculateTotalPrice();      
      const bookingData = {
        listingId: parseInt(id),
        checkInDate: new Date(checkInDate).toISOString(),
        checkOutDate: new Date(checkOutDate).toISOString(),
        numberOfRooms: rooms,
        notes
      };

      const res = await callApi("POST", "/bookings", {data:bookingData});
      toast.success("Booking created successfully!");
      
      // Reset form
      setCheckInDate("");
      setCheckOutDate("");
      setNotes("");
      setRooms(1);
      
    } catch (err) {
      toast.error(err.message || "Failed to create booking");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = calculateTotalPrice();
  const nights = checkInDate && checkOutDate 
    ? Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="mx-auto min-h-screen p-6 bg-white text-black shadow-lg">
      {/* Listing Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {content.image_URLS && (
          <img
            src={`http://localhost:3000${Array.isArray(content.image_URLS) ? content.image_URLS[0] : content.image_URLS}`}
            alt={content.ListingName}
            className="w-full md:w-1/2 h-64 md:h-96 object-cover rounded-lg"
          />
        )}

        <div className="flex flex-col justify-between md:w-1/2">
          <div>
            <h1 className="text-3xl font-bold mb-2">{content.ListingName}</h1>
            <p className="text-gray-600 mb-4">{content.Description}</p>
            <p className="text-gray-700 mb-1">📍 Location: {content.ListingLocation}</p>
            <p className="text-gray-700 mb-4">🏠 Rooms Available: {content.Rooms}</p>
            <p className="text-xl font-bold text-orange-400 mb-4">${content.Price} per night</p>
          </div>

          {/* Booking Options */}
          <div className="mt-4 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Book This HomeStay</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Check-in Date */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Check-in Date:
                </label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded bg-gray-200 text-black border border-gray-300 focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Check-out Date */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Check-out Date:
                </label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded bg-gray-200 text-black border border-gray-300 focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Number of Rooms */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Number of Rooms:
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={decrement}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-black font-bold transition"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 bg-gray-200 rounded text-black font-semibold">
                    {rooms}
                  </span>
                  <button
                    type="button"
                    onClick={increment}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-black font-bold transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Special Requests (Optional):
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded bg-gray-200 text-black border border-gray-300 focus:border-orange-500 focus:outline-none resize-none"
                  rows="3"
                  placeholder="Any special requests or notes..."
                />
              </div>

              {/* Price Summary */}
              {totalPrice > 0 && (
                <div className="p-3 bg-gray-200 rounded border border-gray-300">
                  <div className="flex justify-between mb-2">
                    <span>Nights:</span>
                    <span className="font-semibold">{nights}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Price per Night:</span>
                    <span className="font-semibold">${content.Price}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Rooms:</span>
                    <span className="font-semibold">{rooms}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 flex justify-between">
                    <span className="font-bold text-lg">Total Price:</span>
                    <span className="font-bold text-lg text-orange-400">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white px-5 py-3 rounded-lg font-semibold transition"
              >
                {loading ? "Booking..." : "Book Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
