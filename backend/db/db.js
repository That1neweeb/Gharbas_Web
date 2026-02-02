
import {Sequelize} from "sequelize";

export const sequelize = new Sequelize("Gharbas","postgres","root",{
    host : "localhost",
    dialect : "postgres",
});

export const connection = () => {
    try{
        sequelize.sync();
        console.log("database connected successfully");
    }

    catch(e){
        console.log(e);
    }
}


