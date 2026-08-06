import { config } from "dotenv";
config();

import express from "express";
import cookieParser from "cookie-parser";

import { connectDb } from "./db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

r
async function startServer() {
    try {
        await connectDb();

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });

    } catch (err) {
        console.log("Database connection failed:", err);
    }
}

startServer();