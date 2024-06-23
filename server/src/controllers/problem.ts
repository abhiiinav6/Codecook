import { Request, Response } from "express"
import { prisma } from "../db";

export async function getAllProblemsController(req: Request, res: Response) {
    try {
        const data = await prisma.problem.findMany({
            select: {
                id: true,
                title: true,
                difficulty: true,
                tags: true,
                problem_id: true
            },
            where: {
                hidden: false
            }
        });
        return res.status(200).json({ "ok": true, data })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "ok": false, "error": "Internal Server Error" })
    }
}

export async function getProblemByIdController(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const result = await prisma.problem.findUniqueOrThrow({
            where: {
                problem_id: id,
                hidden: false
            }, select: {
                id: true,
                title: true,
                description: true,
                tags: true,
                difficulty: true,
                TestCases: {
                    take: 3
                }
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        return res.status(404).json({ 'ok': false, "error": "Problem not found." })
    }
}