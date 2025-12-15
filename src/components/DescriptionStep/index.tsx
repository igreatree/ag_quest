import SplitText from "../SplitText";
import styles from "./descriptionStep.module.scss";

export const DescriptionStep = () => {
  return (
    <SplitText
      text="You'll have to complete several tasks, some of which will have a time limit. You only have 10 attempts, after which you'll start over. If you complete all the tasks, you're super cool 😎"
      className={styles.text}
      delay={70}
      startDelay={1300}
    />
  );
};
