import { styled } from "@mui/material";

import type { FunctionComponent } from "react";
import type { ElevatorState, ElevatorStatus } from "@Elevator/@types.ts";

import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

const MoveDirectionBase = styled("div")(({ theme }) => ({
    height: "48px",
    marginBottom: "4px",
    ...theme.mixins.flex_center,

    svg: {
        fontSize: "48px",
        color: "inherit"
    }
}));

interface MoveDirectionProps {
    status: ElevatorStatus;
    color: ElevatorState["color"];
}

const MoveDirection: FunctionComponent<MoveDirectionProps> = (props) => {
    return (
        <MoveDirectionBase sx={{ color: props.color }}>
            {(() => {
                switch (props.status) {
                    case "MOVING_UP":
                        return <ArrowUpwardRoundedIcon />;
                    case "MOVING_DOWN":
                        return <ArrowDownwardRoundedIcon />;
                    case "STOPPED_AT_FLOOR":
                        return <PauseRoundedIcon />;
                    default:
                        return <></>;
                    // return <ArrowDownwardRoundedIcon />;
                }
            })()}
        </MoveDirectionBase>
    );
};

export default MoveDirection;