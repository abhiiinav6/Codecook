export type TestCaseResultsTypes = {
    id: number;
    submissionId: number;
    testCaseId: number;
    stdout: string | null;
    time: number | null;
    memory: number | null;
    status: "ACCEPTED" | "WAITING" | "REJECTED",
    token: string
    compile_output: string | null;
    message: string | null;
}