import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.js";

export const signupService = async (data) => {

    const {
        name,
        email,
        password
    } = data;

    const existingUser = await UserModel.findOne({
        email
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(
        password,
        10
    );

    const user = await UserModel.create({
        name,
        email,
        password: hashedPassword
    });

    return user;
};