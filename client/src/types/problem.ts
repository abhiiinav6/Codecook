export type ProblemTypes = {
    id: number;
    problem_id: string;
    title: string;
    description: string;
    difficulty: string;
    tags: string;
}

export type AllProblemsType = Omit<ProblemTypes, "description">[]


export type TestCases = {
    id: number;
    input: string;
    expected_output: string;
}