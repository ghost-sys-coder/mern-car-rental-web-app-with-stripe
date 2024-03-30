import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { UserProfileLoading } from "@/components";

const AuthLayout = () => {
    const { isUserAuthenticated, isUserLoading } = useAuthContext();

    if (isUserLoading) {
        return <UserProfileLoading />
    }
    return (
        <>
            {isUserAuthenticated ? (
                (<Navigate to={"/"} replace />)
            ):
                    <main className="auth">
                        <div className="auth-container">
                            <Outlet />
                        </div>
                    </main>
            }
        </>
    )
}

export default AuthLayout