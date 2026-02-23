import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const Listings = sequelize.define("Listings",{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ListingName: {
        type:DataTypes.STRING,
        allowNull: false
    },
    Price: {
        type:DataTypes.FLOAT,
        allowNull: false
    },
    Rooms: {
        type:DataTypes.INTEGER,
        allowNull: false
    },
    Description: {
        type:DataTypes.STRING,
        allowNull:false
    },
    ListingLocation: {
        type:DataTypes.STRING,
        allowNull:false
    },
    image_URLS: {
        type: DataTypes.ARRAY(DataTypes.STRING(100)),
        allowNull:true
    },
    hostId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "references Users.id - the host who created this listing"
    }

});