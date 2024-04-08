import { RecentPosts, SocialLinks } from "@/components";
import Section from "@/components/shared/Section";
import { toastError } from "@/constants";
import { CarBrandsSkeleton } from "@/skeletons";
import axios, { isAxiosError } from "axios";
import { CalendarCheck, Check, PhoneIcon } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom"
import { IFetchRentals } from "types";


const CarBrand = () => {
  const [rentals, setRentals] = useState<IFetchRentals[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const { pathname } = useLocation();

  const brand = pathname.split("/")[2];
  
  useEffect(() => {
    const fetchCarsByBrand = async () => {
      setLoading(true);

      try {
        const { data } = await axios.get(`/cars/brands/${brand}`);
        setRentals(data);
      } catch (error) {
        let message = "Operation failed!";

        if (isAxiosError(error)) {
          message = error.response?.data.message;
        } else if (error instanceof Error) {
          message = error.message
        }
        toast.error(message, toastError);
      } finally {
        setLoading(false);
      }
    }
    fetchCarsByBrand();
  }, [brand])

  return (
      <div className="brands-page">
      {loading ? (
         <CarBrandsSkeleton />
      ) : (
          rentals && (
            <>
              <div className="heading-container">
              <img
                src={rentals[0]?.images[0]}
                alt="image"
              />
              <div className="content">
                <h1>{rentals[0]?.brand}</h1>
              </div>
            </div>
              <Section classes="flex gap-10 max-w-[1200px] mx-auto flex-wrap flex-col lg:flex-row">
                <div className="flex-1 flex flex-col gap-5">
                  {rentals.map((rental) => (
                    <Link to={`/cars/${rental._id}`} key={rental._id} className="mb-10">
                      <img
                        src={rental.images[0]}
                        alt={rental.title}
                        className="w-full h-[300px] object-cover rounded-md shadow-md"
                      />
                      <div className="flex justify-between gap-10 py-3 flex-wrap">
                        <h3 className="font-semibold text-n-3 uppercase sm:text-xl">{rental.title}</h3>
                        <div className="flex gap-2">
                          <p className="font-semibold text-xl sm:text-3xl text-n-3">
                            <sup className="font-thin text-gray-700 pr-1">$</sup>
                            150
                            <sub className="font-thin text-gray-700 px-1 py-2">per Day</sub>
                          </p>
                        </div>
                        <div className="w-full flex flex-col gap-3 items-center">
                          <div className="flex gap-2 items-center text-gray-600">
                            <Check />
                            <span>Engine: {rental.engine}</span>
                          </div>
                          <div className="flex gap-2 items-center text-gray-600">
                            <Check />
                            <span>Transmission: {rental.transmissionType}</span>
                          </div>
                          <div className="flex gap-2 items-center text-gray-600">
                            <Check />
                            <span>Mileage: {rental.mileage}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="right">
                  <div className="container">
                    <div className="top-header">
                      <h2 className="font-semibold sm:text-xl pb-2 border-gray-300 border-b-1">For More Information</h2>
                      <div className="flex gap-3 justify-start items-center font-semibold text-gray-400">
                        <PhoneIcon />
                        <Link to={"tel:+256773539420"}>+256773539420</Link>
                      </div>
                      <div className="flex gap-3 justify-start items-center font-semibold text-gray-400">
                        <CalendarCheck />
                        <span>Mon - Sat 8.00 - 18.00</span>
                      </div>
                    </div>
                  <RecentPosts />
                  <SocialLinks />
                  </div>
                </div>
            </Section>
            </>
          )
         )}
      </div>
  )
}

export default CarBrand