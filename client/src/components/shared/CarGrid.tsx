import { Link } from "react-router-dom";
import { IFetchRentals } from "types";
import Section from "./Section";
import { RentalByBrandSkeleton } from "@/skeletons";
import { useRentalProvider } from "@/context/RentalContext";

const CarGrid = () => {
  const { brandRentals, brandRentalsLoading } = useRentalProvider();

  return (
    <Section classes="min-h-screen">
      <div className="flex flex-col gap-3 items-center">
        <h2 className="text-xl sm:text-3xl font-bold text-n-3">
          First Class Luxury Car Rental
        </h2>
        <p className="text-gray-600 font-semibold">
          We offer profession car rental services with our wide range of
          high-end cars!
        </p>
      </div>
      {brandRentalsLoading ? (
        <RentalByBrandSkeleton />
      ) : (
        <div className="grid gap-4 grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 max-w-[1024px] mx-auto mt-10">
          {((brandRentals as IFetchRentals[]) || []).map(
            (rental: IFetchRentals) => (
              <Link
                to={`/brands/${rental.brand}/${rental._id}`}
                className="rounded-md shadow-md h-[200px] overflow-hidden relative hover:translate-x-3"
                key={rental._id}
              >
                <img
                  src={rental.images[0]}
                  alt={rental.title}
                  className="h-full w-full object-cover"
                />
                <h3 className="text-white font-semibold uppercase sm:text-xl absolute left-3 bottom-3 z-10">
                  {rental.brand}
                </h3>
              </Link>
            )
          )}
        </div>
      )}
    </Section>
  );
};

export default CarGrid;
