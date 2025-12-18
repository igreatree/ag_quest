import { useState } from "react";
import { Box, Stack, Transition } from "@mantine/core";
import { TextType } from "../TypeText";
import styles from "./welcomeStep.module.scss";
import { ElectricButton } from "../ElectricButton";

type WelcomeStepPropsType = {
  onStart: () => void;
};

export const WelcomeStep = ({ onStart }: WelcomeStepPropsType) => {
  const [active, setActive] = useState(false);
  return (
    <Stack p="md" w="100vw" h="100vh" justify="center" align="center">
      <TextType
        text={["Hello, Brother!"]}
        className={styles.title}
        loop={false}
        showCursor={true}
        hideCursorOnEnd={true}
      />
      <TextType
        text={["Are you ready to start the quest?"]}
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
            <ElectricButton style={styles} onClick={onStart}>
              Ready!
            </ElectricButton>
          )}
        </Transition>
      </Box>
    </Stack>
  );
};
