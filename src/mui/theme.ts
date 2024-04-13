import { mixins } from "./mixins.ts";
import { alpha, createTheme } from "@mui/material";

export const theme = createTheme({
        mixins,

        palette: {
            primary: {
                main: "#DC1840"
            },
            secondary: {
                main: "#45436b"
            },
            background: {
                default: "#EEE9EA"
            }
        },

        typography: {
            fontFamily: "Lato, sans-serif",
            h2: {
                fontWeight: 700
            },
            h6: {
                fontSize: "24px",
                fontWeight: 700
            },
            body2: {
                margin: 0
            },
            body1: {
                margin: 0
            }

        },

        components: {
            MuiSlider: {
                styleOverrides: {
                    root: {
                        height: "8px",
                        borderRadius: 0
                    },
                    mark: {
                        height: "12px",
                        background: "#000",
                        opacity: 1
                    },
                    markLabel: {
                        fontSize: "20px",
                        opacity: .7
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        height: "50px",
                        boxShadow: "none",
                        textTransform: "none",
                        fontSize: "16px"
                    }
                }
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        fontSize: "16px",
                        fontWeight: 400,
                        background: alpha("#000", 0.75),
                        padding: "4px 16px",
                        cursor: "default",
                        borderRadius: "3px",
                        userSelect: "none",
                    }
                }
            }
        }

    })
;