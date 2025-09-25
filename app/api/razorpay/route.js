import { NextResponse } from "next/server";
import { ConnectDB } from "@/app/lib/mongoose";
import crypto from "crypto";
import { Payment } from "@/app/models/Payment";

export const POST = async (request) => {
    try {
        await ConnectDB()
        const body = await request.json()
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
        const order = await Payment.findOne({ Oid: razorpay_order_id });
        if (!order) {
            return NextResponse.json({ error: "Order not found in database" },{ status: 404 });
        }
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZOR_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        const isValid = generatedSignature === razorpay_signature;

        if (!isValid) {
            return NextResponse.json({ error: "Invalid payment signature" },{ status: 400 });
        }
        await Payment.findOneAndUpdate({ Oid: razorpay_order_id },{ done: true },{ new: true });

        return NextResponse.json({ success: true, message: "Payment verified successfully" },{ status: 200 });
    } catch (error) {
        console.error("Error verifying Razorpay payment:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}