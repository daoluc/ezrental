import { Booking } from "@/types";
import mongoose, { Schema } from "mongoose";

const BookingSchema = new Schema<Booking>({
    itemid: {
        type: mongoose.Types.ObjectId,
        ref: 'Item',
    },
    guestid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    rentstart: Date,
    rentend: Date,
    duration: Number,
    durationtype: String,
    amount: Number,
    comment: String,
    rating: Number,
    stripeid: String,
    status: String,
}, { timestamps: true })

export const BookingModel = mongoose.models.Booking || mongoose.model<Booking>('Booking', BookingSchema);