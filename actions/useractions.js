'use server'
import { ConnectDB } from "@/app/lib/mongoose";
import {Payment} from "@/app/models/Payment";
import Razorpay from "razorpay";

export const initiatePayment = async (amount, paymentDetails,PayerId,RecieverId) => {
    await ConnectDB()
    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_RAZOR_ID, key_secret: process.env.RAZOR_SECRET })

    const order = await instance.orders.create({
        amount: amount,
        currency: "INR"
    })
    await Payment.create({
        PayerId: PayerId,
        RecieverId: RecieverId,
        Oid: order.id,
        amount: amount,
        payerName: paymentDetails.name,
        message: paymentDetails.message
    })
    return order
}