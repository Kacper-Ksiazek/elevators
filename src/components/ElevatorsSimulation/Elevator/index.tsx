import React, { FunctionComponent, useMemo } from "react";
import { alpha, Stack, styled, Typography } from "@mui/material";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
import type { ElevatorState } from "@Elevator/@types.ts";

import MoveDirection from "./MoveDirection.tsx";

const ElevatorBase = styled("div")(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    maxWidth: "240px",

    "div.floor": {
        flexGrow: 1,
        background: alpha("#000", .05),
        color: alpha("#000", .5),
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
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

            {floors.map((floor, index) => {
                return (
                    <div key={index} className="floor">
                        {floor === 0 ? "GROUND" : floor}
                    </div>
                );
            })}

            <Stack>
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