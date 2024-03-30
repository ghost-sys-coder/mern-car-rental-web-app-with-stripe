import { CarCard } from "@/components";
import Section from "@/components/shared/Section";
import { useRentalProvider } from "@/context/RentalContext"
import { AllCarsPageSkeleton } from "@/skeletons";
import { IFetchRentals } from "types";

const AllCars = () => {
    const { rentals, loading } = useRentalProvider();
    return (
        <Section>
            <div className="">
                <h1 className="text-center font-bold text-primary text-xl sm:text-3xl py-3">Explore Our Car Collection</h1>
                <div className="grid gap-6 grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 max-w-[1024px] mx-auto mt-10">
                    {loading ? (
                        <AllCarsPageSkeleton />
                    ) : (
                        ((rentals as IFetchRentals[] || [])).map((rental: IFetchRentals) => (
                            <CarCard rental={rental} />
                        ))
                    )}
                </div>
            </div>
        </Section>
    )
}

export default AllCars