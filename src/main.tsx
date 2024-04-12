import "./index.css";
import React from "react";
import { theme } from "./mui/theme.ts";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
