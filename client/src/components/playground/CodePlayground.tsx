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
export default function CodePlayground() {
    const [language, setLanguage] = useState("javascript");

    function handleChange(value: string) {
        setLanguage(value);
    }
    return (
        <div className="w-full flex flex-col gap-4 px-2">
            <div className="w-full px-2 ">
                <Select onValueChange={handleChange} defaultValue="javascript">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select language</SelectLabel>
                            <SelectItem value="javascript">
                                Javascript
                            </SelectItem>
                            <SelectItem value="cpp">C++</SelectItem>
                            <SelectItem value="c">C</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Editor
                className="w-full"
                options={{ theme: "vs-dark" }}
                language={language}
                height="80vh"
            />
        </div>
    );
}
