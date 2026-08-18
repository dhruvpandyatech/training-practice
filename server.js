import 'dotenv/config';
import express from 'express'
const app = express();
import connectDb from './src/config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './src/Routes/authRoute.js'
// Global middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
connectDb().then(() => {
    app.listen(3000, () => {
        console.log("server started listening on PORT 3000");
    })
}).catch((err) => {
    console.log("error in connecting database");
})

