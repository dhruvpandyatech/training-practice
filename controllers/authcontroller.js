
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
