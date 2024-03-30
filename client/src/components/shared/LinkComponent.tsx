import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { LogIn } from "lucide-react"
import { useAuthContext } from "@/context/AuthContext"

const LinkComponent = ({ handleSidebar }: { handleSidebar: () => void }) => {
    const { userProfile, isUserAuthenticated } = useAuthContext();
    return (
        <>
            {!isUserAuthenticated ? (
                <div className="flex w-full">
                    <Button asChild className="w-full flex gap-3">
                        <Link to={"/login"}>
                            <LogIn />
                            <span>Login Now</span>
                        </Link>
                    </Button>
                </div>
            ) : (
                <>
                    {userProfile.admin ? (
                        <Link
                            onClick={handleSidebar}
                            to={"/add-rental"}
                            className="text-gray-400 font-thin hover:text-primary py-1 px-2 border-2 border-primary rounded-md"
                        >
                            Add new rental
                        </Link>
                    ) : (
                        <Link
                            onClick={handleSidebar}
                            className="text-gray-400 font-thin hover:text-primary py-1 px-2 border-2 border-primary rounded-md"
                            to={"/profile"}
                        >
                            @{userProfile?.username}
                        </Link>
                    )}

                    {userProfile.admin ? (
                        <Link
                            onClick={handleSidebar}
                            to={"/blog/create"}
                            className="text-gray-400 font-thin hover:text-primary py-1 px-2 border-2 border-primary rounded-md"
                        >
                            Create new a blog
                        </Link>
                    ) : (
                        <Link
                            onClick={handleSidebar}
                            className="text-gray-400 font-thin hover:text-primary py-1 px-2 border-2 border-primary rounded-md"
                            to={"/profile"}
                        >
                            @{userProfile?.username}
                        </Link>
                    )}
                </>
            )}
        </>
    )
}

export default LinkComponent