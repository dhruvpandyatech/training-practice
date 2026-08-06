const signupSchema = z.object({
    name: z.string().min(4).max(40),
    email: z.email(),
    password: z.string().min(8).max(20)
})
const signinSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(20)
})
