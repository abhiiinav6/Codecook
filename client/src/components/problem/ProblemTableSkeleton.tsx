import { Skeleton } from "../ui/skeleton";

export default function ProblemTableSkeleton() {
    return (
        <div className="w-full my-2 space-y-2">
            {Array.from({length: 8}).map(() => (
                <Skeleton className="w-full h-12 rounded-sm" />
            ))}
        </div>
    );
}
