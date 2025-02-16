import { Router } from "express";
import {
    checkPaymentStatus,
    initiatePayment,
  } from "../controllers/paymentController.js";

export const paymentRouter = Router();

paymentRouter.post("/check-payment-status", checkPaymentStatus);
paymentRouter.post("/esewa-payment/:bookingId", initiatePayment)