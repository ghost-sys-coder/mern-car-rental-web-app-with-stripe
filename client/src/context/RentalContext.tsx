/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, ReactNode, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { IFetchRentals, IRentalContext } from "types";


const RentalContext = createContext<IRentalContext | null>(null);


const RentalProvider = ({ children }: { children: ReactNode }) => {
    const [rentals, setRentals] = useState<IFetchRentals[]>([]);
    const [loading, setLoading] = useState(false);

    const [brandRentals, setBrandRentals] = useState<IFetchRentals[]>([]);
  const [brandRentalsLoading, setBrandRentalsLoading] = useState<boolean>(false);


    /** fetch rentals */
    const fetchRentals = useCallback(async () => {
        setLoading(true);
            try {
                const { data } = await axios.get("/cars");
                setRentals(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
    }, [])
    useEffect(() => {
        fetchRentals();
    }, [fetchRentals]);

    /** find the first array by brand and put them into an arra */
    useEffect(() => {
        const fetchFirstEntryRentalByBrand = async () => {
          setBrandRentalsLoading(true);
    
          try {
            const { data } = await axios.get("/cars/fetch/brands");
            setBrandRentals(data);
          } catch (error) {
            console.log(error);
          } finally {
            setBrandRentalsLoading(false);
          }
        };
    
        fetchFirstEntryRentalByBrand();
      }, [])

    return (
        <RentalContext.Provider
            value={{
                loading,
                rentals,
                fetchRentals,
                brandRentalsLoading,
                brandRentals
            }}
        >
            {children}
        </RentalContext.Provider>
    )
}


export default RentalProvider;

export const useRentalProvider = () => {
    const context = useContext(RentalContext);

    if (!context) {
        throw new Error("useContext must be used within a provider")
    }

    return context;
}