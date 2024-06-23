import { Request, Response } from "express";
import { z } from "zod";
import { getTestCases, prisma } from "../db";
import axios from "axios";
import jwt from "jsonwebtoken"

const submissionSchema = z.object({
    code: z.string().min(1),
    language: z.enum(["c", "cpp", "python"]),
    problemId: z.number().positive()
})

const languageMap = {
    "cpp": 54,
    "c": 49,
    "python": 71
}

export async function executeCodeController(req: Request, res: Response) {
    console.log(req.cookies)
    const jwtToken = req.cookies.jwtToken || req.header("Authorization");
    console.log(jwtToken)
    if (!jwtToken) {
        return res.status(401).json({ ok: false, error: "Unauthorized!" });
    }
    try {
        const token: any = jwt.verify(jwtToken, process.env.JWT_SECRET!)
        const submissionInput = submissionSchema.safeParse(req.body);

        if (!submissionInput.success) {
            return res.status(400).json({ "message": "Invalid input." })
        }

        const testCases = await getTestCases(submissionInput.data.problemId, 3);
        console.log(testCases)

        const response = await axios.post(
            `${process.env.JUDGE0_URL}`,
            {
                submissions: testCases.map((test, index) => ({
                    language_id: languageMap[submissionInput.data.language],
                    source_code: submissionInput.data.code,
                    expected_output: test.expectedOutput,
                    stdin: test.input
                })),
            },
            {
                headers: {
                    'content-type': 'application/json',
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': process.env.JUDGE0_API_KEY as string,
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                }
            }
        );
        console.log(response);
        const testCaseWithToken = testCases.map((test, index) => ({ "testCaseId": test.id, "token": response.data[index].token as string }))
        console.log(testCaseWithToken)
        const createSubmission = await prisma.submission.create({
            data: {
                sourceCode: submissionInput.data.code,
                language: submissionInput.data.language,
                problemId: submissionInput.data.problemId,
                userId: token.id,
                TestCaseResults: {
                    createMany: {
                        data: testCaseWithToken.map(t => ({ testCaseId: t.testCaseId, token: t.token, status: "WAITING" }))
                    }
                }
            },
        })
        return res.status(200).json({ ok: true, message: "Submissions made succesfully", submissionId: createSubmission.id })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ ok: false, "error": "Unauthorized!" });
    }



    res.status(200).json({ "hee": "hii" })

}

export async function submitCodeController(req: Request, res: Response) {

}