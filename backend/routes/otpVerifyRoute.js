import express from "express"
import { sendOtp, verifyOtp } from "../controllers/otpController.js";

const otpVerifyRouter = express.Router();

otpVerifyRouter.post("/verifyOtp", verifyOtp);
otpVerifyRouter.post("/sendOtp", sendOtp);

export default otpVerifyRouter;
