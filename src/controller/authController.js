import { authService } from "../services/authService.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        await authService.registerationService({ name, email, password, role });
        return res.status(201).json({ mssge: "user created successfully" })
    }
    catch (err) {
        res.status(500).json({ error: "Internal server error" })
        console.log(err);
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.loginService({ email, password });
        res.cookie("token", token, { httpOnly: true })
        res.status(200).json({ mssge: "Login successfull" })
    }
    catch (err) {
        console.log(err);
        return res.json({ err: err.message })
    }
}

const logoutUser = (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true });
        res.send("logout successfull")
    }
    catch (err) {
        console.log(err);
    }
}



export const authController = {
    registerUser,
    loginUser,
    logoutUser
}


