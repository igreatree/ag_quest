import { Button } from "@mantine/core";
import { useAppStore } from "../../store";

export const BackButton = () => {
  const { step, setStep, setStarted } = useAppStore();
  const backStep = () => (step === 0 ? setStarted(false) : setStep(step - 1));

  return (
    <Button size="lg" color="gray" onClick={backStep}>
      Back
    </Button>
  );
};
