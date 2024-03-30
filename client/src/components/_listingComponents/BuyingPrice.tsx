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
import { useRentalListingStore } from "@/context/AddRentalContext";
import ButtonContainer from "./ButtonContainer";


const formSchema = z.object({
  purchasePrice: z.coerce.number().min(0, { message: "The lowest purchase price is 0!" })
})

const BuyingPrice = ({ handleNextStep, handlePreviousStep }: IStepperMethods) => {
  const rentalStore = useRentalListingStore();

  /** define form */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purchasePrice: rentalStore.data.purchasePrice
    }
  });

  /** handle form submit */
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    rentalStore.updateState({
      purchasePrice: data.purchasePrice
    })

    handleNextStep();
  }
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-gray-500 sm:text-xl">Add purchase price</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="purchasePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Provide the buying price for the car..."
                  />
                </FormControl>
                <FormDescription>
                  This shows the purchase price for a potential buyer
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

export default BuyingPrice