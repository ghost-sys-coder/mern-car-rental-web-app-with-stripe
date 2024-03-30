import { ListRental } from "@/components";
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

const AddNewRental = () => {
  const { rentals } = useRentalProvider();
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
      <Toaster />
    </div>
  );
};

export default AddNewRental;
