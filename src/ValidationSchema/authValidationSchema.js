import z, { email } from 'zod'

const registrationSchema = z.object({
    name:z.string().min(2).max(100).required(),
    email:z.email(),
    password:z.string().min(6).required(),
    role:z.string().max(10).required()
})

const loginSchema = z.object({
  email: z.string().email().required(),
  password: z.string().min(6).required(),
});

export {
    registrationSchema,
    loginSchema
}