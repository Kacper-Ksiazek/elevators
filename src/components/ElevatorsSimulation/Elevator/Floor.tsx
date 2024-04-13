import { alpha, styled } from "@mui/material";
import { ElevatorPositionMark } from "@/components/ElevatorsSimulation/Elevator/types.ts";

import type { FunctionComponent } from "react";
import type { ElevatorState } from "@Elevator/@types.ts";

const FloorBase = styled("div", {
    shouldForwardProp: (prop) => prop !== "color"
})<{ color: ElevatorState["color"] }>(({ theme, ...props }) => ({
    flexGrow: 1,
    background: alpha("#000", .05),
    color: alpha("#000", .5),
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    transition: "all .2s",

    [`&.${"active" as ElevatorPositionMark}`]: {
        color: "#fff",
        textWeight: "bold",
        fontSize: "18px",
        background: alpha(props.color, .7)
    },

    [`&.${"goes_through" as ElevatorPositionMark}`]: {
        background: alpha("#000", .15)
    },

    [`&.${"stops_at" as ElevatorPositionMark}`]: {
        background: alpha(props.color, .7)
    }
}));

interface FloorProps {
    /** The number of the floor */
    floorNumber: number;

    /** The color of the elevator */
    color: ElevatorState["color"];

    /** Whether the floor is active */
    mark: ElevatorPositionMark;
}

const Floor: FunctionComponent<FloorProps> = (props) => {
    return (
        <FloorBase className={props.mark} color={props.color}>
            {props.floorNumber === 0 ? "GROUND" : props.floorNumber}
        </FloorBase>
    );
};

export default Floor;