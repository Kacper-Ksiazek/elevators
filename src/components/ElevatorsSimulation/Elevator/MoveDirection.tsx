import { styled } from "@mui/material";

import type { FunctionComponent } from "react";
import type { ElevatorState, ElevatorStatus } from "@Elevator/@types.ts";

import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import SmoothConditionalRender from "@/components/atoms/SmoothConditionalRender.tsx";

const MoveDirectionBase = styled("div")(({ theme }) => ({
    height: "48px",
    marginBottom: "4px",
    ...theme.mixins.flex_center,

    svg: {
        fontSize: "48px",
        color: "inherit"
    },

    "&> span": {
        ...theme.mixins.flex_center
    }
}));

interface MoveDirectionProps {
    status: ElevatorStatus;
    color: ElevatorState["color"];
}

const MoveDirection: FunctionComponent<MoveDirectionProps> = (props) => {
    return (
        <MoveDirectionBase sx={{ color: props.color }}>
            <SmoothConditionalRender when={props.status === "STOPPED_AT_FLOOR"}>
                <PauseRoundedIcon />
                <span>Stopped at floor</span>
            </SmoothConditionalRender>

            <SmoothConditionalRender when={props.status === "MOVING_UP"}>
                <ArrowUpwardRoundedIcon />
                <span>Moving up</span>
            </SmoothConditionalRender>

            <SmoothConditionalRender when={props.status === "MOVING_DOWN"}>
                <ArrowDownwardRoundedIcon />
                <span>Moving down</span>
            </SmoothConditionalRender>
        </MoveDirectionBase>
    );
};

export default MoveDirection;