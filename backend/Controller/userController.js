import { Users } from "../Model/UserModel.js";
import { hashPassword } from "../security/hashPassword.js";
import { Op } from "sequelize";

export const getAll = async (req,res) => {
    try {
        const user = await Users.findAll({
            where: {
                role: { [Op.ne]: 'admin' }
            }
        });
        res.status(200).send({data: user, message: "Data retrieved successfully"});
    } catch(err) {
        res.status(500).send(err);
    }
}



export const getById = async (req,res) => {
    try{
        const {id = null} = req.params;
        const user = await Users.findOne({where: {id} });

        if(!user) {
            res.status(500).send({message:"User not found in table"});
            return;
        }
        res.status(200).send({data: user, message:"user fetched successfully"});
    }
    catch(e){
        res.send(e.message)
    }
}


export const updateById = async (req,res) => {
    try{
        const{id = null} = req.params;
        const body = req.body;
        const user = await Users.findOne({where: {id}});    

        if(!user){
            res.status(500).send({message:"user not found "});
            return;
        }

        user.customerName = body.name;
        user.customerEmail = body.email;
        user.customerPassword = body.password;
    
        await user.save();
        res.send(200).send({data: user, message: "Data updated sucessfully"});
        
    }catch(e){
        res.status(500).send({message: e.message});
    }
}


export const deleteById = async (req, res) => {
    try {
        const { id = null } = req.params;
        const body = req.body;
        const user = await Users.findOne({where: {id}});

        if(!user) {
            res.status(300).send({message: "User not found in table"});
            return;
        }   

        user.destroy();
        res.status(200).send({message: "User deleted successfully"});

    }catch (e) {
        res.status(300).send({message: e.message});
    }
}
// 









