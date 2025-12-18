import { useEffect, useState } from "react";
import { Button, Group, Stack, Title } from "@mantine/core";
import { TextType } from "../TypeText";
import { ElectricButton } from "../ElectricButton";
import styles from "./TaskWrapper.module.scss";
import { NextButton } from "../NextButton";
import { BackButton } from "../BackButton";
import { useAppStore } from "../../store";

type TaskWrapperPropsType = {
  description: string;
  children?: React.ReactNode;
};

export const TaskWrapper = ({
  description,
  children,
}: TaskWrapperPropsType) => {
  const { attemps, setAttemps, setStep, status, setStatus } = useAppStore();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setStarted(false);
  }, [description]);

  if (attemps === 0 && status === "failed")
    return (
      <Stack h="100%" justify="center" align="center">
        <Title c="white">Game over!</Title>
        <Button
          color="teal"
          size="lg"
          onClick={() => {
            setAttemps(10);
            setStep(0);
            setStatus("started");
          }}
        >
          Restart
        </Button>
      </Stack>
    );

  if (!started)
    return (
      <Stack h="100%" align="center">
        <Stack flex={1} justify="center" align="center">
          <TextType
            text={description}
            className={styles.text}
            typingSpeed={20}
            loop={false}
            showCursor={true}
          />
        </Stack>
        <Group>
          <BackButton />
          {children && (
            <ElectricButton onClick={() => setStarted(true)}>
              Start
            </ElectricButton>
          )}
          {!children && <NextButton />}
        </Group>
      </Stack>
    );

  return children;
};
