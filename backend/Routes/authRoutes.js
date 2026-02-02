import express from "express";
import { login, register } from "../Controller/authController.js";

export const authRouter = express.Router();

authRouter.post("/Login",login);
authRouter.post("/register",register);