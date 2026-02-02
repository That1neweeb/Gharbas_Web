import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const Products = sequelize.define("Products",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productName: {
        type:DataTypes.STRING,
        allowNull: false
    },
    productPrice: {
        type:DataTypes.FLOAT,
        allowNull: false
    },
    productQuantity: {
        type:DataTypes.INTEGER,
        allowNull: false
    },
    productDescription: {
        type:DataTypes.STRING,
        allowNull:false
    },
    productLocation: {
        type:DataTypes.STRING,
        allowNull:false
    },
    image_URLS: {
        type: DataTypes.ARRAY(DataTypes.STRING(100)),
        allowNull:true
    }

});