import { useState } from "react";
import { WelcomeStep } from "./components/WelcomeStep";
import { Button, Stack, Stepper } from "@mantine/core";
import { DescriptionStep } from "./components/DescriptionStep";

function App() {
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  if (!started) return <WelcomeStep onStart={() => setStarted(true)} />;
  return (
    <Stack w="100vw" h="100vh" p="xl" align="center">
      <Stepper
        w="100%"
        active={active}
        onStepClick={setActive}
        color="teal"
        styles={{
          root: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },

          content: {
            height: "100%",
          },

          stepBody: {
            flex: 1,
          },

          step: {
            padding: 0,
          },

          stepIcon: {
            borderWidth: 4,
          },

          separator: {
            marginLeft: -2,
            marginRight: -2,
            height: 10,
          },
        }}
      >
        <Stepper.Step>
          <DescriptionStep />
        </Stepper.Step>
        <Stepper.Step>step2</Stepper.Step>
        <Stepper.Step>step3</Stepper.Step>
      </Stepper>
      <Button size="lg" color="teal" onClick={nextStep}>
        Next step
      </Button>
    </Stack>
  );
}

export default App;
