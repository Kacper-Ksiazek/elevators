import { styled } from "@mui/material";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";

import type { ElevatorState } from "@Elevator/@types.ts";

const CurrentFloorIndicatorBase = styled("span", {
    shouldForwardProp: (prop) => prop !== "color"
})<{ color: ElevatorState["color"] }>(({ theme, ...props }) => ({
    position: "absolute",
    width: "100%",
    background: props.color,
    zIndex: 1,
    transition: "bottom .3s linear"
}));

interface ElevatorCurrentPositionProps extends Pick<ElevatorState, "currentFloor" | "color"> {
}

const ElevatorCurrentPosition: React.FunctionComponent<ElevatorCurrentPositionProps> = (props) => {
    const { maxFloor } = useElevatorSystemContext();

    return (
        <CurrentFloorIndicatorBase color={props.color} sx={{
            height: `calc(( 100% - ${maxFloor * 2}px)/ ${maxFloor + 1})`,
            bottom: `calc(100% / ${maxFloor + 1} * ${props.currentFloor})`
        }} />
    );
};

export default ElevatorCurrentPosition;