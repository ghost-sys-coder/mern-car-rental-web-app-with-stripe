import { Loader } from "lucide-react"


const UserProfileLoading = () => {
    return (
        <div className="flex justify-center items-center h-screen sm:flex-row flex-col bg-gray-200 gap-3">
            <Loader className="animate-spin" size={80} />
            <p className="text-primary text-xl">Loading...</p>
        </div>
    )
}

export default UserProfileLoading