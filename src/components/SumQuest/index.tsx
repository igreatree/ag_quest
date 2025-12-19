import { useEffect, useState } from "react";
import { Box, Button, FocusTrap, NumberInput, Stack } from "@mantine/core";
import { TextType } from "../TypeText";
import { NextButton } from "../NextButton";
import Counter from "../Counter";
import { useAppStore } from "../../store";
import classNames from "classnames";
import styles from "./sumQuest.module.scss";

const successCount = 10;
// const successCount = 1;
const timer = 40;
// const timer = 1;

const generateExpression = () => {
  const operator = ["+", "-"][Math.floor(Math.random() * 2)];
  const a = Math.floor(Math.random() * 99);
  const b = Math.floor(Math.random() * 99);
  if (operator === "-") {
    if (a >= b) {
      return { epxpression: `${a} - ${b} = ?`, answer: a - b };
    } else {
      return { epxpression: `${b} - ${a} = ?`, answer: b - a };
    }
  } else {
    return { epxpression: `${a} + ${b} = ?`, answer: a + b };
  }
};

export const SumQuest = () => {
  const { attemps, setAttemps, status, setStatus } = useAppStore();
  const [timerValue, setTimerValue] = useState(timer);
  const [inputValue, setInputValue] = useState<number | string>("");
  const [expressionData, setExpressionData] = useState(generateExpression());
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answerStatus, setAnswerStatus] = useState<typeof status>("started");

  const checkAnswer = () => {
    if (inputValue === "") return;
    if (+inputValue === expressionData.answer) {
      setAnswerStatus("success");
      setExpressionData(generateExpression());
      setCorrectAnswers((prev) => {
        const val = prev + 1;
        if (val === successCount) {
          setStatus("success");
        }
        return val;
      });
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
              ? "Timeout!"
              : status === "success"
              ? "Great!"
              : expressionData.epxpression
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
              <NumberInput
                hideControls
                placeholder={`Answers: (${correctAnswers} / ${successCount})`}
                value={inputValue || ""}
                onChange={(val) => setInputValue(+val)}
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
              setCorrectAnswers(0);
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
  );
};
