import { CarCard } from "@/components";
import Section from "@/components/shared/Section";
import { toastError } from "@/constants";
import { CarBrandsSkeleton } from "@/skeletons";
import axios, { isAxiosError } from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom"
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
              <Section>
                <h2 className="text-center pb-4 text-n-3 sm:text-2xl text-xl font-semibold">
                  Choose your <b className="capitalize text-2xl sm:text-3xl">{rentals[0]?.brand} </b> to rent Now!
                </h2>
                <div className="grid gap-4 grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-[1200px] mx-auto">
                  {rentals.map((rentals) => (
                    <CarCard rental={rentals} />
                  ))}
                </div>
            </Section>
            </>
          )
         )}
      </div>
  )
}

export default CarBrand