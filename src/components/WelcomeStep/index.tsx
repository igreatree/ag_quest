import { Box, Button, Stack, Transition } from "@mantine/core";
import SplitText from "../SplitText";
import styles from "./welcomeStep.module.scss";
import { useDisclosure } from "@mantine/hooks";

type WelcomeStepPropsType = {
  onStart: () => void;
};

export const WelcomeStep = ({ onStart }: WelcomeStepPropsType) => {
  const [opened, { open }] = useDisclosure();
  return (
    <Stack w="100vw" h="100vh" justify="center" align="center">
      <SplitText text="Hello, Brother!" className={styles.title} delay={100} />
      <SplitText
        text="Are you ready to start the quest?"
        className={styles.description}
        delay={70}
        startDelay={1300}
        onLetterAnimationComplete={open}
      />
      <Box h="50" mt={16}>
        <Transition
          mounted={opened}
          transition="pop"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <Button
              variant="gradient"
              gradient={{ from: "#059b50", to: "cyan", deg: 90 }}
              size="lg"
              style={styles}
              onClick={onStart}
            >
              Start!
            </Button>
          )}
        </Transition>
      </Box>
    </Stack>
  );
};
