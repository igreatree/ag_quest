import { useAppStore } from "../../store";
import { ElectricButton } from "../ElectricButton";

export const NextButton = () => {
  const { step, setStep, setStatus } = useAppStore();
  const nextStep = () => {
    setStep(step + 1);
    setStatus("started");
  };
  return <ElectricButton onClick={nextStep}>Next</ElectricButton>;
};
