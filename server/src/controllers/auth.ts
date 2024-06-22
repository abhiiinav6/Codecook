import { Request, Response } from "express"
import { prisma } from "../db";
import { z } from "zod";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    name: z.string().min(3, { message: "Name should be atleast 3 characters." }),
    password: z.string().min(6, { message: "Passwords should be atleast 6 character." })
})

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Passwords should be atleast 6 character." })
})

export async function signupController(req: Request, res: Response) {
    console.log("hii signup")
    const validationResult = signupSchema.safeParse(req.body)
    if (!validationResult.success) {
        res.status(400).json({ ok: false, "error": validationResult.error.cause })
        return
    }
    const hashedPasword = await argon2.hash(validationResult.data.password);


    try {
        const user = await prisma.user.create({
            data: {
                email: validationResult.data.email,
                name: validationResult.data.name,
                password: hashedPasword
            }
        })
        console.log(user)

        const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.setHeader("Authorization", access_token)

        res.cookie(process.env.ACCESS_TOKEN_COOKIE_NAME!, access_token, {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "lax",
            maxAge: Number(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE)
        });

        return res.json({ "ok": true, "message": "Created account successfully", access_token }).status(200);
    } catch (error) {
        res.status(400).json({ "ok": "false", "error": "Email already exist" })
        console.log(error)
        return
    }
}

export async function loginController(req: Request, res: Response) {
    const validationResult = loginSchema.safeParse(req.body)
    if (!validationResult.success) {
        res.status(400).json({ ok: false, "error": validationResult.error.cause })
        return
    }

    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: validationResult.data.email
            }
        })

        const passwordVerify = await argon2.verify(user.password, validationResult.data.password)
        if (!passwordVerify) {
            return res.status(400).json({ ok: false, "error": "Invalid credentials" })
        }

        const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })

        res.setHeader("Authorization", access_token)

        res.cookie(process.env.ACCESS_TOKEN_COOKIE_NAME!, access_token, {
            sameSite: "lax",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: Number(process.env.ACCESS_TOKEN_COOKIE_MAX_AGE),
            domain: "http://localhost:5173",
            path: "/"
        });

        return res.status(200).json({ ok: true, "message": "Logged in successfully", access_token })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ ok: false, "error": "User not found." })
    }
}


export async function mecontroller(req: Request, res: Response) {
    console.log(req.cookies)
    let { codecook } = req.cookies;
    let token = req.header("Authorization")
    console.log(token, codecook)
    if (!codecook && !token) return res.status(401).json({ ok: false, "error": "Unauthorized!" });
    if (!codecook) codecook = token
    try {
        const token: any = jwt.verify(codecook, process.env.JWT_SECRET!)
        const user = await prisma.user.findUnique({
            where: {
                id: token.id
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })

        return res.status(200).json({ ok: true, data: user })
    } catch (error) {
        return res.status(401).json({ ok: false, "error": "Unauthorized!" });
    }
}

export async function logoutController(req: Request, res: Response) {
    res.setHeader("Authorization", "")
    res
        .clearCookie(process.env.ACCESS_TOKEN_COOKIE_NAME!)
        .status(200)
        .end();
}