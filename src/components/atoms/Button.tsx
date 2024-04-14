// Tools
import { styled } from "@mui/material";
// Types
import type { FunctionComponent, PropsWithChildren } from "react";
// Material UI Components
import MUIButton from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
// Styles
const ButtonBase = styled(MUIButton)(({ theme }) => ({
    //
}));

interface ButtonProps extends PropsWithChildren {
    /** The text to display in the tooltip */
    tooltip: string;
    /** The function to call when the button is clicked */
    onClick: () => void;
    /** Whether the button is disabled */
    disabled?: boolean;
}

const Button: FunctionComponent<ButtonProps> = (props) => {
    return (
        <Tooltip title={props.tooltip}>
            <ButtonBase
                variant="contained"
                color="secondary"
                onClick={props.onClick}
                disabled={props.disabled}
            >
                {props.children}
            </ButtonBase>
        </Tooltip>
    );
};

export default Button;