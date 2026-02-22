import express from "express";
import { login, register } from "../Controller/authController.js";

export const authRouter = express.Router();

authRouter.post("/login",login);
authRouter.post("/register",register);