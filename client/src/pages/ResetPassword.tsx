import { FormEvent, useState } from "react"
import { Loader } from "lucide-react"
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const ResetPassword = () => {
    const { loading, handlePasswordReset } = useAuthContext();
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        handlePasswordReset(token, password);
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="header mb-4">
                <h1 className="auth-title">Reset Password</h1>
                <p>Reset your password</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label htmlFor="token">Provide Reset Token</label>
                    <input type="text" name="token" id="token"
                        placeholder="Enter token..."
                        value={token}
                        onChange={e => setToken(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password">Enter new password</label>
                    <input type="password" name="password" id="password"
                        placeholder="Enter your new password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <Button type="submit">
                    {loading ? (
                        <div className="flex justify-center items-center gap-2">
                            <Loader className="animate-spin" />
                            <span>Loading...</span>
                        </div>
                    ) : (
                        <span>Reset Password</span>
                    )}
                </Button>
            </form>
            <Link
                to={"/forgot"}
                className="flex flex-col items-center justify-center gap-1 sm:flex-row mt-3 text-sm text-primary hover:text-indigo-400"
            >
                <p>Did not receive a reset token?</p>
                <span className="underline">Click Here!</span>
            </Link>
            <Toaster />
        </div>
    )
}

export default ResetPassword