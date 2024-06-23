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
export default function CodePlayground() {
    const [language, setLanguage] = useState("javascript");

    function handleChange(value: string) {
        setLanguage(value);
    }
    return (
        <Card className="w-full flex flex-col gap-4 px-2 bg-gray-50 rounded-none">
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
                className="w-full border shadow"
                options={{
                    minimap: {
                        autohide: true,
                    },
                }}
                language={language}
                height="70vh"
            />
            <div className="w-full flex px-2 pb-4 justify-end gap-4">
                <Button variant="outline">Run Code</Button>
                <Button>Submit</Button>
            </div>
        </Card>
    );
}
