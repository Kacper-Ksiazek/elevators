import React, { FunctionComponent, useMemo } from "react";
import { Stack, styled, Typography } from "@mui/material";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
import type { ElevatorState } from "@Elevator/@types.ts";

import MoveDirection from "./MoveDirection.tsx";
import Floor from "./Floor.tsx";
import CurrentFloorIndicator from "./CurrentFloorIndicator.tsx";

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
    const { system } = useElevatorSystemContext();

    const floors: number[] = useMemo<number[]>(() => {
        return [
            ...Array.from({ length: system.maxFloor + 1 }, (_, i) => i)
        ].reverse();
    }, [system.maxFloor]);

    return (
        <ElevatorBase sx={{ width: `calc(100% / ${system.elevatorsAmount})` }}>
            <MoveDirection status={props.data.status} />

            <Stack sx={{ flexGrow: 1, position: "relative", gap: "2px" }}>
                <CurrentFloorIndicator {...props.data} />

                {floors.map((floor) => {
                    return (
                        <Floor floorNumber={floor} key={floor} />
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
                    Currently at: <strong>2nd floor</strong>
                </Typography>

                <Typography variant="body2">
                    Next stop: <strong>7th floor</strong>
                </Typography>
            </Stack>
        </ElevatorBase>
    );
};

export default Elevator;