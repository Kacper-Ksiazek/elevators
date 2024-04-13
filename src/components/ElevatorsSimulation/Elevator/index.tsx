import React, { FunctionComponent, useMemo } from "react";
import { Stack, styled, Typography } from "@mui/material";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
import type { ElevatorState } from "@Elevator/@types.ts";
import { getElevatorPositionMark, getFloorName } from "./utils";

import MoveDirection from "./MoveDirection.tsx";
import Floor from "./Floor.tsx";
import ElevatorCurrentPosition from "./ElevatorCurrentPosition.tsx";

const ElevatorBase = styled("div")(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    maxWidth: "240px",
    position: "relative",

    ".current-floor": {
        position: "absolute",
        width: "100%"
    },

    "& > *": {
        textAlign: "center"
    }

}));

interface ElevatorProps {
    data: ElevatorState;
    elevatorOrderNumber: number;
}

const Elevator: FunctionComponent<ElevatorProps> = (props) => {
    const { maxFloor, elevatorsAmount } = useElevatorSystemContext();

    const floors: number[] = useMemo<number[]>(() => {
        return [
            ...Array.from({ length: maxFloor + 1 }, (_, i) => i)
        ].reverse();
    }, [maxFloor]);

    return (
        <ElevatorBase sx={{ width: `calc(100% / ${elevatorsAmount})` }}>
            <MoveDirection status={props.data.status} />

            <Stack sx={{ flexGrow: 1, position: "relative", gap: "2px" }}>
                <ElevatorCurrentPosition color={props.data.color} currentFloor={props.data.currentFloor} />

                {floors.map((floor) => {
                    return (
                        <Floor key={floor}
                               color={props.data.color}
                               floorNumber={floor}
                               mark={getElevatorPositionMark({
                                   floor,
                                   nextStops: props.data.nextStops,
                                   elevatorCurrentFloor: props.data.currentFloor
                               })}
                        />
                    );
                })}
            </Stack>

            <Stack sx={{ mt: "8px" }}>
                <Typography variant="h6">
                    Elevator {props.elevatorOrderNumber}
                </Typography>

                <Typography variant="body2" sx={{ mt: "-4px", mb: "4px" }}>
                    id: <strong style={{ color: props.data.color }}>{props.data.elevatorID}</strong>
                </Typography>

                <Typography variant="body2">
                    Currently at: <strong>{getFloorName(props.data.currentFloor)}</strong>
                </Typography>

                <Typography variant="body2">
                    Next
                    stop: <strong>{props.data.nextStops !== null ? getFloorName(props.data.nextStops[0]) : "-"}</strong>
                </Typography>
            </Stack>
        </ElevatorBase>
    );
};

export default Elevator;