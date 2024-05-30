import { model, models, Schema } from "mongoose";
import { User } from "../types/index";

const UserSchema = new Schema<User>({
    id: String,
    name: String,
    email: String,
    image: String,
    emailVerified: Date,
    phone: String,
}, { timestamps: true });

export const UserModel = models.User || model("User", UserSchema);