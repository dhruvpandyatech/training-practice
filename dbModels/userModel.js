import mongoose from "mongoose";

const userModel = {
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    }
}

export const UserModel = mongoose.model(
    "users", userModel
)
