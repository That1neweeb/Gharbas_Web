import { where } from "sequelize";
import { Products } from "../Model/ProductModel.js";

export const getAllListings = async (req,res) => {
    try {
        const products = await Products.findAll();
        res.status(200).send({data: products, message: "Products fetched successfully"})
    } catch(err) {
        res.status(500).send(err)
    }
}

export const save = async(req,res) => {
    const body = req.body

    try{
        const products = await Products.create(body);
        res.status(200).send({data: products, message: "Data saved successfully"});
    } catch(e) {
        res.send({message: e.message});
    }
}


export const getListingById = async (req, res) => {
    try{
        const {id = null} = req.params;
        const product = await Products.findOne({where: {id}});

        if(!product){
            res.status(500).send({message:"Product not found in table"});
            return;
        }
        res.status(200).send({data: product, message:"listings fetched succesfully"});
    }
    catch(e){
        res.send(e.message);

    }
}

export const updateById = async (req, res) => {
    try{
        const {id = null} = req.params
        const body = req.body
        const product = await Products.findOne({where: {id}});

        if(!product){
            res.status(500).send({message:"Product not found"});
            return
        }
        product.productName = body.productName;
        product.productPrice = body.productPrice;
        product.productDescription = body.productDescription;
        product.productLo = body.productLocation;
        product.productQuantity = body.productQuantity;

        await product.save();
        res.status(200).send({data: product, message: "Product updated successfully"});

    }
    catch(e){

    }
}
export const deleteById = async (req, res) => {
    try {
        const { id = null } = req.params;
        const body = req.body;
        const product = await Products.findOne({where: {id}});

        if(!product) {
            res.status(300).send({message: "Product not found in table"});
            return;
        }   

        product.destroy();
        res.status(200).send({message: "Product deleted successfully"});

    }catch (e) {
        res.status(300).send({message: e.message});
    }
}