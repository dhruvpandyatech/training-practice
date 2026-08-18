import { Router } from "express";
import { authController } from "../controller/authController.js";
const route = Router();

route.post('/register', authController.registerUser);
route.post('/login', authController.loginUser)
route.post('/logout', authController.logoutUser);
export default route;