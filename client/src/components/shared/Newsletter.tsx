import { FormEvent, useState } from "react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/constants";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const Newsletter = () => {
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleNewsletterSignup = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        /** validation */
        if (!email) {
            return toast.error("Email field is missing!", toastError);
        }

        setIsLoading(true);

        try {
            const { data, status } = await axios.put("/auth/newsletter/subscription", {
                email
            });
            toast.success(data.message, toastSuccess);
            if (status === 200) {
                setEmail("")
            }
        } catch (error) {
            console.log(error);
            let message = "Operation Failed!";
            if (isAxiosError(error) && error.response) {
                message = error.response?.data.message || "An unexpected error occurred!";
            } else if (error instanceof Error) {
                message = error.message;
            }
            toast.error(message, toastError);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <form className="flex flex-col gap-5" onSubmit={handleNewsletterSignup}>
            <h3 className="font-semibold text-n-3 sm:text-xl border-b border-gray-300 pb-2">Newsletter</h3>
            <Label htmlFor="email">Do not miss a thing! Sign up to receive daily deals</Label>
            <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button
                type="submit"
                className="flex gap-3 justify-center items-center"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" />
                        <span>Subscribing...</span>
                    </>
                ) : (
                    <span>Subscribe</span>
                )}
            </Button>
        </form>
    )
}

export default Newsletter