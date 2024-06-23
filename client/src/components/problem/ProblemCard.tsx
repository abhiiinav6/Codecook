import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Markdown from "react-markdown";
import MarkdownPreview from "@uiw/react-markdown-preview";
import remarkGfm from 'remark-gfm'
export default function ProblemCard({
    id,
    title,
    description,
}: {
    id: number;
    title: string;
    description: string;
}) {
    console.log(description)
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {id}. {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <MarkdownPreview
                    source={description}
                    style={{ padding: 16 }}
                    wrapperElement={{ "data-color-mode": "light" }}
                />
                 <Markdown className=" prose lg:prose-xl"  rehypePlugins={[remarkGfm]}>{description}</Markdown>
            </CardContent>
        </Card>
    );
}
