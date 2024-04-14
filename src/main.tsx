import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { theme } from "./mui/theme.ts";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <ToastContainer position="bottom-right" pauseOnHover={false} />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
