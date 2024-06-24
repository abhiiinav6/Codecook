import { Request, Response } from "express";
import { z } from "zod";
import { getTestCases, prisma } from "../db";
import jwt from "jsonwebtoken"
import fs from "fs"
import { exec } from "child_process";

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
    const jwtToken = req.cookies.jwtToken || req.header("Authorization");
    if (!jwtToken) {
        return res.status(401).json({ ok: false, error: "Unauthorized!" });
    }

    try {
        const token: any = jwt.verify(jwtToken, process.env.JWT_SECRET!)
        const userId = token.id;
        const submissionInput = submissionSchema.safeParse(req.body);

        if (!submissionInput.success) {
            return res.status(400).json({ "message": "Invalid input." })
        }
        console.log(submissionInput.data)

        const testCases = await getTestCases(submissionInput.data.problemId, 1);
        console.log(testCases)
        if (submissionInput.data.language === "python") {
            testCases.map(ts => (ts.input = ts.input.replaceAll(" ", "\n")))
        }
        console.log(testCases)

        fs.writeFile("/temp/input.txt", testCases[0].input, error => {
            if (error) {
                res.status(500).json({ ok: false, "error": "Internal Server Error", "output": "" })
                return
            }
        })
        switch (submissionInput.data.language) {

            case "c":
            case "cpp":
                fs.writeFile(`/temp/main.cpp`, submissionInput.data.code, error => {
                    if (error) {
                        console.log(error)
                        return res.status(500).json({ ok: false, "error": "Internal Server Error" })
                    }
                })

                exec(`g++ /temp/main.cpp -o /temp/main && /temp/main.exe < /temp/input.txt`, async (error, stdout, stderr) => {
                    if (error) {
                        if (stderr) {
                            const createdSubmission = await prisma.submission.create({
                                data: {
                                    status: "REJECTED",
                                    language: submissionInput.data.language,
                                    sourceCode: submissionInput.data.code,
                                    problemId: submissionInput.data.problemId,
                                    userId: userId,
                                    TestCaseResults: {
                                        create: {
                                            testCaseId: testCases[0].id,
                                            token: "",
                                            stderr: stderr,
                                            stdout: "",
                                            status: "REJECTED"
                                        }
                                    }
                                }
                            })
                            res.status(200).json({ ok: true, "message": "Created submission successfully", submissionId: createdSubmission.id })
                            return
                        }
                        res.status(500).json({ ok: false, "error": "Internal Server Error" })
                        return
                    }
                    console.log(stdout, "stdouut")

                    if (stdout === testCases[0].expectedOutput) {
                        const createdSubmission = await prisma.submission.create({
                            data: {
                                status: "ACCEPTED",
                                language: submissionInput.data.language,
                                sourceCode: submissionInput.data.code,
                                problemId: submissionInput.data.problemId,
                                userId: userId,
                                TestCaseResults: {
                                    create: {
                                        testCaseId: testCases[0].id,
                                        token: "",
                                        stderr: "",
                                        stdout: stdout,
                                        status: "ACCEPTED"
                                    }
                                }
                            }
                        })
                        res.status(200).json({ ok: true, "message": "Created submission successfully", submissionId: createdSubmission.id })
                        return
                    } else {
                        const createdSubmission = await prisma.submission.create({
                            data: {
                                status: "REJECTED",
                                language: submissionInput.data.language,
                                sourceCode: submissionInput.data.code,
                                problemId: submissionInput.data.problemId,
                                userId: userId,
                                TestCaseResults: {
                                    create: {
                                        testCaseId: testCases[0].id,
                                        token: "",
                                        stderr: "",
                                        stdout: stdout,
                                        status: "REJECTED"
                                    }
                                }
                            }
                        })
                        res.status(200).json({ ok: true, "message": "Created submission successfully", submissionId: createdSubmission.id })
                        return
                    }
                })
                break;
            case "python":
                fs.writeFile("/temp/main.py", submissionInput.data.code, error => {
                    if (error) {
                        console.error('Error writing to file:', error);
                        res.status(500).json({ ok: false, "error": "Internal Server Error" })
                        return
                    }

                    exec(`< /temp/input.txt  python /temp/main.py`, async (error, stdout, stderr) => {
                        if (error) {
                            console.error('Error executing Python script:', error);
                            if (stderr) {
                                const createdSubmission = await prisma.submission.create({
                                    data: {
                                        status: "REJECTED",
                                        language: submissionInput.data.language,
                                        sourceCode: submissionInput.data.code,
                                        problemId: submissionInput.data.problemId,
                                        userId: userId,
                                        TestCaseResults: {
                                            create: {
                                                testCaseId: testCases[0].id,
                                                token: "",
                                                stderr: stderr,
                                                stdout: "",
                                                status: "REJECTED"
                                            }
                                        }
                                    }
                                })
                                res.status(200).json({ ok: true, "message": "Created submission successfully", submissionId: createdSubmission.id })
                                return
                            }
                            res.status(500).json({ ok: false, "error": "Internal Server Error" })
                            return
                        }
                        console.log(stdout, testCases[0].expectedOutput, "stdouut")

                        if (stdout.replace(/^[\s\n]+|[\s\n]+$/, "").trimEnd() == testCases[0].expectedOutput) {
                            console.log("here")
                            const createdSubmission = await prisma.submission.create({
                                data: {
                                    status: "ACCEPTED",
                                    language: submissionInput.data.language,
                                    sourceCode: submissionInput.data.code,
                                    problemId: submissionInput.data.problemId,
                                    userId: userId,
                                    TestCaseResults: {
                                        create: {
                                            testCaseId: testCases[0].id,
                                            token: "",
                                            stderr: "",
                                            stdout: stdout,
                                            status: "ACCEPTED"
                                        }
                                    }
                                }
                            })
                            res.status(200).json({ ok: true, "message": "Created submission successfully", submissionId: createdSubmission.id })
                            return
                        } else {
                            const createdSubmission = await prisma.submission.create({
                                data: {
                                    status: "REJECTED",
                                    language: submissionInput.data.language,
                                    sourceCode: submissionInput.data.code,
                                    problemId: submissionInput.data.problemId,
                                    userId: userId,
                                    TestCaseResults: {
                                        create: {
                                            testCaseId: testCases[0].id,
                                            token: "",
                                            stderr: "",
                                            stdout: stdout,
                                            status: "REJECTED"
                                        }
                                    }
                                }
                            })
                            res.status(200).json({ ok: true, "message": "Created submission successfully", submissionId: createdSubmission.id })
                            return
                        }
                    });
                });
                break;
            default:
                res.status(404).json({ ok: false, "error": "Language not supported" })
        }

    } catch (error) {
        console.log(error)
        return res.status(401).json({ ok: false, "error": "Unauthorized!" });
    }

}

