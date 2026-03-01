
import {Sequelize} from "sequelize";

export const sequelize = new Sequelize("Gharbas","postgres","root",{
    host : "localhost",
    dialect : "postgres",
}); 

export const connection = async () => {
    try{
        // Initialize associations dynamically to avoid circular import issues
        const { initializeAssociations } = await import("../Model/associations.js");
        await initializeAssociations();

        await sequelize.sync({alter:true});
        console.log("database connected successfully");
    }

    catch(e){
        console.log(e);
    }
}


