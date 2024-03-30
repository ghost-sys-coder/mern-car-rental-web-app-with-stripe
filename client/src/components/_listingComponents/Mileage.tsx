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


const formSchema = z.object({
  mileage: z.coerce.number().min(0, { message: "The least mileage value is 0!" })
})

const Mileage = ({ handleNextStep, handlePreviousStep }: IStepperMethods) => {
  const rentalStore = useRentalListingStore();
  
  /** define form */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mileage: rentalStore.data.mileage
    }
  });

  /** handle form submit */
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    rentalStore.updateState({
      mileage: data.mileage
    })

    handleNextStep();
  }
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-gray-500 sm:text-xl">Add Mileage</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="mileage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Mileage</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    placeholder="Provide the mileage on the car..."
                  />
                </FormControl>
                <FormDescription>
                  This shows the mileage on the car
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

export default Mileage