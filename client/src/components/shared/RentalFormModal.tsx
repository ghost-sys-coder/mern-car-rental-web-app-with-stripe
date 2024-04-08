import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { CalendarCheck, DoorOpenIcon, Loader } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import axios, { isAxiosError } from "axios"
import { toastError, toastSuccess } from "@/constants"
import { IBookingForm } from "types"
import { useAuthContext } from "@/context/AuthContext"



const RentalFormModal = ({ id }: { id: string }) => {
    const { userProfile: { _id } } = useAuthContext();
    const [details, setDetails] = useState<IBookingForm>({
        carId: id,
        userId: _id,
        fullName: "",
        email: "",
        phoneNumber: "",
        location: "",
        landMark: "",
    });
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(new Date());
    const [openStartDate, setOpenStartDate] = useState<boolean>(false);
    const [openEndDate, setOpenEndDate] = useState<boolean>(false);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setDetails({ ...details, [name]: value })
    }

    /** handle date closing and opening */
    const handleStartDateOpen = () => {
        if (openEndDate) {
            setOpenEndDate(false);
        }

        setOpenStartDate((prevValue)=> !prevValue)
    }

    const handleEndDateOpen = () => {
        if (startDate) {
            setOpenStartDate(false);
        }

        setOpenEndDate((prevValue)=> !prevValue)
    }


    /** handle form submit */
    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log(details, startDate, endDate)

        try {
            const { status, data } = await axios.put("/", details);
            if (status === 200) {
                toast.success(data, toastSuccess);
            }
        } catch (error) {
            console.log(error);
            let message = 'Something went wrong!';
            if (isAxiosError(error)) {
                message = error.response?.data.message;
            } else if (error instanceof Error) {
                message = error.message
            }

            toast.error(message, toastError);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="flex justify-center items-center w-full">
                <Button>
                    <DoorOpenIcon />
                    <span>Rent Now</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-n-3 h-[600px] overflow-y-auto hide-scrollbar">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-3xl font-bold text-n-3 pb-3">
                        Book your car now
                    </DialogTitle>
                    <form
                        onSubmit={handleFormSubmit}
                        className="booking-form">
                        <div className="input-container">
                            <Label htmlFor="fullName">Enter your full name</Label>
                            <Input
                                name="fullName"
                                placeholder="Enter fullname..."
                                value={details.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                name="email"
                                value={details.email}
                                onChange={handleChange}
                                placeholder="Provide your email"
                            />
                        </div>
                        <div className="input-container">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                name="phoneNumber"
                                placeholder="Provide your phone number"
                                value={details.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                name="location"
                                placeholder="Provide your current location"
                                value={details.location}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <Label htmlFor="landMark">LandMark</Label>
                            <Input
                                name="landMark"
                                placeholder="Provide an identifiable landmark around your location"
                                value={details.landMark}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-container">
                            <Label
                                htmlFor="startDate"
                                className="w-full flex gap-1 justify-start items-center gap py-2 px-2 rounded-md cursor-pointer my-1 border border-primary"
                                onClick={handleStartDateOpen}
                            >
                                <CalendarCheck />
                                <span>Start dating</span>
                            </Label>
                            {openStartDate && (
                                <Calendar
                                    mode="single"
                                    className="text-white"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                />
                            )}
                        </div>
                        <div className="input-container">
                            <Label
                                htmlFor="startDate"
                                className="w-full flex gap-1 justify-start items-center gap py-2 px-2 rounded-md cursor-pointer my-1 border-2 border-primary shadow-md"
                                onClick={handleEndDateOpen}
                            >
                                <CalendarCheck />
                                <span>Ending date</span>
                            </Label>
                            {openEndDate && (
                                <Calendar
                                    mode="single"
                                    className="text-white"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                />
                            )}
                        </div>

                        <div className="flex">
                            <Button className="w-full flex justify-center items-center">
                                {isSubmitting ? (
                                    <>
                                        <Loader className="animate-spin" />
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <span>Submit</span>
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default RentalFormModal