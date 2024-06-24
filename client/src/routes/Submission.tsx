import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SubmissionType } from "../types/submission";
import { Card, CardContent } from "../components/ui/card";
import { Editor } from "@monaco-editor/react";

function Submission() {
    const { submissionId } = useParams();
    const [submission, setSubmission] = useState();
    const [error, setError] = useState("");

    useEffect(() => {
        async function getSubmissionById(id: string) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API}/submissions/${id}`
                );
                console.log(response.data);
                setSubmission(response.data.submission);
            } catch (error) {
                setError("Submission not found");
            }
        }
        getSubmissionById(submissionId!);
    }, []);
    if (error) {
        return <h1>Submission not found.</h1>;
    }
    return (
        <main className="w-full min-h-[100vh] max-w-2xl py-8 mx-auto">
            {submission && (
                <section className="space-y-4">
                    <h2>
                        <a
                            className="text-blue-500"
                            href={`/problems/${submission.Problem.problem_id}`}
                        >
                            {submission.Problem.title}
                        </a>
                    </h2>
                    <Card className="px-4 py-2">
                        <CardContent className=" flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <span>Input: {submission.TestCaseResults[0].TestCase.input}</span>
                                <span>Expected Output: {submission.TestCaseResults[0].TestCase.expectedOutput}</span>
                                <span>
                                    Output:{" "}
                                    {submission.TestCaseResults[0].stdout.replace(/^[\s\n]+|[\s\n]+$/, "").trimEnd() ||
                                        submission.TestCaseResults[0].stderr.replace(/^[\s\n]+|[\s\n]+$/, "").trimEnd()}
                                </span>
                            </div>
                            <div className="space-y-4 flex flex-col">
                                <span
                                    className={`text-xl text-right ${
                                        submission.status === "ACCEPTED"
                                            ? "text-green-500"
                                            : submission.status === "REJECTED"
                                            ? "text-red-500"
                                            : "text-yellow-600"
                                    }`}
                                >
                                    {submission.status}
                                </span>
                                <span>
                                    Submitted At:{" "}
                                    {new Date(
                                        submission.createdAt
                                    ).toUTCString()}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <Editor
                            language={submission.language}
                            options={{ domReadOnly: true }}
                            value={submission.sourceCode}
                            height="50vh"
                        />
                    </Card>
                </section>
            )}
        </main>
    );
}

export default Submission;
