import { TestCaseResultsTypes } from "./testcaseresult"

export type SubmissionType = {
    Problem: {
        title: string,
        problem_id: string
    },
    TestCaseResults: TestCaseResultsTypes[],
    id: number
    userId: number
    problemId: number
    language: string
    sourceCode: string
    status: "ACCEPTED" | "WAITING" | "REJECTED"

    createdAt: Date;
    updatedAt: Date;
}