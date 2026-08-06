import {
    signupSchema,
    signinSchema
} from "../validators/authValidator.js";

import {
    signupService,
    signinService
} from "../services/authService.js";



export const signup = async (req, res) => {
    try {

        
        const result = signupSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                error: result.error
            });
        }

        
        const user = await signupService(result.data);

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {

        console.log(err);

        return res.status(400).json({
            error: err.message
        });
    }
};


// SIGNIN
export const signin = async (req, res) => {
    try {

        
        const result = signinSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                error: result.error
            });
        }

        
        const token = await signinService(result.data);


        res.cookie("token", token, {
            httpOnly: true
        });

        return res.status(200).json({
            message: "Signin successful"
        });

    } catch (err) {

        console.log(err);

        return res.status(401).json({
            error: err.message
        });
    }
};



export const logout = async (req, res) => {
    try {

        res.clearCookie("token");

        return res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            error: "Something went wrong"
        });
    }
};