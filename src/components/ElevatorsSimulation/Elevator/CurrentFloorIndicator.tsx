import { styled } from "@mui/material";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";

import type { ElevatorState } from "@Elevator/@types.ts";

const CurrentFloorIndicatorBase = styled("span", {
    shouldForwardProp: (prop) => prop !== "color"
})<{ color: ElevatorState["color"] }>(({ theme, ...props }) => ({
    position: "absolute",
    width: "100%",
    transition: "bottom .5s",
    background: props.color,
    zIndex: 1
}));

interface CurrentFloorIndicatorProps extends Pick<ElevatorState, "currentFloor" | "color"> {
};

const CurrentFloorIndicator: React.FunctionComponent<CurrentFloorIndicatorProps> = (props) => {
    const { system } = useElevatorSystemContext();

    return (
        <CurrentFloorIndicatorBase color={props.color} sx={{
            height: `calc(( 100% - ${system.maxFloor * 2}px)/ ${system.maxFloor + 1})`,
            bottom: `calc(100% / ${system.maxFloor + 1} * ${props.currentFloor})`
        }} />
    );
};

export default CurrentFloorIndicator;