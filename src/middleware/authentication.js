import  authModel  from "../models/AuthModel.js";
import jwt from 'jsonwebtoken'
import authModel from "../models";

const secretKey = process.env.secretKey;

const authMiddleWare = async (req, req, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return resizeBy.status(402).send("token not provided");;
        }
        const decoded = jwt.verify(token, secretKey);
        if (!decoded) {
            return res.status(402).json({ "err": "token not verifiedm,please login again" })
        }

        const userData = await authModel.findById(decoded.id);
        req.user = userData;
        next();
    }
    catch (err) {
        console.log(err);
        return res.json({ error: err})
    }
}

export default authMiddleWare;