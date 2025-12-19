import { useEffect, useRef, useState } from "react";
import { Box, Button, Center, Stack, Text, Title } from "@mantine/core";
import { NextButton } from "../NextButton";
import Counter from "../Counter";
import { useAppStore } from "../../store";
import styles from "./squaresQuest.module.scss";

type SquarePropsType = {
  val: number;
  time: number;
  onClick: (val: number) => void;
  left: string;
  top: string;
};

const timer = 3;
const levels = [
  { count: 3, time: 1 },
  { count: 4, time: 1.5 },
  { count: 5, time: 2 },
  { count: 6, time: 2.5 },
  { count: 7, time: 4 },
];

const generateExpression = (level: number) => {
  const { count, time } = levels[level];
  const result: Omit<SquarePropsType, "onClick">[] = [];
  for (let i = 0; i < count; i++) {
    const left = i * (100 / count) + "%";
    const top = Math.random() * 90 + "%";
    let val = Math.floor(Math.random() * count) + 1;
    while (result.find((i) => i.val === val)) {
      val = Math.floor(Math.random() * count) + 1;
    }
    result.push({ left, top, val, time });
  }
  return result;
};

const Square = ({ val, time, left, top, onClick }: SquarePropsType) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(false), time * 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <Center
      pos="absolute"
      bg="white"
      w={50}
      h={35}
      left={left}
      top={top}
      onClick={() => !isVisible && onClick(val)}
    >
      {isVisible && (
        <Text fw="bold" size="xl">
          {val}
        </Text>
      )}
    </Center>
  );
};

export const SquaresQuest = () => {
  const { attemps, setAttemps, status, setStatus } = useAppStore();
  const [timerValue, setTimerValue] = useState(timer);
  const [expressionData, setExpressionData] = useState(generateExpression(0));
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answerStatus, setAnswerStatus] = useState<typeof status>("started");
  const [started, setStarted] = useState(false);
  const answers = useRef<number[]>([]);

  const checkAnswer = () => {
    for (let i = 0; i < answers.current.length; i++) {
      if (answers.current[i] !== i + 1) {
        setAnswerStatus("failed");
        setStatus("failed");
        setTimeout(() => setAnswerStatus("started"), 1000);
        return;
      }
    }
    setAnswerStatus("success");
    setTimeout(() => setAnswerStatus("started"), 1000);
    setCorrectAnswers((prev) => {
      const res = prev + 1;
      if (res === levels.length) {
        setStatus("success");
      } else {
        setExpressionData(generateExpression(res));
      }
      return res;
    });
    setStarted(false);
    answers.current = [];
    setTimerValue(timer);
  };

  useEffect(() => {
    if (status === "started" && !started) {
      const interval = setInterval(() => {
        setTimerValue((prev) => {
          if (prev === 0) {
            clearInterval(interval);
            setStarted(true);
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status, started]);

  return (
    <Stack h="100%" justify="space-between" align="center">
      <Title className={styles[answerStatus]}>
        {correctAnswers} / {levels.length}
      </Title>
      <Stack h="100%" w="100%" pos="relative" justify="center" align="center">
        {status === "failed" && <Title c="white">Wrong!</Title>}
        {status === "success" && <Title c="white">Great!</Title>}
        {!started && status === "started" && (
          <Counter places={[1]} fontSize={46} value={timerValue} />
        )}
        {started &&
          expressionData.map((data, index) => (
            <Square
              key={index}
              {...data}
              onClick={(val) => {
                answers.current.push(val);
                setExpressionData((prev) => {
                  const res = prev.filter((d) => d.val !== val);
                  if (!res.length) {
                    checkAnswer();
                  }
                  return res;
                });
              }}
            />
          ))}
      </Stack>
      <Box>
        {status === "failed" && (
          <Button
            size="lg"
            color="teal"
            disabled={attemps === 0}
            onClick={() => {
              setTimerValue(timer);
              setAttemps(attemps - 1);
              setStatus("started");
              setStarted(false);
              answers.current = [];
              setExpressionData(generateExpression(correctAnswers));
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
