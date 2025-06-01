import { z } from 'zod';

export interface ISignUpSchema{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const SignUpSchema = z.object({
    username: z.string().nonempty("username is required"),
    email: z.string().nonempty("email is required").email(),
    password: z.string().nonempty("password is required").min(8, "password must be at least 8 characters"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, 
{
    message: "passwords must match",
    path: ["confirmPassword"]
})

export type TSignUpFormSchema = z.infer<typeof SignUpSchema>;

export interface ISignInSchema{
    username: string;
    email: string;
    password: string;
}

export const SignInSchema = z.object({
    username: z.string().nonempty("username is required"),
    email: z.string().nonempty("email is required").email(),
    password: z.string().nonempty("password is required").min(8, "password must be at least 8 characters"),
});

export type TSignInFormSchema = z.infer<typeof SignInSchema>;