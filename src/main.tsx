import { createRoot } from "react-dom/client";
import { createTheme, MantineProvider, NumberInput } from "@mantine/core";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "./index.css";

export const theme = createTheme({
  components: {
    NumberInput: NumberInput.extend({
      styles: {
        input: { backgroundColor: "black", color: "white", border: "none" },
      },
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
