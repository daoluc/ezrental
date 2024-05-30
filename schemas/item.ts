import { Item } from "@/types";
import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema<Item>({
    name: String,
    hostid: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    price: {
        daily: Number,
        hourly: Number,
    },
    photos: [String],
    description: String,
    status: String,
    category: String,
    numberOfBookings: Number,
}, { timestamps: true })

export const ItemModel = mongoose.models.Item || mongoose.model<Item>('Item', ItemSchema);