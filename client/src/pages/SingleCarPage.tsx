import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import Section from "@/components/shared/Section"
import { toastError } from "@/constants";
import { IFetchRentals } from "types";
import { CarPageSkeleton } from "@/skeletons";
import { AlignCenterHorizontalIcon, Car, Fuel, Notebook } from "lucide-react";
import { ImageGridModal, RentalFormModal } from "@/components";

const SingleCarPage = () => {
  const { pathname } = useLocation();
  const [rental, setRental] = useState<IFetchRentals | null>(null);
  const [isRentalLoading, setIsRentalLoading] = useState<boolean>(true);

  const id = pathname.split("/")[2];

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const { data } = await axios.get(`/cars/${id}`);
        setRental(data);
      } catch (error) {
        console.log(error);
        let message = 'Something went wrong!'
        if (isAxiosError(error)) {
          message = error.response?.data.message
        } else if (error instanceof Error) {
          message = error.message
        }

        toast(message, toastError);
      } finally {
        setIsRentalLoading(false);
      }
    }
    fetchRental();
  }, [id]);
  return (
    <div className="single-car_page">
      {isRentalLoading ? (
        <CarPageSkeleton />
      ) : (
        <>
          <div className="relative">
            <img
              src={rental?.images[0]}
              alt={rental?.title}
              className="w-full sm:h-[550px] h-[200px] object-cover"
            />
            <div className="flex flex-col gap-4 absolute top-0 bottom-0 left-0 right-0 w-full h-full justify-center items-center p-4">
              <h1 className="font-semibold sm:text-3xl uppercase text-white">{rental?.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: rental?.description?.slice(0, 200) as string }}
                className="text-white font-thin w-full md:w-1/2 text-center sm:block hidden"
              />
            </div>
          </div>
          <Section classes="info-section_wrapper">
            <div className="info-section">
              <div className="description">
                <h2>General Vehicle Description</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: rental?.description as string }}
                  className="content"
                  />
                  <ImageGridModal images={rental?.images} />
              </div>
              <div className="details">
                <div className="container">
                  <div className="rental-price">
                    <h3 className="font-semibold text-xl sm:text-4xl">${rental?.rentalPrice.daily}</h3>
                    <p className="font-thin text-gray-700">/ per day</p>
                  </div>
                  <div className="flex justify-between items-center gap-5 border border-gray-300 rounded-md px-2 py-3 mb-4">
                    <div className="flex gap-2 items-center max-[400px]:hidden">
                      <Notebook className="text-primary font-bold" />
                      <span className="font-semibold text-n-3">Engine</span>
                    </div>
                    <p className="capitalize font-medium text-gray-700">{rental?.brand}</p>
                  </div>
                  <div className="flex justify-between items-center gap-5 border border-gray-300 rounded-md px-2 py-3 mb-4">
                    <div className="flex gap-2 items-center max-[400px]:hidden">
                      <Car className="text-primary font-bold" />
                      <span className="font-semibold text-n-3">Mileage</span>
                    </div>
                    <p className="capitalize font-medium text-gray-700">{rental?.mileage}</p>
                  </div>
                  <div className="flex justify-between items-center gap-5 border border-gray-300 rounded-md px-2 py-3 mb-4">
                    <div className="flex gap-2 items-center max-[400px]:hidden">
                      <AlignCenterHorizontalIcon className="text-primary font-bold" />
                      <span className="font-semibold text-n-3">Transmission</span>
                    </div>
                    <p className="capitalize font-medium text-gray-700">{rental?.transmissionType}</p>
                  </div>
                  <div className="flex justify-between items-center gap-5 border border-gray-300 rounded-md px-2 py-3 mb-4">
                    <div className="flex gap-2 items-center max-[400px]:hidden">
                      <Fuel className="text-primary font-bold" />
                      <span className="font-semibold text-n-3">Engine</span>
                    </div>
                    <p className="capitalize font-medium text-gray-700">{rental?.engine}</p>
                  </div>
                  <RentalFormModal id={id} />
                </div>
              </div>
            </div>
          </Section>
        </>
      )}
      <Toaster />
    </div>
  )
}

export default SingleCarPage