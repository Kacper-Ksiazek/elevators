import { alpha, styled, Tooltip } from "@mui/material";
import { getFloorName } from "@/components/ElevatorsSimulation/Elevator/utils";

import type { FunctionComponent } from "react";
import type { ElevatorState } from "@Elevator/@types.ts";
import type { ElevatorRequestingPickupClassName } from "./types.ts";

import { ElevatorPositionMark } from "@/components/ElevatorsSimulation/Elevator/types.ts";

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
        textWeight: "bold"
    },

    [`&.${"goes_through" as ElevatorPositionMark}`]: {
        background: alpha("#000", .15)
    },

    [`&.${"stops_at" as ElevatorPositionMark}`]: {
        background: alpha(props.color, .7)
    },

    [`&.${"selected_floor" as ElevatorRequestingPickupClassName.Floor}`]: {
        background: alpha(props.color, 1),
        color: "#fff"
    },

    [`&.${"picking_floor" as ElevatorRequestingPickupClassName.Floor}`]: {
        cursor: "pointer",
        "&.active": {
            background: alpha(props.color, .5),
            "&:hover": {
                background: alpha(props.color, .3)
            }

        },
        "&:not(&.active)": {
            background: "#d2d2d2",
            "&:hover": {
                background: alpha(props.color, .3)
            }
        }
    }
}));

interface FloorProps {
    /** The number of the floor */
    floorNumber: number;

    /** The color of the elevator */
    color: ElevatorState["color"];

    /** Whether the floor is active */
    mark: ElevatorPositionMark;

    className?: string;

    onClick: () => void;
}

function generateTooltipText(floorNumber: number, mark: ElevatorPositionMark): string {
    switch (mark) {
        case "active":
            return `Elevator is currently at ${getFloorName(floorNumber)} floor`;
        case "stops_at":
            return `Elevator is stopping at ${getFloorName(floorNumber)} floor`;
        case "goes_through":
            return `Elevator is going through ${getFloorName(floorNumber)} floor`;
        default:
            return "";
    }
}

const Floor: FunctionComponent<FloorProps> = (props) => {
    return (
        <Tooltip
            title={generateTooltipText(props.floorNumber, props.mark)}
            placement="top"
        >
            <FloorBase
                className={`${props.className ?? ""} ${props.mark}`}
                color={props.color}
                onClick={props.onClick}
            >
                {props.floorNumber === 0 ? "GROUND" : props.floorNumber}
            </FloorBase>
        </Tooltip>
    );
};

export default Floor;