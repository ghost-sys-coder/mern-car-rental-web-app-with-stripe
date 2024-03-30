import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { ChevronDown, LogIn, LogOut, PhoneIcon, X } from "lucide-react";
import { navLinks } from "../../constants";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { Button } from "../ui/button";
import LinkComponent from "./LinkComponent";

const Sidebar = () => {
  const [openSideBarDropdown, setOpenSideBarDropdown] = useState(false);
  const { handleSidebar, isUserAuthenticated, handleUserLogout } = useAuthContext();

  const handleSideBarDropdown = () => {
    setOpenSideBarDropdown((value) => !value);
  };

  return (
    <div className="sidebar">
      <div className="bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 px-6 py-4 sm:w-[300px] w-full flex flex-col gap-3">
        <div className="sticky flex justify-end items-start">
          <X
            onClick={handleSidebar}
            size={50}
            className="p-2 rounded-full bg-primary text-white hover:translate-x-2 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-5">
          <LinkComponent
            handleSidebar={handleSidebar}
          />
          {navLinks.map((link) => {
            const { dropLinks, id, linkText, linkUrl } = link;
            return dropLinks ? (
              <div key={id}>
                <button
                  type="button"
                  className="flex justify-between items-center gap-2 w-full py-1 text-white font-thin"
                  onClick={handleSideBarDropdown}
                >
                  <span>{linkText}</span>
                  <ChevronDown />
                </button>
                {openSideBarDropdown && (
                  <div className="flex flex-col gap-2">
                    {dropLinks.map((link) => (
                      <Link
                        key={link.id}
                        to={link.linkUrl || ""}
                        className="text-white font-thin px-4 py-1 text-sm hover:bg-indigo-400"
                        onClick={handleSidebar}
                      >
                        {link.linkText}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={id}
                to={linkUrl || ""}
                className="text-white font-thin hover:text-primary"
                onClick={handleSidebar}
              >
                {linkText}
              </Link>
            );
          })}

          <p className="text-white font-semibold mt-4">For More Information</p>

          <div className="flex gap-1 justify-start items-center">
            <PhoneIcon className="text-gray-400 font-semibold hover:text-primary" />
            <Link
              className="text-gray-400 hover:text-primary font-semibold"
              to={"tel:+256773539420"}
            >
              +256773539420
            </Link>
          </div>

          <div className="social-links">
            <Link to={"https://www.facebook.com"} target="_blank">
              <FaFacebook />
            </Link>
            <Link to={"https://www.twitter.com"} target="_blank">
              <FaTwitter />
            </Link>
            <Link to={"https://www.youtube.com"} target="_blank">
              <FaYoutube />
            </Link>
            <Link to={"https://www.instagram.com"} target="_blank">
              <FaInstagram />
            </Link>
          </div>

          <div className="flex justify-center items-center">
            {isUserAuthenticated ? (
              <Button
                onClick={handleUserLogout}
                className="w-full flex gap-2 justify-center items-center hover:bg-indigo-600">
                <LogOut />
                <span>Logout</span>
              </Button>
            ) : (
              <Button asChild className="w-full flex gap-2 justify-center items-center hover:bg-indigo-600">
                <Link to={"/login"}>
                  <LogIn />
                  <span>LogIn Now</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
