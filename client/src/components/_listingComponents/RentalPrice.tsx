import { IStepperMethods } from "types"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import ButtonContainer from "./ButtonContainer";
import { useRentalListingStore } from "@/context/AddRentalContext";

/** define schema */
const formSchema = z.object({
  daily: z
    .coerce.number({ invalid_type_error: "Amount must be a number" })
    .positive({ message: "Figure must be positive" })
    .finite({ message: "Amount must be a valid amount" }),
  hourly: z
    .coerce.number({ invalid_type_error: "Amount must be a number" })
    .positive({ message: "Figure must be positive" })
    .finite({ message: "Amount must be a valid amount" })
})
const RentalPrice = ({ handleNextStep, handlePreviousStep }: IStepperMethods) => {
  const rentalStore = useRentalListingStore();

  /** define form */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      daily: rentalStore.data.rentalPrice?.daily,
      hourly: rentalStore.data.rentalPrice?.hourly
    }
  });

  /** handle submit */
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    rentalStore.updateState({
      rentalPrice: {
        daily: data.daily,
        hourly: data.hourly
      }
    })

    handleNextStep();
  }
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-gray-500 sm:text-xl">Add Hourly and Daily Pricing</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <FormField
            name="daily"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Pricing</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Daily pricing..."
                  />
                </FormControl>
                <FormDescription>
                  Daily rental price...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="hourly"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hourly Pricing</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Hourly pricing..."
                  />
                </FormControl>
                <FormDescription>
                  Hourly rental price...
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <ButtonContainer handlePreviousStep={handlePreviousStep} />
        </form>
      </Form>
    </div>
  )
}

export default RentalPrice