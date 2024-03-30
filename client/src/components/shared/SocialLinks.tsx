import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPinterest } from "react-icons/fa"


const socialMediaLinks = [
    {
        Icon: FaFacebook,
        url: "https://www.facebook.com",
        color: "text-blue-600"
    },
    {
        Icon: FaInstagram,
        url: "https://www.instagram.com",
        color: "text-pink-600"
    },
    {
        Icon: FaTwitter,
        url: "https://www.twitter.com",
        color: "text-blue-400"
    },
    {
        Icon: FaYoutube,
        url: "https://www.youtube.com",
        color: "text-red-600"
    },
    {
        Icon: FaPinterest,
        url: "https://www.pinterest.com",
        color: "text-red-800"
    }
]

const SocialLinks = () => {

  return (
      <div className="socials">
          <h4 className="font-semibold text-n-3 border-b border-gray-300 pb-2">Connect with Us</h4>
          <div className="flex gap-5 items-center justify-start mt-4">
              {socialMediaLinks.map(({Icon, url, color}, index) => (
                  <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${color} hover:scale-110 transition-transform`}
                  >
                      <Icon size={"1.8em"} />
                  </a>
            ))}  
          </div>
    </div>
  )
}

export default SocialLinks