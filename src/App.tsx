import { useEffect, useRef } from "react";
import { WelcomeStep } from "./components/WelcomeStep";
import { Stack, Stepper } from "@mantine/core";
import { SumQuest } from "./components/SumQuest";
import { TaskWrapper } from "./components/TaskWrapper";
import { useAppStore } from "./store";
import { MultiplyQuest } from "./components/MultiplyQuest";
import { Finish } from "./components/Finish";
import { SquaresQuest } from "./components/SquaresQuest";
import { PasswordQuest } from "./components/PasswordQuest";
import SoundTrack1 from "./assets/1.mp3";
import SoundTrack2 from "./assets/2.mp3";

function App() {
  const { started, setStarted, step } = useAppStore();
  const audio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (started && audio.current) {
      audio.current.volume = 0.3;
      audio.current.play();
    }
  }, [started, step]);

  return (
    <>
      <audio
        ref={audio}
        src={step === 5 ? SoundTrack2 : SoundTrack1}
        autoPlay
        loop
      />
      {!started && <WelcomeStep onStart={() => setStarted(true)} />}
      {started && (
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
              <TaskWrapper description="Addition and Subtraction: You will need to count 10 expressions in 40 seconds. Good luck!">
                <SumQuest />
              </TaskWrapper>
            </Stepper.Step>
            <Stepper.Step>
              <TaskWrapper description="Multiplication and Division: You will need to count 10 expressions in 50 seconds. Good luck!">
                <MultiplyQuest />
              </TaskWrapper>
            </Stepper.Step>
            <Stepper.Step>
              <TaskWrapper description="Memory test: You will need to remember a sequence of squares within a certain time. The difficulty increases with the number of squares. Good luck!">
                <SquaresQuest />
              </TaskWrapper>
            </Stepper.Step>
            <Stepper.Step>
              <TaskWrapper description="The final task! Hacking :) You must guess or find the password!">
                <PasswordQuest />
              </TaskWrapper>
            </Stepper.Step>
            <Stepper.Step icon="AG">
              <Finish />
            </Stepper.Step>
          </Stepper>
        </Stack>
      )}
    </>
  );
}

export default App;
