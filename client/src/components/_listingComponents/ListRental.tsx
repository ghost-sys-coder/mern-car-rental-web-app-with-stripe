import { useState } from "react";
import { Progress } from "../ui/progress";
import BuyingPrice from "./BuyingPrice";
import Description from "./Description";
import Engine from "./Engine";
import Mileage from "./Mileage";
import RentalPrice from "./RentalPrice";
import Title from "./Title";
import Transmission from "./Transmission";
import Brand from "./Brand";
import Images from "./Images";


const totalSteps = 9;
const stepIncrement = 100 / totalSteps;

const ListRental = () => {
    const [step, setStep] = useState(1);

    /** handle next step */
    const handleNextStep = () => {
        if (step === totalSteps) return;

        setStep(currentStep => currentStep + 1);
    }

    /** handle previous step */
    const handlePreviousStep = () => {
        if (step === 0) return;

        setStep(currentStep => currentStep - 1);
    }
    return (
        <div className="mt-5">
            <Progress value={step * stepIncrement} className="mb-5" />
            {{
                1: <Title handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />,
                2: <Brand handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />,
                3: <Description handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />,
                4: <Engine handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />,
                5: <Transmission handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />,
                6: <Mileage handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />,
                7: <BuyingPrice handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />,
                8: <RentalPrice handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />,
                9: <Images handleNextStep={handleNextStep} handlePreviousStep={handlePreviousStep} />

            } [step]}
        </div>
    )
}

export default ListRental