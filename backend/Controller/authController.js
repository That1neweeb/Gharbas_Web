import {Users} from "../Model/UserModel.js";
import { generateteToken } from "../security/jwt-utils.js";
import { hashPassword } from "../security/hashPassword.js";

export const login = async(req, res) => {
    const body = req.body;
try{
if(!body.email){
        res.status(400).json({message: "Email is required"});
        return;
    }

    if(!body.password){
        res.status(400).json({message: "Password is required"});
        return;
    }

    if(body.email === ""){
        res.status(400).json({message: "Email cannot be empty"});
        return;
    }

    if(body.password === ""){
        res.status(400).json({message: "Password cannot be empty"});
        return;
    }

    const user = await Users.findOne({where: {customerEmail: body.email}});

    if(!user){
        res.status(404).send("User not found");
        return;
    }

    if(user.customerPassword !==  body.password){
        res.status(401).send("Invalid password");
        return;
    }
    const token = generateteToken({user:Users.toJSON()})
    res.status(200).send({access_token: token, message:"token generated successfully"});
}

catch(e){
    res.status(500).send({message: e.message});
}
}
// register controller
export const register = async (req, res) => {
  try {
    const {
      fullname,
      email,
      address,
      password,
      confirmpassword,
      dob,
      phone,
      gender,
    } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await Users.create({
      customerName: fullname,
      customerEmail: email,
      customerAddress: address,
      phone,
      dob,
      gender,
      customerPassword: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      data: user,
    });

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
