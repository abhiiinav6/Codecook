import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import MarkdownPreview from "@uiw/react-markdown-preview";
export default function ProblemCard({
    id,
    title,
    description,
}: {
    id: number;
    title: string;
    description: string;
}) {
    return (
        <Card className="bg-gray-50">
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
            </CardContent>
        </Card>
    );
}
