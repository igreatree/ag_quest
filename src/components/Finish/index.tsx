import { useState } from "react";
import Fireworks from "@fireworks-js/react";
import { Stack, Box, Transition } from "@mantine/core";
import { TextType } from "../TypeText";
import { ElectricButton } from "../ElectricButton";
import styles from "./finish.module.scss";
import { useAppStore } from "../../store";

export const Finish = () => {
  const [active, setActive] = useState(false);
  const { setAttemps, setStep, setStatus } = useAppStore();

  return (
    <>
      <Fireworks
        options={{
          rocketsPoint: {
            min: 0,
            max: 100,
          },
        }}
        style={{
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          position: "fixed",
          background: "transparent",
        }}
      />
      <Stack h="100%" justify="center" align="center">
        <TextType
          text={["Congratulations brother!"]}
          className={styles.title}
          loop={false}
          showCursor={true}
          hideCursorOnEnd={true}
        />
        <TextType
          text={["You're super cool 😎"]}
          className={styles.description}
          loop={false}
          showCursor={true}
          initialDelay={1500}
          hideCursorOnInitialDelay={true}
          onFinish={() => setActive(true)}
        />
        <Box h="50" mt={16}>
          <Transition
            mounted={active}
            transition="fade"
            duration={400}
            timingFunction="ease"
          >
            {(styles) => (
              <ElectricButton
                style={styles}
                onClick={() => {
                  setAttemps(10);
                  setStep(0);
                  setStatus("started");
                }}
              >
                Play again
              </ElectricButton>
            )}
          </Transition>
        </Box>
      </Stack>
    </>
  );
};
