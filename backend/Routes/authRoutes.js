import express from "express";
import { login, register } from "../Controller/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

export const authRouter = express.Router();

authRouter.post("/login",login);
authRouter.post("/register",register);

// For fectching the current user info
authRouter.get("/me",authenticate, (req,res)=> {
    res.status(200).json({user : req.user})
});