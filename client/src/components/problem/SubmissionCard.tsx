import { Card } from "../ui/card";

export default function SubmissionCard() {
    return (
        <Card className="w-full grid place-items-center h-full">
            <p className="text-gray-700 text-center">You don't have any submissions yet.</p>
        </Card>
    );
}
