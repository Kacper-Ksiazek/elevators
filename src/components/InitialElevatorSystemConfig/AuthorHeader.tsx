// Tools and hooks
import { alpha, IconButton, Stack, styled, Tooltip } from "@mui/material";
// Types
import type { FunctionComponent } from "react";
// Icons
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";


const FooterBase = styled("footer")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "128px !important",

    p: {
        color: alpha("#000", .6)
    },

    strong: {
        color: "#000"
    },

    button: {
        color: alpha("#000", .6),
        transition: "all .2s",
        svg: {
            fontSize: "28px"
        },
        "&:hover": {
            color: "#000"
        }
    }

}));

const AuthorHeader: FunctionComponent = () => {
    return (
        <FooterBase>
            <p>created by: <strong>Kacper Książek</strong></p>

            <Stack direction="row">
                <Tooltip title="See my linkedin profile">
                    <a
                        href="https://www.linkedin.com/in/kacper-b-ksi%C4%85%C5%BCek/"
                        target="_blank"
                    >
                        <IconButton>
                            <LinkedInIcon />
                        </IconButton>
                    </a>
                </Tooltip>

                <Tooltip title="See my github profile">
                    <a
                        href="https://github.com/Kacper-Ksiazek"
                        target="_blank"
                    >
                        <IconButton>
                            <GitHubIcon />
                        </IconButton>
                    </a>
                </Tooltip>
            </Stack>

        </FooterBase>
    );
};

export default AuthorHeader;