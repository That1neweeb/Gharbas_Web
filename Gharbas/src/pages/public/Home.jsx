import { useEffect, useState } from "react";
import useApi from "../../hooks/useAPI";
import ListingCard from "../../component/ListingCard";
function Home(){
    const [listings,setListings] = useState([]);
    const {callApi} = useApi();

    const getListings = async() => {
     try{
        const res =  await callApi("GET","/listings/getAllListings");
        console.log(res.data);
        setListings(res.data);  

     }
    catch(err){
        console.log(err);
    }   
    }

    useEffect(() => {
        getListings();
    }, []);
// const products =[{
// id:1, productName:"listing 1", productDescription:"This is listing 1", productPrice:100, productQuantity:3, productLocation:"Location 1",
// image_URLS:"/uploads/placeholder.png"
//   }];
    return(
        <div className="bg-grey flex flex-col gap-4 p-4">
            <input className="w-full h-[24px]" placeholder="Search bar"></input>
            <div className="flex justify-center md:wrap-flex ">
                {listings.map( listing=>(
                    <ListingCard listing={listing} key={listing.id}/>
                )

                )

                }
            </div>
        </div>
    );
}
export default Home;