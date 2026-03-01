import { DataTypes,} from "sequelize";
import { sequelize } from "../db/db.js";

export const Users = sequelize.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customerAddress : {
        type: DataTypes.STRING,
        allowNull: false,
    },
       customerEmail : {
        type: DataTypes.STRING,
        allowNull: false,
    },
        phone:{
        type: DataTypes.STRING,
        allowNull:false,
    },
        customerPassword : {
        type: DataTypes.STRING,
        allowNull: false,
    },
        dob : {
        type: DataTypes.DATE,
        allowNull:false,
    },
    role : {
        type:DataTypes.STRING,
        allowNull:false,
    }
    
    
});