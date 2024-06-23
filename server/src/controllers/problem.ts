import { Request, Response } from "express"
import { getProblem, prisma } from "../db";

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
    const problem = await getProblem(id);
    if (!problem) {
        return res.status(404).json({ "message": "Problem not found." })
    }
    return res.status(200).json( {...problem} )
}