  import { useState,useEffect } from "react";
  import { useParams } from "react-router-dom";
  import useApi from "../../hooks/useAPI";
import { toast } from "react-toastify";
export default function ProductDetails() {
  const {callApi} = useApi();

  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [Rooms, setRooms] = useState(1); // for booking quantity

  useEffect(() => {
    const fetchContent = async () => {
      const res = await callApi("GET",`/listings/getlistingbyId/${id}`);  
      console.log(res.data);
      setContent((res.data)?res.data:[]);
    };
    fetchContent();
  }, [id]);

  if (!content) return <p>Loading...</p>;

  // Room selection handler functions
  const increment = () => {
    if (Rooms < content.Rooms) setRooms(Rooms + 1);
    else toast.error("No more rooms available")
  };
  const decrement = () => {
    if (Rooms > 1) setRooms(Rooms - 1);
  };
// Date manager Function
const datehandler = () => {}


  return (
    <div className="mx-auto h-max-[90vh] p-6  bg-[#1F1F1F] text-white shadow-lg">
      {/* Listing Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`http://localhost:3000${content.image_URLS}`}
          alt={content.productName}
          className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-lg"
        />

        <div className="flex flex-col justify-between md:w-1/2">
          <div>
            <h1 className="text-3xl font-bold mb-2">{content.ListingName}</h1>
            <p className="text-gray-400 mb-4">{content.Description}</p>
            <p className="text-gray-300 mb-1">Location: {content.ListingLocation}</p>
            <p className="text-gray-300 mb-4">Rooms Available: {content.Rooms}</p>
            <p className="text-xl font-bold text-orange-400 mb-4">${content.Price}</p>
          </div>

          {/* Booking Options */}
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Book This HomeStay</h2>
            <form className="flex flex-col gap-3">
              <label>
                Select Date:
                <input
                  type="date"
                  className="ml-2 px-2 py-1 rounded bg-gray-800 text-white"
                />
              </label>
              <label>
                Select Time:
                <input
                  type="datetime-local"
                  id="timeInput"
                  onChange={datehandler}
                  className="ml-2 px-2 py-1 rounded bg-gray-800 text-white"
                />
              </label>

              {/* Quantity with Plus/Minus Buttons */}
              <div className="flex items-center gap-3 mt-2">
                <span>Rooms:</span>
                <button
                  type="button"
                  onClick={decrement}
                  className="px-3 py-1 bg-gray-700 rounded text-white font-bold"
                >
                  −
                </button>
                <span className="px-3">{Rooms}</span>
                <button
                  type="button"
                  onClick={increment}
                  className="px-3 py-1 bg-gray-700 rounded text-white font-bold"
                >
                  +
                </button>
              </div>

              <button
                type="submit"
                className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
