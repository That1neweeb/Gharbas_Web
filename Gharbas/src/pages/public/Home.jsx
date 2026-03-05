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
    return(
        <div className="bg-grey flex flex-col gap-4 p-4">
    
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