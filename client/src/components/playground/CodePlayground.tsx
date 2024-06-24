import Editor from "@monaco-editor/react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export default function CodePlayground({
    handleCodeSubmission,
    submittingProblem,
    changeSubmittingProblem,
}: {
    handleCodeSubmission: (code: string, language: string) => void;
    submittingProblem: boolean;
    changeSubmittingProblem: (value: boolean) => void;
}) {
    const [language, setLanguage] = useState("python");
    const [code, setCode] = useState("");

    function handleLanguageChange(value: string) {
        setLanguage(value);
    }
    function handleEditorChange(value: string, _event: any) {
        setCode(value);
    }

    function handleSubmit() {
        handleCodeSubmission(code, language);
    }

    return (
        <Card className="w-full flex flex-col gap-4 px-2 bg-gray-50 rounded-none">
            <div className="w-full px-2 ">
                <Select
                    onValueChange={handleLanguageChange}
                    defaultValue="python"
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select language</SelectLabel>
                            <SelectItem value="cpp">C++</SelectItem>
                            <SelectItem value="c">C</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Editor
                className="w-full border shadow"
                options={{
                    minimap: {
                        autohide: true,
                    },
                }}
                language={language}
                height="70vh"
                onChange={handleEditorChange}
            />
            <div className="w-full flex px-2 pb-4 justify-end gap-4">
                <Button onClick={handleSubmit} disabled={submittingProblem}>
                    {submittingProblem ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        "Submit"
                    )}
                </Button>
            </div>
        </Card>
    );
}
