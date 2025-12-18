import { Button, type ButtonProps } from "@mantine/core";
import ElectricBorder from "../ElectricBorder";

export const ElectricButton = (
  props: ButtonProps & { onClick: () => void }
) => (
  <ElectricBorder
    color={props.disabled ? "transparent" : "#42e8ccff"}
    speed={1}
    chaos={0.5}
    thickness={2}
    style={props.style as React.CSSProperties}
  >
    <Button variant="subtle" color="white" size="lg" {...props}>
      {props.children}
    </Button>
  </ElectricBorder>
);
