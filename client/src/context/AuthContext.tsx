/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { IAuth, UserLoginDetails, UserSignUpDetails, IUserProfile } from "../../types";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "../constants";
import { runFireworks } from "@/utils/fireworks";



const AuthContext = createContext<IAuth | null>(null);


const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
    const [userProfile, setUserProfile] = useState<IUserProfile>({
        _id: "",
        username: "",
        email: "",
        admin: false,
    });
    const [success, setSuccess] = useState(true);
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const [dropdown, setDropdown] = useState(false);


    /** handle email--password authentication registration */
    const handleUserRegister = async (details: UserSignUpDetails) => {

        /** validate user registration details */
        if (!details.firstName || !details.lastName || !details.email || !details.username || !details.password) {
            return toast.error("All fields are required!", toastError);
        } else if (details.username.length <= 4) {
            return toast.error("Username too short!", toastError);
        } else if (details.password.length < 6) {
            return toast.error("Password too short!")
        }

        try {
            setLoading(true);

            const { status } = await axios.post('/auth/register', {
                firstName: details.firstName,
                lastName: details.lastName,
                username: details.username,
                email: details.email,
                password: details.password,
            });
            toast.success("Check your email for a token!", toastSuccess)
            if (status === 200) {
                setTimeout(() => {
                    navigate("/login")
                }, 2000);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message, toastError)
        } finally {
            setLoading(false);
        }
    }

    /** handle email--password authentication login */
    const handleUserLogin = async (details: UserLoginDetails) => {


        /** handle user login details */
        if (!details.email || !details.password) {
            return toast.error("All fields are required!", toastError)
        }

        try {
            setLoading(true);

            const { status, data } = await axios.post('/auth/login', {
                email: details.email,
                password: details.password,
            });
            toast.success(data.message, toastSuccess);
            handleFetchUserProfile();
            if (status === 200) {
                setTimeout(() => {
                    navigate("/")
                }, 2000);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message, toastError)
        } finally {
            setLoading(false);
        }
    }

    /** handle user logout */
    const handleUserLogout = async () => {
        try {
            const { status } = await axios.post("/auth/logout");
            if (status === 200) {
                setUserProfile({
                    _id: "",
                    username: "",
                    email: "",
                    admin: false
                });
                setIsUserAuthenticated(false);
                toast("You have logged out!", toastSuccess);
                // if (pathname !== "/") {
                //     navigate("/")
                // }

            }
        } catch (error) {
            console.log(error);
            toast("Logout Failed! Try again!!")
        }
    }

    /** fetch user profile */
    const handleFetchUserProfile = useCallback(async () => {
        setIsUserLoading(true);

        try {
            const { data, status } = await axios.get("/auth/profile");
            if (status === 200) {
                setUserProfile(data);
                setIsUserAuthenticated(true);
            }
        } catch (error: any) {
            console.log(error)
            if (error.message.includes("Network Error")) {
                return toast.error("Network Error, check your WiFi!", toastError)
            } else {
                return toast.error(error.response.data.message, toastError)
            }
        } finally {
            setIsUserLoading(false);
        }
    }, []);

    useEffect(() => {
        handleFetchUserProfile();
    }, [handleFetchUserProfile])


    /**handle forgot password */
    const handleForgotPassword = async (email: string) => {
        setLoading(true);
        try {
            const { status, data } = await axios.post("/auth/forgot-password", {
                email
            });
            toast.success(data.message, toastSuccess);
            if (status === 200) {
                setTimeout(() => {
                    navigate("/reset")
                }, 2000);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message, toastError)
        } finally {
            setLoading(false);
        }
    }

    /** handle password reset token submission */
    const handlePasswordReset = async (token: string, password: string) => {
        setLoading(true);
        try {
            const { status, data } = await axios.post("/auth/reset-password", {
                token,
                password
            });
            toast.success(data.message, toastSuccess);
            if (status === 200) {
                setTimeout(() => {
                    navigate("/login")
                }, 2000);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    /** handle email token verification */
    const handleEmailTokenVerification = async (token: string) => {
        setSuccess(true);

        try {
            const { data, status } = await axios.get(`/auth/verify/${token}`);

            toast.success(data.message, toastSuccess);
            runFireworks(); 
            
            if (status === 200) {
                navigate("/login")   
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message, toastError)
        } finally {
            setSuccess(false);
        }
    }


    /** handle Sidebar */
    const handleSidebar = () => {
        if(isOpenSideBar){
            setIsOpenSideBar(false);
        } else {
            setIsOpenSideBar(true);
        }
    }

    /** handle dropdown menu */
    const handleOpenDropdown = () => {
        setDropdown(value => !value)
    }
    
    return (
        <AuthContext.Provider
            value={{
                loading,
                isUserAuthenticated,
                isUserLoading,
                userProfile,
                success,
                isOpenSideBar,
                dropdown,
                setIsOpenSideBar,
                setDropdown,
                handleFetchUserProfile,
                handleUserLogout,
                handleUserLogin,
                handleUserRegister,
                handleForgotPassword,
                handlePasswordReset,
                handleEmailTokenVerification,
                handleSidebar,
                handleOpenDropdown
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;

export const useAuthContext = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useContext must be used within an AuthProvider")
    }

    return context;
}