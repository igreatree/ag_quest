import { useEffect, useState } from "react";
import { Box, Button, FocusTrap, Stack, TextInput } from "@mantine/core";
import { TextType } from "../TypeText";
import { NextButton } from "../NextButton";
import Counter from "../Counter";
import { useAppStore } from "../../store";
import classNames from "classnames";
import styles from "./passwordQuest.module.scss";

const timer = 60;

export const PasswordQuest = () => {
  const { attemps, setAttemps, status, setStatus } = useAppStore();
  const [timerValue, setTimerValue] = useState(timer);
  const [inputValue, setInputValue] = useState("");
  const [answerStatus, setAnswerStatus] = useState<typeof status>("started");

  const checkAnswer = () => {
    if (inputValue === "") return;
    if (inputValue === "gaibullaev-big-brother->AG") {
      setAnswerStatus("success");
      setStatus("success");
    } else {
      setAnswerStatus("failed");
    }
    setTimeout(() => setAnswerStatus("started"), 1000);
    setInputValue("");
  };

  useEffect(() => {
    if (status === "started") {
      const interval = setInterval(() => {
        setTimerValue((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            setStatus("failed");
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <>
      <div
        style={{
          visibility: "hidden",
          position: "absolute",
          left: "50%",
          top: "50%",
        }}
      >
        <div>
          <div>
            <span>password1:gaibullaev-</span>
          </div>
        </div>
      </div>
      <Stack h="100%" justify="space-between" align="center">
        <Counter
          textColor={
            timerValue <= 5 ? (timerValue < 3 ? "#fa5252" : "orange") : "white"
          }
          places={[10, 1]}
          fontSize={46}
          value={timerValue}
        />
        <Stack align="center">
          <TextType
            text={
              status === "failed"
                ? "Failed!"
                : status === "success"
                ? "Great!"
                : "Guess or find the password!"
            }
            className={classNames(styles.text, styles[status])}
            hideCursorOnEnd
            typingSpeed={32}
            loop={false}
            showCursor={true}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              checkAnswer();
            }}
          >
            <FocusTrap active={!inputValue && status === "started"}>
              {status === "started" && (
                <TextInput
                  placeholder="password"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className={styles[answerStatus]}
                  size="lg"
                />
              )}
            </FocusTrap>
          </form>
        </Stack>
        <Box>
          {status !== "success" && (
            <Button
              size="lg"
              color="teal"
              disabled={attemps === 0}
              onClick={() => {
                setTimerValue(timer);
                setInputValue("");
                setAttemps(attemps - 1);
                setStatus("started");
              }}
            >
              Retry ({attemps})
            </Button>
          )}
          {status === "success" && <NextButton />}
        </Box>
      </Stack>
    </>
  );
};
