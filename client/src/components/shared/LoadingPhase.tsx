import { Loader } from "lucide-react"

const LoadingPhase = () => {
    return (
        <div className="flex gap-2 justify-center items-center h-screen bg-white z-10 flex-col sm:flex-row">
            <Loader className="animate-spin font-bold text-primary" size={40} />
            <p className=" font-semibold text-gray-400 sm:text-xl">Please wait....</p>
        </div>
    )
}

export default LoadingPhase