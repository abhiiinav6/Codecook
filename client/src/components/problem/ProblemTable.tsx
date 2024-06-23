import { AllProblemsType } from "../../types/problem.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table.tsx";
// import { CircleCheckBig } from "lucide-react";

export default function ProblemTable({ data }: { data: AllProblemsType }) {
    console.log(data);
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Acceptance</TableHead>
                    <TableHead>Difficulty</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="[&>*:nth-child(even)]:bg-gray-100 rounded-sm">
                {data.map((problem) => (
                    <TableRow key={problem.title} className="py-0">
                        <TableCell className="w-8">
                            {/* {problem.solved ? (
                                <CircleCheckBig
                                    className="size-5 py-0"
                                    color="green"
                                />
                            ) : null} */}
                        </TableCell>
                        <TableCell>
                            <a
                                href={`problems/${problem.problem_id}`}
                                className="hover:underline hover:text-blue-500 cursor-pointer"
                            >
                                {problem.id}. {problem.title}
                            </a>
                        </TableCell>
                        <TableCell>
                            {Math.floor(Math.random() * 100)}%
                        </TableCell>
                        <TableCell>{problem.difficulty}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
