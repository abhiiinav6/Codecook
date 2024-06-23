
export default function ProblemNotExist() {
    return (
        <div className="w-full max-w-2xl  mx-auto py-24 flex gap-8 justify-center items-center">
            <img src="/ara-araa.jpg" alt="error image" className="h-32" />
            <div className="space-y-8">
                <h1 className="font-playright text-3xl">You're searching for a question <p className="text-red-600">that doesn't exit yet.</p> </h1>
                <h2 className="text-xl">
                    Let's go <a href="/" className="underline">Home</a>
                </h2>
            </div>
        </div>
    );
}
