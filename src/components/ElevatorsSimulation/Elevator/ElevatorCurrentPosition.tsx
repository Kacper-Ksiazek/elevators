import { styled } from "@mui/material";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";

import type { ElevatorState } from "@Elevator/@types.ts";
import type { FunctionComponent } from "react";

const CurrentFloorIndicatorBase = styled("span", {
    shouldForwardProp: (prop) => prop !== "color" && prop !== "hide"
})<{ color: ElevatorState["color"], hide: boolean }>(({ theme, ...props }) => ({
    position: "absolute",
    width: "100%",
    background: props.color,
    zIndex: 1,
    opacity: props.hide ? 0 : 1,
    transition: "all .3s linear"
}));

interface ElevatorCurrentPositionProps extends Pick<ElevatorState, "currentFloor" | "color"> {
    hide: boolean;
}

const ElevatorCurrentPosition: FunctionComponent<ElevatorCurrentPositionProps> = (props) => {
    const { maxFloor } = useElevatorSystemContext();

    return (
        <CurrentFloorIndicatorBase
            color={props.color}
            hide={props.hide}
            sx={{
                height: `calc(( 100% - ${maxFloor * 2}px)/ ${maxFloor + 1})`,
                bottom: `calc(100% / ${maxFloor + 1} * ${props.currentFloor})`
            }}
        />
    );
};

export default ElevatorCurrentPosition;