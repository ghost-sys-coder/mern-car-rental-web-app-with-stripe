import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Section from "./Section";

const CallUsSection = () => {

  return (
      <Section image={"bg-section-image-2"} classes="flex justify-items items-center h-screen">
          <div className="h-full w-full flex justify-center items-center bg-gray-400 rounded-md bg-clip-padding backdrop-blur-sm backdrop-filter bg-opacity-10 border border-gray-100 px-3">
          <div className="flex flex-col gap-3 max-w-[700px] mx-auto justify-center items-center">
          <h2 className="text-n-3 font-semibold text-xl sm:text-4xl">Our Fleet, Your Fleet</h2>
              <p className="font-semibold text-n-3">We know the difference is in the detail, and that is why our car rental services in the business and tourism industry, stand out for their quality and good taste, to offer you a unique experience!</p>
              <h3 className="text-gray-200 font-thin text-xl sm:text-4xl">Call Us Now: +256773539420</h3>
              <Button asChild>
                  <Link to={"tel:+256773539420"}>Request A Quote</Link>
              </Button>
          </div>
          </div>
      </Section>
  )
}

export default CallUsSection