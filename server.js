import 'dotenv/config';
import express from 'express'
const app = express();
import connectDb from './src/config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './src/Routes/authRoute.js'
import reviewRouter from "./src/Routes/reviewRoute.js"
import errors from './src/utils/apiError.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';

// Global middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/review",reviewRouter);

app.use(notFound)
app.use(errorHandler)

connectDb().then(() => {
    app.listen(3000, () => {
        console.log("server started listening on PORT 3000");
    })
}).catch((err) => {
    console.log("error in connecting database");
})

