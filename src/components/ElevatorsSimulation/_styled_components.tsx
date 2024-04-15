import { styled } from "@mui/material";

export const AllButtonsWrapper = styled("div")(({ theme }) => ({
    background: theme.palette.background.default,
    height: "64px",
    mt: "16px",
    width: "100%",
    ...theme.mixins.flex_center,
    gap: "8px",
    padding: "0 16px"
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DynamicControlsWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    gap: "8px",
    alignItems: "center",
    width: "840px",
    position: "relative",

    "& > span.smooth-conditional-render-wrapper": {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "100%"
    }
}));

