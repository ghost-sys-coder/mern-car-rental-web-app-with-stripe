import { IStepperMethods } from "types"
import { Textarea } from "../ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod";
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRentalListingStore } from "@/context/AddRentalContext";
import ButtonContainer from "./ButtonContainer";


const formSchema = z.object({
  description: z.string().min(5, {
    message: "Description must at least be 50 characters"
  })
})


const Description = ({ handleNextStep, handlePreviousStep }: IStepperMethods) => {
  const rentalStore = useRentalListingStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: rentalStore.data.description
    }
  });

  /** handle submit */
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    rentalStore.updateState({
      description: data.description
    })

    handleNextStep();
  }
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-gray-500 sm:text-xl">Car Description</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Description</FormLabel>
                <FormControl>

                  <Textarea
                    {...field}
                    placeholder="Provide a description of the car..."
                  />
                </FormControl>
                <FormDescription>
                  This is the car description
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

export default Description