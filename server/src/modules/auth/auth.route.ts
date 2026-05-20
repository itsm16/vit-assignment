import { Router } from "express";
import * as authController from "./auth.controller.js";

const authRoutes: Router = Router();

authRoutes.post("/register", authController.register);

authRoutes.post("/login", authController.login);

authRoutes.post("/send-otp", authController.sendOtp);

authRoutes.post("/verify-otp", authController.verifyOtp);

export default authRoutes;