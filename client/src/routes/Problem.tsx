import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../components/ui/tabs";
import ProblemCard from "../components/problem/ProblemCard";
import SubmissionCard from "../components/problem/SubmissionCard";
import { ProblemTypes } from "../types/problem";
import ProblemNotExist from "../components/problem/ProblemNotExist";
import CodePlayground from "../components/playground/CodePlayground";

export default function Problem() {
    const { problemId } = useParams();
    const [question, setQuestion] = useState<ProblemTypes>();
    const [errorLoadingData, setErrorLoadingData] = useState("");

    useEffect(() => {
        async function getProblemById(problemId: string) {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API}/problems/${problemId}`
                );
                console.log(response);
                setQuestion(response.data);
            } catch (error) {
                console.log(error);
                setErrorLoadingData(error as string);
            }
        }
        getProblemById(problemId as string);
    }, [problemId]);

    if (errorLoadingData) {
        return <ProblemNotExist />;
    }

    return (
        <main className="mt-2 border-t-2 w-full max-h-[90vh] flex">
            <Tabs defaultValue="description" className="w-1/2 overflow-auto">
                <TabsList className="w-full justify-start py-0 bg-gray-50">
                    <TabsTrigger
                        value="description"
                        className="py-0 px-6 my-0 h-full"
                    >
                        Description
                    </TabsTrigger>
                    <TabsTrigger
                        value="submissions"
                        className="py-0 px-6 my-0 h-full"
                    >
                        Submissions
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="px-6">
                    <ProblemCard
                        id={question?.id as number}
                        title={question?.title as string}
                        description={question?.description as string}
                    />
                </TabsContent>
                <TabsContent value="submissions" className="px-6 h-full">
                    <SubmissionCard />
                </TabsContent>
            </Tabs>
            <div className="w-1/2 border-l">
                <CodePlayground />
            </div>
        </main>
    );
}
