import  AuthModel  from "../models/AuthModel.js";

import bcrypt from 'bcrypt';
import z from "zod"
import jwt from 'jsonwebtoken'

const secretKey = process.env.secretKey;

const registerationService = async (data) => {
    try {
        const { name, email, password, role } = data;
        const userExist = await AuthModel.findOne({
            email
        })
        if (userExist) {
            throw new Error("user already exist")
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = {
            name: name,
            password: hashedPassword,
            email: email,
            role: role
        }
        await AuthModel.create(newUser);
    }
    catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const loginService = async (data) => {
    try {
        const { email, password } = data;
        const user = await AuthModel.findOne({ email });
        if (!user) {
            throw new Error("user does not exist")
        }
        const hashedPassword = user.password;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (!isMatch) {
            throw new Error("invalid password")
        }

        const token = jwt.sign({id:JSON.stringify(user._id)},secretKey,{expiresIn:"1h"})

        return token;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export const authService = {
    registerationService,
    loginService
}


