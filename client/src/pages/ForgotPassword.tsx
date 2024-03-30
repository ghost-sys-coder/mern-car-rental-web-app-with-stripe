import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { loading, handleForgotPassword } = useAuthContext();

    const handleEmailSubmit = async (e: FormEvent) => {
        e.preventDefault();

        handleForgotPassword(email)
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="header mb-4">
                <h1 className="auth-title">Forgot Password!</h1>
                <p>Renew your lockaRentals password</p>
            </div>
            <form onSubmit={handleEmailSubmit}>
                <div className="input-container">
                    <label htmlFor="email">Please provide your registered email!</label>
                    <input type="email" name="email" id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Provide your email..."
                    />
                </div>
                <Button type="submit">
                    {loading ? (
                        <div className="flex justify-center items-center gap-2">
                            <Loader className="animate-spin" />
                            <span>Loading...</span>
                        </div>
                    ) : (
                        <span>Request Reset Token</span>
                    )}
                </Button>
            </form>
            <div className="flex justify-start items-center mt-3">
                <Link className="font-semibold text-sm sm:text-[15px] text-white" to={"/login"}>Go back to Login</Link>
            </div>
            <Toaster />
        </div>
    )
}

export default ForgotPassword