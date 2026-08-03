
import { config } from "dotenv";
config();
import express from "express"
const app = express();
import cookieParser from "cookie-parser";
import z, { email } from "zod"
import bcrypt from "bcrypt"
import { UserModel } from "./dbModels/userModel.js";
import { connectDb } from "./db.js";
import  jwt  from "jsonwebtoken"
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

const signupSchema = z.object({
    name: z.string().min(4).max(40),
    email: z.email(),
    password: z.string().min(8).max(20)
})
const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(20)
})

app.post('/signup', async (req, res) => {
    try {
        // console.log("Inside signup");

        const result = await signupSchema.safeParse(req.body);

        if (!result) {
            console.log(result.error.results);

            res.status(401).json({ "err": result.error.results })
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
        const user =await UserModel.findOne({
            email: email
        })

        if (!user) {
            return res.json({ "error": "user not found" })
        }
        const hashedPassword = user.password;
        console.log(hashedPassword);
        
        const passwordMatched = await bcrypt.compare(password,hashedPassword);
        if (!passwordMatched) {
            return res.status(401).json({ "error": "Invalid credentials" });
        }

        const token = jwt.sign(JSON.stringify(user._id), process.env.JWT_SECRET);
        res.json({ "token": token })

    }
    catch (err) {
        console.log(err);
        
        return res.send(err)
    }
})

async function startServer() {
    await connectDb();


    app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
    })

}



startServer();