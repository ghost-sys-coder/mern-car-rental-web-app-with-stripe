import { IStepperMethods } from "types";
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
  brand: z
    .string()
    .min(2, { message: "Brand must at least be 2 characters" })
    .max(20, { message: "The brand cannot exceed 20 characters" }),
});

const Brand = ({ handleNextStep, handlePreviousStep }: IStepperMethods) => {
  const brands = [
    { name: "Mercendez", value: "mercendez" },
    { name: "Toyota", value: "toyota" },
    { name: "BMW", value: "bmw" },
    { name: "Lexus", value: "lexus" },
    { name: "Range Rover", value: "Range Rover" },
    {name: "Nissan", value: "nissan"}
  ];

  const rentalStore = useRentalListingStore();

  /** define the form */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: rentalStore.data.brand
    },
  });

  /** handle submit */
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    rentalStore.updateState({
      brand: data.brand
    })

    handleNextStep();
  };
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-gray-500 sm:text-xl">Car Brands</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Brand</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Car Brand</SelectLabel>
                      {brands.map(({ name, value }) => (
                        <SelectItem key={value} value={value}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select a brand that matches the car
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

export default Brand;
