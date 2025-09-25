import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const PaymentSchema = new Schema({
    PayerId: { type: String, required: true },
    RecieverId: { type: String, required: true },
    Oid: { type: String, required: true },
    amount: { type: Number, required: true },
    payerName: { type: String, required: true },
    message: { type: String, required: true },
    done: { type: Boolean, default: false },
    startedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
