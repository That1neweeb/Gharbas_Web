import { where } from "sequelize";
import { Listings } from "../Model/ListingModel.js";

export const getAllListings = async (req,res) => {
    try {
        const listings = await Listings.findAll();
        // console.log(listings);
        res.status(200).send({data: listings, message: "Products fetched successfully"})
    } catch(err) {
        res.status(500).send(err)
    }
}

// listing creation ko lagi
export const save = async(req,res) => {
    const body = req.body

    try{
        // Require authenticated user to be attached by auth middleware
        const user = req.user || null;
        if(!user) {
            return res.status(401).send({ message: "Authentication required" });
        }

        // Only hosts can create listings and only one listing per host
        if(user.role !== "host"){
            return res.status(403).send({ message: "Only hosts can create listings" });
        }

        const existing = await Listings.findAll({ where: { hostId: user.id } });
        if (existing && existing.length >= 1) {
            return res.status(403).send({ message: "A host can create only one listing" });
        }

        // attach hostId to the listing
        const payload = { ...body, hostId: user.id };
        const listings = await Listings.create(payload);
        res.status(200).send({data: listings, message: "Data saved successfully"});
    } catch(e) {
        res.send({message: e.message});
    }
}


export const getListingById = async (req, res) => {
    try{
        const {id = null} = req.params;
        const listings = await Listings.findOne({where: {id}});
        console.log(listings);
        if(!listings){
            res.status(404).send({message:"listing not found in table"});
            return;
        }
        console.log(listings)
        res.status(200).send({data: listings, message:"listings fetched succesfully"});
    }
    catch(e){
        res.send(e.message);

    }
}

// update garnw parcha parameters are wrong 
export const updateById = async (req, res) => {
    try{
        const {id = null} = req.params
        const body = req.body
        const listings = await Listings.findOne({where: {id}});

        if(!listings){
            res.status(500).send({message:"Listing not found"});
            return
        }
        product.productName = body.productName;
        product.productPrice = body.productPrice;
        product.productDescription = body.productDescription;
        product.productLo = body.productLocation;
        product.productQuantity = body.productQuantity;

        await listings.save();
        res.status(200).send({data: product, message: "Product updated successfully"});

    }
    catch(e){

    }
}

// deletion ko lagi 
export const deleteById = async (req, res) => {
    try {
        const { id = null } = req.params;
        const body = req.body;
        const listings = await Listings.findOne({where: {id}});

        if(!listings) {
            res.status(300).send({message: "Listing not found in table"});
            return;
        }   

        listings.destroy();
        res.status(200).send({message: "Listing deleted successfully"});

    }catch (e) {
        res.status(300).send({message: e.message});
    }
}