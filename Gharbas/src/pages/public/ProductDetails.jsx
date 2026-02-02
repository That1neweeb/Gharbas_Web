import { useState } from "react";

export default function ProductDetails() {
  // const { id } = useParams();
  // const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // for booking quantity

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const res = await fetch(`/api/listings/getlistingbyId/${id}`);
  //     const data = await res.json();
  //     setProduct(data);
  //   };
  //   fetchProduct();
  // }, [id]);

  // if (!product) return <p>Loading...</p>;

  // Handler functions
  const increment = () => {
    if (quantity < product.productQuantity) setQuantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const product =[{
  id:1, productName:"listing 1", productDescription:"This is listing 1", productPrice:100, productQuantity:3, productLocation:"Location 1",
  image_URLS:image
    }];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#1F1F1F] text-white rounded-xl shadow-lg">
      {/* Product Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image_URLS}
          alt={product.productName}
          className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-lg"
        />

        <div className="flex flex-col justify-between md:w-1/2">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
            <p className="text-gray-400 mb-4">{product.productDescription}</p>
            <p className="text-gray-300 mb-1">Location: {product.productLocation}</p>
            <p className="text-gray-300 mb-4">Rooms Available: {product.productQuantity}</p>
            <p className="text-xl font-bold text-orange-400 mb-4">${product.productPrice}</p>
          </div>

          {/* Booking Options */}
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Book This Product</h2>
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
                  type="time"
                  className="ml-2 px-2 py-1 rounded bg-gray-800 text-white"
                />
              </label>

              {/* Quantity with Plus/Minus Buttons */}
              <div className="flex items-center gap-3 mt-2">
                <span>Quantity:</span>
                <button
                  type="button"
                  onClick={decrement}
                  className="px-3 py-1 bg-gray-700 rounded text-white font-bold"
                >
                  −
                </button>
                <span className="px-3">{quantity}</span>
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
