import { useAppStore } from "../../store";
import { ElectricButton } from "../ElectricButton";

export const NextButton = () => {
  const { step, setStep } = useAppStore();
  const nextStep = () => {
    setStep(step + 1);
  };
  return <ElectricButton onClick={nextStep}>Next</ElectricButton>;
};
