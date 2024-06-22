import { title } from "process";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table.tsx";
import { CircleCheckBig } from "lucide-react";

const problems = [
    {
        id: 1,
        title: "Two Sum",
        acceptance: "65",
        difficulty: "Easy",
        solved: true,
        attempted: true,
    },
    {
        id: 2,
        title: "Add Two Numbers",
        acceptance: "55",
        difficulty: "Medium",
        solved: false,
        attempted: false,
    },
    {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        acceptance: "33",
        difficulty: "Medium",
        solved: false,
        attempted: true,
    },
    {
        id: 4,
        title: "Median of Two Sorted Arrays",
        acceptance: "29",
        difficulty: "Hard",
        solved: false,
        attempted: true,
    },
    {
        id: 5,
        title: "Longest Palindromic Substring",
        acceptance: "31",
        difficulty: "Medium",
        solved: true,
        attempted: true,
    },
    {
        id: 6,
        title: "ZigZag Conversion",
        acceptance: "42",
        difficulty: "Medium",
        solved: false,
        attempted: false,
    },
    {
        id: 7,
        title: "Reverse Integer",
        acceptance: "27",
        difficulty: "Easy",
        solved: true,
        attempted: true,
    },
    {
        id: 8,
        title: "String to Integer (atoi)",
        acceptance: "16",
        difficulty: "Medium",
        solved: false,
        attempted: true,
    },
    {
        id: 9,
        title: "Palindrome Number",
        acceptance: "52",
        difficulty: "Easy",
        solved: true,
        attempted: true,
    },
    {
        id: 10,
        title: "Regular Expression Matching",
        acceptance: "24",
        difficulty: "Hard",
        solved: false,
        attempted: false,
    },
    {
        id: 11,
        title: "Container With Most Water",
        acceptance: "53",
        difficulty: "Medium",
        solved: false,
        attempted: false,
    },
    {
        id: 12,
        title: "Integer to Roman",
        acceptance: "56",
        difficulty: "Medium",
        solved: false,
        attempted: false,
    },
    {
        id: 13,
        title: "Roman to Integer",
        acceptance: "63",
        difficulty: "Easy",
        solved: false,
        attempted: false,
    },
    {
        id: 14,
        title: "Longest Common Prefix",
        acceptance: "39",
        difficulty: "Easy",
        solved: false,
        attempted: false,
    },
    {
        id: 15,
        title: "3Sum",
        acceptance: "25",
        difficulty: "Medium",
        solved: false,
        attempted: true,
    },
    {
        id: 16,
        title: "Letter Combinations of a Phone Number",
        acceptance: "50",
        difficulty: "Medium",
        solved: true,
        attempted: true,
    },
    {
        id: 17,
        title: "Valid Parentheses",
        acceptance: "39",
        difficulty: "Easy",
        solved: false,
        attempted: true,
    },
    {
        id: 18,
        title: "Merge Two Sorted Lists",
        acceptance: "60",
        difficulty: "Easy",
        solved: true,
        attempted: true,
    },
    {
        id: 19,
        title: "Generate Parentheses",
        acceptance: "58",
        difficulty: "Medium",
        solved: false,
        attempted: true,
    },
    {
        id: 20,
        title: "Swap Nodes in Pairs",
        acceptance: "45",
        difficulty: "Medium",
        solved: false,
        attempted: true,
    },
];

export default function ProblemTable() {
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
                {problems.map((p) => (
                    <TableRow className="py-0">
                        <TableCell>
                            {p.solved ? <CircleCheckBig className="size-5 py-0" color="green" /> : null}
                        </TableCell>
                        <TableCell>
                            <a href="#" className="hover:underline hover:text-blue-500 cursor-pointer">
                                {p.id}. {p.title}
                            </a>
                        </TableCell>
                        <TableCell>{p.acceptance}%</TableCell>
                        <TableCell>{p.difficulty}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
