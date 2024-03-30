import { useEffect, useState } from "react";
import { CarsToggleButtonSkeleton, RentalByBrandSkeleton } from "@/skeletons";
import Section from "./Section";
import { useRentalProvider } from "@/context/RentalContext";
import { Button } from "../ui/button";
import axios from "axios";
import { IFetchRentals } from "types";
import { Link } from "react-router-dom";

const CarsToggle = () => {
    const { brandRentals, brandRentalsLoading } = useRentalProvider();
    const [selectedBrand, setSelectedBrand] = useState<string>('All');
    const [rentals, setRentals] = useState<IFetchRentals[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const handleBrandSelect = async (brand: string) => {
            setLoading(true);
            
            try {
                const { data } = await axios.get(`/cars/brands/${brand}`);
                setRentals(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        handleBrandSelect(selectedBrand);
    }, [selectedBrand])

    const handleSelectBrand = (brand: string) => {
        setLoading(true);
        setSelectedBrand(brand)
    }

    return (
        <Section classes="min-h-screen">
            <div className="">
                <h2 className="text-xl sm:text-3xl font-bold text-n-3 text-center pb-3">
                    Find Car by your favorite brand!
                </h2>
                <p className="text-gray-600 font-semibold text-center pb-8">
                    We offer profession car rental services with our wide range of
                    high-end cars!
                </p>

                {brandRentalsLoading ? (
                    <CarsToggleButtonSkeleton />
                ) : (
                    <div className={"flex justify-center items-center gap-3 flex-wrap"}>
                        <Button
                            className={`bg-n-2 w-[150px] shadow-md capitalize ${selectedBrand === "All" ? "bg-primary" : ""} `}
                            onClick={() => handleSelectBrand("All")}
                        >
                            All
                        </Button>
                        {brandRentals.map((rental) => (
                            <Button
                                key={rental._id}
                                className={`bg-n-2 w-[150px] shadow-md capitalize ${selectedBrand === rental.brand ? "bg-primary" : ""}`}
                                onClick={() => handleSelectBrand(rental.brand)}
                            >
                                {rental.brand}
                            </Button>
                        ))}
                    </div>
                )}

                {loading ? (
                    <RentalByBrandSkeleton />
                ) : (
                    <div className="grid gap-4 grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 max-w-[1024px] mx-auto mt-10">
                        {rentals.map((rental) => (
                            <Link
                                key={rental._id}
                                to={`/cars/${rental._id}`}
                                className="rounded-md shadow-md h-[200px] overflow-hidden relative hover:translate-x-3"
                            >
                                <img src={rental.images[0]} alt={rental.title} className="h-full w-full object-cover" />
                                <h3 className="text-white font-semibold uppercase sm:text-xl absolute left-3 bottom-3 z-10">{rental.brand}</h3>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </Section>
    );
};

export default CarsToggle;
