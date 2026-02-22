import { Link } from "react-router-dom";

export default function ListingCard({ listing  }) {
  return (
    <div className="bg-[#242424] w-full max-w-6xl
             rounded-2xl overflow:hidden 
             shadow-xl shadow-black/30 m-6
             flex flex-col md:flex-row
             h-auto md:h-[320px]">

      {/* Image */}
      <div className="h-1/2 md:w-1/2 md:h-full ">
        <img
          src={`http://localhost:3000${listing.image_URLS}`}
          alt="Listing"
          className="text-white w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between text-[#D1D5DB] md:w-1/2 h-full">
        
        <div>
          <h2 className="text-2xl font-semibold text-white mb-1">
            {listing.ListingName}
          </h2>

          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            {listing.Description}
          </p>

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-300">
                {listing.ListingLocation}
              </span>
            </p>
            <p>
              Rooms Available:{" "}
              <span className="text-gray-300">
                {listing.Rooms}
              </span>
            </p>
          </div>
        </div>

        {/* Price & view details button*/}
        <div className="flex items-center justify-between mt-6">
          <p className="text-xl font-bold text-orange-400">
            ${listing.Price}
          </p>
        <Link to={`/listing/${listing.id}`} >
                <button
            className="bg-orange-500 hover:bg-orange-600
                       text-white px-5 py-2 rounded-lg
                       transition shadow-md hover:shadow-lg"
                >
            View Details
                </button>
        </Link>
          
        </div>
      </div>
    </div>
  );
}
