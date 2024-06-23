import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function auth(req: Request, res: Response, next: NextFunction) {
    const jwtToken = req.cookies.jwtToken || req.header("Authorization");

    if (!jwtToken) {
        return res.status(401).json({ ok: false, error: "Unauthorized!" });
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is not set');
    }

    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = {
            isAuthenticated: true,
            userId: decoded.id,
        };
    } catch (error) {
        console.error(error);
        req.user = { isAuthenticated: false };
    }

    next();
}