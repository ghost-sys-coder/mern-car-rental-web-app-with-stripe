import { Button } from "../ui/button";
import { Loader } from "lucide-react";

interface IStepperMethods {
  handlePreviousStep: () => void;
  handleFunction?: () => void;
  text?: string | "Next";
  loading?: boolean;
}

const ButtonContainer = ({
  handlePreviousStep,
  text = "Next",
  handleFunction,
  loading,
}: IStepperMethods) => {
  return (
    <div className="flex justify-between items-center gap-3">
      <Button
        onClick={handlePreviousStep}>Previous</Button>
      <Button
        onClick={handleFunction}
        type="submit"
        disabled={loading && text !== "Next"}
      >
        {text !== "Next" && loading ? (
          <div className="flex gap-2 justify-center items-center z-10 flex-col sm:flex-row">
            <Loader className="animate-spin font-bold text-white" size={30} />
            <p className=" font-semibold text-white sm:text-sm">
              Creating new car rental....
            </p>
          </div>
        ) : (
          <span>{text}</span>
        )}
      </Button>
    </div>
  );
};

export default ButtonContainer;
