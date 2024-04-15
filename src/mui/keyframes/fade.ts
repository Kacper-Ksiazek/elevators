import { keyframes } from "@mui/material";

export const fadeIn = keyframes({
    "0%": {
        opacity: 0,
        visibility: "hidden"
    },
    "1%": {
        opacity: 0,
        visibility: "visible"
    },
    "100%": {
        opacity: 1,
        visibility: "visible"
    }
});

export const fadeOut = keyframes({
    "0%": {
        opacity: 1,
        visibility: "visible"
    },
    "99%": {
        opacity: 0,
        visibility: "visible"
    },
    "100%": {
        opacity: 0,
        visibility: "hidden"
    }
});
