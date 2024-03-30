import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, ShoppingBag } from "lucide-react";
import { navLinks } from "../../constants";
import { Button } from "../ui/button";
import Logo from "./Logo"
import { useAuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { handleSidebar, handleOpenDropdown, dropdown, setDropdown } = useAuthContext();


  return (
    <header>
      <Logo />
      <nav>
        {navLinks.map((link, index) => {
          const { linkText, dropLinks, linkUrl } = link;
          return (
            dropLinks ? (
              <div className="relative" key={index}>
                <Button
                  variant={"ghost"}
                  type="button"
                  onClick={handleOpenDropdown}
                  className="block w-full"
                >
                  <span>{linkText}</span>
                  <ChevronDown />
                </Button>
                {dropdown && (
                  <div className="dropdown" ref={dropdownRef}>
                  {dropLinks.map((link, index) => (
                    <React.Fragment key={index}>
                      <Link
                        to={link.linkUrl}
                        onClick={()=> setDropdown(false)}
                      >
                        {link.linkText}
                      </Link>
                      <div className="line" />
                    </React.Fragment>
                  ))}
                </div>
                )}
              </div>
            ) : (
              <Link key={index} to={linkUrl}>{linkText}</Link>
            )
          )
        })}
      </nav>
      <div className="flex gap-3 ml-3 justify-center items-center">
        <Menu
          className="text-white font-bold cursor-pointer"
          onClick={handleSidebar}
        />
        <Link to={"/cart"} className="relative">
          <ShoppingBag className="p-2 rounded-full bg-primary text-white cursor-pointer" size={40} />
          <span className="absolute top-0 right-0 text-white font-semibold">0</span>
        </Link>
      </div>
    </header>
  )
}

export default Navbar