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

  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ButtonContainer from "./ButtonContainer";
import { useRentalListingStore } from "@/context/AddRentalContext";


const formSchema = z.object({
  engine: z.string().min(1, { message: "Engine type missing" })
});

const Engine = ({ handleNextStep, handlePreviousStep }: IStepperMethods) => {

  const engineTypes = [
    { type: "Petrol", value: "petrol", id: 1 },
    { type: "Diesel", value: "diesel", id: 2 }
  ]

  const rentalStore = useRentalListingStore();

  /** define form */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      engine: rentalStore.data.engine
    }
  });

  /** handle submit */
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    rentalStore.updateState({
      engine: data.engine
    })

    handleNextStep();
  }
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-gray-500 sm:text-xl">Engine Type</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="engine"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Car Engine" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Car Engine</SelectLabel>
                      {engineTypes.map(({ type, value, id }) => (
                        <SelectItem key={id} value={value}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose your car engine type
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

export default Engine