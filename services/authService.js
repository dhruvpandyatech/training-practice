import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserModel } from "../dbModels/userModel.js";


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


export const signinService = async (data) => {

    const {
        email,
        password
    } = data;

    
    const user = await UserModel.findOne({
        email
    });

    if (!user) {
        throw new Error("User not found");
    }


    const passwordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatched) {
        throw new Error("Invalid credentials");
    }

    
    const token = jwt.sign(
        {
            userId: user._id
        },
        process.env.JWT_SECRET
    );

    return token;
};