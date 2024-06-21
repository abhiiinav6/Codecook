import { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
    const { method, url, body } = req
    const timeStamp = new Date().toISOString()
    console.log(`${timeStamp} - ${method} ${url} - Body: ${JSON.stringify(body)}`)
    next();
}