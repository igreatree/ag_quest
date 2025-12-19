import { WelcomeStep } from "./components/WelcomeStep";
import { Stack, Stepper } from "@mantine/core";
import { SumQuest } from "./components/SumQuest";
import { TaskWrapper } from "./components/TaskWrapper";
import { useAppStore } from "./store";
import { MultiplyQuest } from "./components/MultiplyQuest";
import { Finish } from "./components/Finish";

function App() {
  const { started, setStarted, step } = useAppStore();

  if (!started) return <WelcomeStep onStart={() => setStarted(true)} />;

  return (
    <Stack w="100vw" h="100vh" p="xl" align="center">
      <Stepper
        w="100%"
        active={step}
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
          <TaskWrapper description="You'll have to complete several tasks, some of which will have a time limit. You only have 10 attempts, after which you'll start over. If you complete all the tasks, you're super cool 😎" />
        </Stepper.Step>
        <Stepper.Step>
          <TaskWrapper description="Addition and Subtraction. You will need to count 10 expressions in 40 seconds. Good luck!">
            <SumQuest />
          </TaskWrapper>
        </Stepper.Step>
        <Stepper.Step>
          <TaskWrapper description="Multiplication and Division. You will need to count 10 expressions in 50 seconds. Good luck!">
            <MultiplyQuest />
          </TaskWrapper>
        </Stepper.Step>
        <Stepper.Step icon="AG">
          <Finish />
        </Stepper.Step>
      </Stepper>
    </Stack>
  );
}

export default App;
