import { Button } from "../ui/button";
import GoogleIcon from "../../assets/icons/google.png";
import FacebookIcon from "../../assets/icons/facebook.jpg";

const AuthOptions = () => {

    return (
        <>
            <div className="splicer">
                <div className="dashed"></div>
                <p>Or</p>
                <div className="dashed"></div>
            </div>
            <div className="auth-options">
                <Button className="flex justify-start items-center gap-2" variant={"ghost"}>
                    <img src={GoogleIcon} alt="google icon" width={24} height={24} />
                    <span className="text-gray-500 font-semibold">Continue with Google</span>
                </Button>
                <Button className="flex justify-start items-center gap-2" variant={"ghost"}>
                    <img src={FacebookIcon} alt="google icon" width={24} height={24} />
                    <span className="text-gray-500 font-semibold">Continue with Google</span>
                </Button>
            </div>
        </>
    )
}

export default AuthOptions