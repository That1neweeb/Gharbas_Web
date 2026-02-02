import { useEffect, useState } from "react";
import useApi from "../../hooks/useAPI";
import Product from "./ProductDetails";
import ProductCard from "../../component.jsx/productCard";
import image from "../assets/elementor-placeholder-image.png";

function Home(){
    // const [products,setProducts] = useState();
    // const {callApi} = apiRequest();
    // const getListings = async() => {
    //  try{
    //     const res =  await callApi("GET","/listings/getAllListings");
    //     const data = await res.json();
    //     setProducts(data);

    //  }
    // catch(err){
    //     console.log(err);
    // }   
    // }
    // useEffect = (
    //     () => {
    //             getListings();
    //     } , []
    // );
const products =[{
id:1, productName:"listing 1", productDescription:"This is listing 1", productPrice:100, productQuantity:3, productLocation:"Location 1",
image_URLS:image
  }];
    return(
        <div className="bg-grey flex flex-col gap-4 p-4">
            <input className="w-full h-[24px]" placeholder="Search bar"></input>
            <div className="flex justify-center md:wrap-flex ">
                {products.map( product=>(
                    <ProductCard product={product} key={product.id}/>
                )

                )

                }
            </div>
        </div>
    );
}
export default Home;