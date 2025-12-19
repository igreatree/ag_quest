import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider, NumberInput } from "@mantine/core";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "./index.css";

window.password2 = "big-";
document.cookie = "password3=brother->AG";

export const theme = createTheme({
  components: {
    NumberInput: NumberInput.extend({
      styles: {
        input: {
          width: 166,
          backgroundColor: "black",
          color: "white",
          border: "none",
        },
      },
      classNames: { input: "input" },
      defaultProps: {
        radius: "md",
      },
    }),
  },
});

createRoot(document.getElementById("root")!).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>
);
