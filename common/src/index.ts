import { z } from "zod";



export const signupInputSchema = z.object({
    name: z.string().optional(),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters").max(40, "Password can have maximum 40 characters")
        .regex(/[A-Z]/, "Password must contain one uppercase letter")
        .regex(/[a-z]/, "Password must contain one lowercase letter")
        .regex(/[0-9]/, "Password must contain one number")
})
export type SignupType = z.infer<typeof signupInputSchema>


export const signinInputSchema = z.object({

    email: z.email(),
    password: z.string()
})
export type SigninType = z.infer<typeof signinInputSchema>


export const createblogInputSchema = z.object({
    title: z.string(),
    content: z.string()
})
export type CreateblogInputType = z.infer<typeof createblogInputSchema>


export const updateblogInputSchema = z.object({
    title: z.string(),
    content: z.string()
})
export type UpdateblogInputType = z.infer<typeof updateblogInputSchema>
