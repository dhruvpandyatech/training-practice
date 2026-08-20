import authModel from "../models/AuthModel.js";
import jwt from "jsonwebtoken";
import errors from "../utils/apiError.js";

const secretKey = process.env.secretKey;

const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return next(
                errors.unauthorized("Token not provided. Please login first")
            );
        }

        const decoded = jwt.verify(token, secretKey);

        const userData = await authModel.findById(decoded.id);

        if (!userData) {
            return next(
                errors.unauthorized("User not found. Please login again")
            );
        }

        req.user = userData;

        next();
    } 
    catch (err) {
        next(err);
    }
};

export default authMiddleWare;