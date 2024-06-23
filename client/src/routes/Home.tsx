import axios from "axios";
import ProblemTable from "../components/problem/ProblemTable";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { useEffect, useState } from "react";
import { AllProblemsType } from "../types/problem";
import ProblemTableSkeleton from "../components/problem/ProblemTableSkeleton";
import { useAuth } from "../context/AuthContext";

function Home() {
    const authContext = useAuth();
    console.log(authContext)
    const [allProblems, setProblems] = useState<AllProblemsType>();
    const [dataLoading, setDataLoading] = useState(false);
    const [dataLoadingError, setDataLoadingError] = useState("");
    useEffect(() => {
        async function getProblems() {
            try {
                setDataLoading(true);
                const response = await axios.get(
                    `${import.meta.env.VITE_API}/problems`
                );

                setProblems(response.data.data);
                setDataLoading(false);
            } catch (error) {
                setDataLoadingError("Internal Server Error.");
                setDataLoading(false);
            }
        }
        getProblems();
    }, []);

    return (
        <main className="w-full max-w-4xl mx-auto min-h-[100vh] px-8 py-16 space-y-8">
            <h1 className="text-primary font-playright text-2xl text-center font-bold">
                Cook your coding skills to next level.
            </h1>
            <section className="w-full">
                <div className="w-full flex gap-4">
                    <Select>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="EASY">Easy</SelectItem>
                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                <SelectItem value="HARD">Hard</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="solved">Solved</SelectItem>
                                <SelectItem value="attempted">
                                    Attempted
                                </SelectItem>
                                <SelectItem value="notsolved">
                                    Not Solved
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {dataLoadingError ? (
                    <div className="w-full p-8 mx-auto">
                        <p className="text-red-500">
                            {dataLoadingError} Please try again.
                        </p>
                    </div>
                ) : dataLoading ? (
                    <ProblemTableSkeleton />
                ) : allProblems ? (
                    <>
                        <ProblemTable data={allProblems} />
                    </>
                ) : null}
            </section>
        </main>
    );
}

export default Home;
