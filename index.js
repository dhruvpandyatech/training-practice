import { config } from "dotenv";
config();
import express from "express"
const app = express();
import cookieParser from "cookie-parser";
import z, { email } from "zod"
import bcrypt from "bcrypt"
import { UserModel } from "./dbModels/userModel.js";
import { connectDb } from "./db.js";
import jwt from "jsonwebtoken"
import { ProductModel } from "./dbModels/productModel.js";
import { createStandardJSONSchemaMethod } from "zod/v4/core";
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;



const authMiddleWare = () => {
    const token = req.cookie.token;
    const isValid = jwt.verify(token, JWT_SECRET);
    if (!isValid) {
        return res.json({ "err": "invalid credentials" })
    }
    next();
}




app.post('/signup', async (req, res) => {
    try {
        // console.log("Inside signup");
        const { email } = req.body.name;
        const user = UserModel.findOne({
            email: result.data.email
        })
        if (user) {
            return res.json({ "mssge": "user alreadt exists, try with a diff email" })
        }
        const result = await signupSchema.safeParse(req.body);

        if (!result) {
            console.log(result.error.results);

            res.status(401).json({ "err": "error in user" })
        }
        // console.log(result.data);
        // console.log(req.body);

        const { name, email, password } = result.data;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        res.status(200).json({ "mssge": "User created successfully" });
    }
    catch (err) {
        console.log(err);
        res.json(err);
    }
})


app.post("/signin", async (req, res) => {
    try {
        const result = await signinSchema.safeParse(req.body);
        if (!result) {
            console.log(result.error.results);
            res.status(401).json({ "err": result.err.results })
        }
        console.log(result.data);

        const { email, password } = result.data;
        const user = await UserModel.findOne({
            email: email
        })

        if (!user) {
            return res.json({ "error": "user not found" })
        }
        const hashedPassword = user.password;
        console.log(hashedPassword);

        const passwordMatched = await bcrypt.compare(password, hashedPassword);
        if (!passwordMatched) {
            return res.status(401).json({ "error": "Invalid credentials" });
        }

        const token = jwt.sign(JSON.stringify(user._id), process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
        })
    }
    catch (err) {
        console.log(err);

        return res.send(err)
    }
})

app.post("/logout", async (req, res) => {
    try {
        res.clearCookie("token")

        res.status(200).json({ "message": "logged out." })
    }
    catch (err) {
        res.json({ "message": "invalid pssword." });
    }
})

app.post("/create", authMiddleWare, async (req, res) => {
    try {
        const { name, SKU, description, price, category } = req.body;

        await ProductModel.create({
            "name": name,
            "SKU": SKU,
            "description": description,
            "price": price,
            "category": category
        })
        res.status(200).json({
            "message": "Product created."
        })
    }
    catch (err) {
        res.status(404).json({ err: "error in creating product" })
        console.log(err);
    }
})

app.get("/get", async (req, res) => {
    try {
        const { page, limit } = req.query;
        const allProducts = await ProductModel.find({}).skip((page - 1) * limit).limit(limit);
        res.json(allProducts);
    }
    catch (err) {
        res.json({ "message": "error creating a product" })
    }
})

app.get("/getSingleProduct/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.find({
            _id: id
        })
        if (!product) {
            return res.json({ "error": "Product does not exist" });
        }
        return res.json({
            product: product
        })
    }

    catch (err) {
        console.log(err);
        return res.json({ "err": "check logs" })
    }
})

app.delete("/deleteProduct:id", authMiddleWare, (req, res) => {
    try {
        const id = req.params.id;
        const response = await ProductModel.findByIdAndDelete({
            _id: id
        })
        if (!response) {
            return res.json({ "err": "product does not exist" });
        }
        return res.json({ "mssge": "product deleted successfully" })
    }
    catch (err) {
        console.log(err);
        return res.json({ "err": "error came while deleting the product" })

    }
})



async function startServer() {
    await connectDb();


    app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
    })

}
startServer();