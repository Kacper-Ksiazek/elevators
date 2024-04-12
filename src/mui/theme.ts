import { createTheme } from "@mui/material";

export const theme = createTheme({
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
                        fontSize: "16px",
                    }
                }
            }
        }
    })
;