import { IStepperMethods } from "types";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { useRentalListingStore } from "@/context/AddRentalContext";
import ButtonContainer from "./ButtonContainer";

/** form schema */
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Car name must be at least five characters",
  }),
});

const Title = ({ handleNextStep, handlePreviousStep }: IStepperMethods) => {
  const rentalStore = useRentalListingStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: rentalStore.data.title
    },
  });

  /** submit */
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    rentalStore.updateState({
      title: data.title,
    })

    handleNextStep();
  };
  return (
    <div className="flex gap-3 flex-col">
      <h2 className="text-gray-500 sm:text-xl">Brand name of the Car</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Provide the name of the car..."
                  />
                </FormControl>
                <FormDescription>
                  This is the public name of the car rental
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <ButtonContainer handlePreviousStep={handlePreviousStep} />
        </form>
      </Form>
    </div>
  );
};

export default Title;