export async function submitCodeController(req: Request, res: Response) {

}

export async function getSubmissionByIdController(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const submission = await prisma.submission.findUniqueOrThrow({
            where: {
                id: Number(id)
            },
            include: {
                TestCaseResults: true,
                Problem: {
                    select: {
                        problem_id: true,
                        title: true
                    }
                },
            }
        })
        return res.status(200).json({ ok: true, submission })

    } catch (error) {
        res.status(404).json({ "ok": false, "message": "Submission not found." })
    }
}


// async function getTestCaseResultWithPolling(token: string, testCaseResultId: number, expectedOutput: string, tries: number) {
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': process.env.JUDGE0_API_KEY as string,
//             'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
//         }
//     };
//     try {
//         let submissionResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, options);
//         if (submissionResponse.status === 400) {
//             console.log(submissionResponse)
//             let err = await submissionResponse.json() as { error: string };
//             console.log(err.error)
//         }
//         let submissionResult: {
//             stdout: string | null,
//             stderr: string | null,
//             time: string,
//             memory: number,
//             token: string,
//             compile_output: string | null,
//             status: {
//                 id: number,
//                 description: string
//             }
//         } = await submissionResponse.json();
//         console.log(submissionResult)

//     } catch (error) {
//         console.log(error);
//     }

// }
