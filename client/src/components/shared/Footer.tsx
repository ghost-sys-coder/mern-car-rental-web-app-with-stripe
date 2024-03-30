import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader, LocateFixedIcon, PhoneIcon, Timer } from "lucide-react";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import Logo from "./Logo";
import { Button } from "../ui/button";
import axios, { isAxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { toastError, toastSuccess } from "@/constants";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

  const handleNewsletterSubscription = async () => {
    setIsSubscribing(true);

    try {
      const { data, status } = await axios.put("/auth/newsletter/subscription", {
        email
      });
      toast.success(data.message, toastSuccess);
      if (status === 200) {
        setEmail("");
      }
    } catch (error) {
      let message = "Operation failed!";

      if (isAxiosError(error) && error.response) {
        message = error.response.data.message || "An un expected error ocurred!";
      } else if (error instanceof Error) {
        message = error.message;
      }
      if (message === "You are already subscribed to our Newsletter!") {
        setEmail("");
      }
      toast.error(message, toastError);
    } finally {
      setIsSubscribing(false);
    }
  }

  return (
    <footer>
      <div className="container">
        <h5 className="h5">About Us</h5>
        <p>
          Getting dressed up and traveling with good friends makes for a shared,
          unforgettable experience.
        </p>
        <Logo />
      </div>
      <div className="container">
        <h5 className="h5">Contact Info</h5>
        <div className="info">
          <PhoneIcon />
          <Link to={"tel=+256773539420"}>+256 773539420</Link>
        </div>
        <div className="info">
          <LocateFixedIcon />
          <address>184 Main Street East Pearl Harbour 8007</address>
        </div>
        <div className="info">
          <Timer />
          <p>Mon - Sat 8.00 - 18.00 Sunday CLOSED</p>
        </div>
        <div className="socials">
          <Link target="_blank" to={"https://www.facebook.com"}>
            <FaFacebook />
          </Link>
          <Link target="_blank" to={"https://www.twitter.com"}>
            <FaTwitter />
          </Link>
          <Link target="_blank" to={"https://www.youtube.com"}>
            <FaPinterest />
          </Link>
          <Link target="_blank" to={"https://www.pinterest.com"}>
            <FaInstagram />
          </Link>
          <Link target="_blank" to={"https://www.instagram.com"}>
            <FaYoutube />
          </Link>
        </div>
      </div>

      <div className="container">
        <h5 className="h5">Newsletter</h5>
        <p>Don&apos;t miss a thing! Sign up today and receive our newsletter</p>
        <div className="input-container">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            onClick={handleNewsletterSubscription}
          >
            {isSubscribing ? (
              <div className="flex justify-center items-center gap-2">
                <Loader className="animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <span>Subscribe</span>
            )}
          </Button>
        </div>
      </div>
      <Toaster />
    </footer>
  );
};

export default Footer;
