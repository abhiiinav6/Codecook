import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { FormEvent, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { validateEmail } from "../lib/utils";
import { useToast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Signup() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const authContext = useAuth();

    if (authContext.isAuthenticated) {
        navigate("/");
    }

    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [nameInputError, setNameInputError] = useState("");
    const [emailInputError, setEmailInputError] = useState("");
    const [passwordInputError, setPasswordInputError] = useState("");

    const [submittingForm, setSubmittingForm] = useState(false);

    async function Submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmittingForm(true);
        setNameInputError("");
        setEmailInputError("");
        setPasswordInputError("");

        if (nameRef.current?.value.length < 3) {
            setNameInputError("Name should be atleast 3 characters.");
            setSubmittingForm(false);
            return;
        }

        if (!validateEmail(emailRef.current?.value || "")) {
            setEmailInputError("Enter valid email");
            setSubmittingForm(false);
            return;
        }

        if (passwordRef.current?.value.length < 5) {
            setPasswordInputError("Password should be atleast 5 characters");
            setSubmittingForm(false);
            return;
        }

        console.log(
            nameRef.current?.value,
            emailRef.current?.value,
            passwordRef.current?.value
        );

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API}/auth/signup`,
                {
                    name: nameRef.current?.value,
                    email: emailRef.current?.value,
                    password: passwordRef.current?.value,
                }
            );
            if (response.data.ok) {
                authContext.getUserData(response.data.access_token);
                setSubmittingForm(false);
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast({
                title: error?.response.data.error as string,
                variant: "destructive",
            });
            setSubmittingForm(false);
        }
    }

    return (
        <main className="w-full h-[100vh] flex flex-col py-24 px-8 items-center gap-8">
            <h2 className="text-xl font-bold">Create an account</h2>
            <form
                onSubmit={Submit}
                className="flex flex-col gap-4 w-full max-w-sm"
            >
                <div className="w-full">
                    <Input
                        ref={nameRef}
                        className="w-full"
                        type="text"
                        placeholder="Name"
                        required
                    />
                    <p className="text-destructive">{nameInputError}</p>
                </div>
                <div className="w-full">
                    <Input
                        ref={emailRef}
                        className="w-full"
                        type="email"
                        placeholder="Email"
                        required
                    />
                    <p className="text-destructive">{emailInputError}</p>
                </div>
                <div className="w-full">
                    <Input
                        ref={passwordRef}
                        className="w-full"
                        type="password"
                        placeholder="Password"
                        required
                    />
                    <p className="text-destructive">{passwordInputError}</p>
                </div>

                <Button className="w-full" disabled={submittingForm}>
                    {submittingForm && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Submit
                </Button>
            </form>
            <p>
                Already have an account{" "}
                <a href="/login" className="text-blue-500">
                    Login
                </a>
            </p>
        </main>
    );
}

export default Signup;
