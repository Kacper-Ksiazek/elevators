// Tools
import { styled, type SxProps } from "@mui/material";
// Types
import type { FunctionComponent, PropsWithChildren } from "react";
// Material UI Components
import MUIButton from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
// Styles
const ButtonBase = styled(MUIButton)(({ theme }) => ({
    alignItems: "center",
    display: "flex",
    svg: {
        marginRight: "4px"
    }
}));

interface ButtonProps extends PropsWithChildren {
    /** The text to display in the tooltip */
    tooltip: string;
    /** The function to call when the button is clicked */
    onClick: () => void;
    /** Whether the button is disabled */
    disabled?: boolean;

    /** The color of the button */
    color?: "primary" | "secondary" | "error";

    /** The style properties */
    sx?: SxProps;
}

const Button: FunctionComponent<ButtonProps> = (props) => {
    return (
        <Tooltip title={props.tooltip}>
            <span>
                <ButtonBase
                    variant="contained"
                    color={props.color ?? "secondary"}
                    onClick={props.onClick}
                    disabled={props.disabled}
                    sx={props.sx}
                >
                    {props.children}
                </ButtonBase>
            </span>
        </Tooltip>
    );
};

export default Button;