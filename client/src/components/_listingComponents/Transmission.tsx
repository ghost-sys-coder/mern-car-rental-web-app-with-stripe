import { IStepperMethods } from "types"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRentalListingStore } from "@/context/AddRentalContext";
import ButtonContainer from "./ButtonContainer";

const formSchema = z.object({
  transmissionType: z.string().min(1, {message: "Transmission type missing!"})
})

const Transmission = ({ handleNextStep, handlePreviousStep }: IStepperMethods) => {
  const transmission = [
    { id: 1, type: "Manual", value:"manual" },
    {id: 2, type: "Automatic", value: "automatic"}
  ]

  const rentalStore = useRentalListingStore();

  /**define form */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transmissionType: rentalStore.data.transmissionType
    }
  });

  /** handle form submit */
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    rentalStore.updateState({
      transmissionType: data.transmissionType
    })

    handleNextStep();
  }
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-gray-500 sm:text-xl">Transmission Type</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="transmissionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Transmission</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Transmission" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Car Transmission</SelectLabel>
                      {transmission.map(({ type, value, id }) => (
                        <SelectItem key={id} value={value}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the transmission type for the car
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

export default Transmission