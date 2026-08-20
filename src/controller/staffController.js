import jwt from "jsonwebtoken";
import {
    registerStaff,
    loginStaff,
    getStaffById,
} from "../services/staffService.js";

const secretKey = process.env.secretKey;

export const register = async (req, res, next) => {
    try {
        const staff = await registerStaff(req.body);

        const staffResponse = staff.toObject();
        delete staffResponse.password;

        res.status(201).json({
            success: true,
            message: "Staff registered successfully",
            staff: staffResponse,
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const staff = await loginStaff(email, password);

        const token = jwt.sign(
            {
                id: staff._id,
                department: staff.department,
            },
            secretKey,
            {
                expiresIn: "1h",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
        });
    } catch (err) {
        next(err);
    }
};

export const getMe = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            staff: req.user,
        });
    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (err) {
        next(err);
    }
};