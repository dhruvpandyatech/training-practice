import express from "express";
import {
    register,
    login,
    getMe,
    logout,
} from "../controllers/staffController.js";

import authMiddleWare from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/staff/register", register);

router.post("/staff/login", login);

router.get("/staff/me", authMiddleWare, getMe);

router.post("/staff/logout", authMiddleWare, logout);

export default router;