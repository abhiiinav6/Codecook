import { Prisma, PrismaClient } from '@prisma/client'
export const prisma = new PrismaClient

export async function getProblem(id: string) {
    try {
        const problem = await prisma.problem.findFirstOrThrow({
            where: {
                problem_id: id,
                hidden: false
            },
            select: {
                id: true,
                title: true,
                description: true,
                tags: true,
                difficulty: true,
            }
        })
        return problem
    } catch (error) {
        return null
    }
}

export async function getTestCases(problemId: number, take?: number) {
    if (!take) {
        take = 3
    }
    const testCases = await prisma.testCase.findMany({
        where: {
            problemId: problemId,
        },
        take: take
    })
    return testCases
}

