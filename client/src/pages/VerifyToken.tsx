import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuthContext } from "@/context/AuthContext"
import { LoadingPhase } from "@/components";




const VerifyToken = () => {
    const { pathname } = useLocation();
    const { success, handleEmailTokenVerification } = useAuthContext();
    const token = pathname.split("/")[2];

    useEffect(() => {
        handleEmailTokenVerification(token)
    }, [handleEmailTokenVerification, token]);

    /** loading phase */
    if (success) return <LoadingPhase />

    return (
        <main className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
            <div className="flex justify-center items-center gap-3 flex-col w-full">
                <h1 className="font-semibold text-gray-600 text-xl">Token Verification Failed!</h1>
                <Link className="py-2 px-4 rounded-md text-gray-300 bg-primary hover:bg-indigo-500" to={"/forgot"}>Click to get a new token!</Link>
            </div>
        </main>
    )
}

export default VerifyToken