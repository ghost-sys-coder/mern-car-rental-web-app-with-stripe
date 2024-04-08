import { CarCard, ListRental } from "@/components";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster } from "react-hot-toast";
import { useRentalProvider } from "@/context/RentalContext";
import { Button } from "@/components/ui/button";
import { IFetchRentals } from "types";
import { CarCardSkeleton } from "@/skeletons";

const AddNewRental = () => {
  const { rentals, loading } = useRentalProvider();
  return (
    <div className="page-container">
      <div className="flex w-full items-center justify-between gap-3 sm:flex-row flex-col">
        <h1>We have {rentals.length} rental{rentals.length <= 1 ? "" : "s"} in our database!</h1>

        <Dialog>
          <DialogTrigger>
            <Button>Add new rental</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new rental car</DialogTitle>
                <ListRental />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="my-10 grid gap-5 grid-cols-1 max-sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-[1200px] mx-auto">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <CarCardSkeleton key={index} />
          ))
        ) : (
            ((rentals as IFetchRentals[])).map((rental: IFetchRentals) => (
              <CarCard rental={rental} />
            ))
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default AddNewRental;
