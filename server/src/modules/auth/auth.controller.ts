import { Request, Response } from "express";
import authService from "./auth.service.js";
import ApiResponse from "../../common/utils/api-response.js";
import jwt from "jsonwebtoken";

const generateToken = (payload: any) => {
    return jwt.sign(payload, process.env.SECRET as string, {expiresIn: "1d"})
}

const register = async(req: Request, res: Response) => {
    const user = await authService.register(req.body)
    ApiResponse.ok(res, "user created successfully", user)
}

const login = async(req: Request, res: Response) => {
    const user = await authService.login(req.body)

    const token = generateToken(user)
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    })

    ApiResponse.ok(res, "user logged in successfully", user)
}

const sendOtp = async(req: Request, res: Response) => {
    console.log(req.body)
    const user = await authService.sendOtp(req.body.email)
    ApiResponse.ok(res, "user created successfully", user)
}

const verifyOtp = async(req: Request, res: Response) => {
    const user = await authService.verifyOtp(req.body)

    const token = generateToken(user)
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    })
    ApiResponse.ok(res, "user created successfully", user)
}

export {
  register,
  login,
  sendOtp,
  verifyOtp,
};