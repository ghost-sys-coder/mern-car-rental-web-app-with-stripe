import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { UserProfileLoading } from "@/components";
import { ReactNode } from "react";


const ProtectedLayout = ({children}: {children: ReactNode}) => {
    const { isUserAuthenticated, isUserLoading, userProfile } = useAuthContext();

    if (isUserLoading) {
        return <UserProfileLoading />
    }

    if (!isUserAuthenticated && !userProfile.admin) {
        return <Navigate to={"/login"} />
    }
    
    if (userProfile.admin) return children;
}

export default ProtectedLayout