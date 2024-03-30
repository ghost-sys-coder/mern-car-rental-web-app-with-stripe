import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import Section from "./Section"
import { ArrowBigRight } from "lucide-react"


const Hero = () => {
  return (
    <Section image={"bg-section-image-1"}>
      <div className="flex justify-center items-center flex-col gap-4 h-screen">
        <h1 className="sm:text-5xl text-xl text-n-3 font-semibold">Find the car that suits you!</h1>
        <p className="text-xl font-semibold text-n-3">From as low as $10 per day</p>
        <Button className="flex gap-1 items-center justify-center max-sm:w-full">
          <Link to={"/allcars"}>Check out Our collection</Link>
          <ArrowBigRight />
        </Button>
      </div>
    </Section>
  )
}

export default Hero