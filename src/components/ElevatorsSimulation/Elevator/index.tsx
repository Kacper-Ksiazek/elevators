// Tools and hooks
import { getElevatorPositionMark, getFloorName } from "./utils";
import { useFloors } from "./hooks/useFloors.ts";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
import { useRequestPickupContext } from "@/hooks/useRequestPickupContext.ts";
// Types
import { ElevatorRequestingPickupClassName } from "./types.ts";
import type { FunctionComponent } from "react";
import type { ElevatorState } from "@Elevator/@types.ts";
// Components
import Floor from "./Floor.tsx";
import MoveDirection from "./MoveDirection.tsx";
import FloorsWrapper from "./FloorsWrapper.tsx";
import { Stack, styled, Typography } from "@mui/material";
import ElevatorCurrentPosition from "./ElevatorCurrentPosition.tsx";

const ElevatorBase = styled("div")(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    maxWidth: "240px",
    position: "relative",

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
    const requestPickupContext = useRequestPickupContext();

    const floors = useFloors(maxFloor);

    /**
     * Handles the click on the elevator ( one big vertical rectangle )
     */
    function onElevatorClick() {
        if (!requestPickupContext.isRequestingPickup || requestPickupContext.requestParams.elevatorID !== null) return;

        requestPickupContext.updateRequestParams({
            elevatorID: props.data.elevatorID
        });
    }

    /**
     * Handles the click on the floor ( many small horizontal rectangles )
     * @param floorNumber The number of the floor starting from 0
     */
    function onFloorClick(floorNumber: number) {
        if (!requestPickupContext.isRequestingPickup) return;

        const { updateRequestParams, requestParams } = requestPickupContext;

        if (requestParams.startFloor === null) {
            return updateRequestParams({
                startFloor: floorNumber
            });
        } else if (requestParams.destinationFloor === null) {
            updateRequestParams({
                destinationFloor: floorNumber
            });
        }
    }

    return (
        <ElevatorBase
            onClick={onElevatorClick}
            sx={{ width: `calc(100% / ${elevatorsAmount})` }}
        >
            <MoveDirection
                status={props.data.status}
                color={props.data.color}
            />

            <FloorsWrapper
                color={props.data.color}
                className={ElevatorRequestingPickupClassName.getElevatorClassName({
                    elevatorID: props.data.elevatorID,
                    pickup: requestPickupContext.requestParams,
                    isRequestingPickup: requestPickupContext.isRequestingPickup
                })}
            >
                <ElevatorCurrentPosition
                    color={props.data.color}
                    currentFloor={props.data.currentFloor}
                    hide={requestPickupContext.isRequestingPickup}
                />

                {floors.map((floor) => {
                    const className = ElevatorRequestingPickupClassName.getFloorClassName({
                        elevatorID: props.data.elevatorID,
                        floorID: floor,
                        isRequestingPickup: requestPickupContext.isRequestingPickup,
                        pickup: requestPickupContext.requestParams
                    });

                    return (
                        <Floor
                            key={floor}
                            color={props.data.color}
                            floorNumber={floor}
                            onClick={() => onFloorClick(floor)}
                            mark={getElevatorPositionMark({
                                floor,
                                nextStops: props.data.nextStops,
                                elevatorCurrentFloor: props.data.currentFloor
                            })}
                            className={className}
                        />
                    );
                })}
            </FloorsWrapper>

            <Stack sx={{ mt: "8px" }}>
                <Typography variant="h6">
                    Elevator {props.elevatorOrderNumber}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ mt: "-4px", mb: "4px" }}
                >
                    id: <strong style={{ color: props.data.color }}>{props.data.elevatorID}</strong>
                </Typography>

                <Typography variant="body2">
                    Currently at: <strong>{getFloorName(props.data.currentFloor)}</strong>
                </Typography>

                <Stack
                    sx={{
                        opacity: props.data.status === "IDLE" ? 0.3 : 1,
                        transition: "opacity .2s"
                    }}
                >
                    <Typography variant="body2">
                        Next
                        stop: <strong>{props.data.nextStops !== null ? getFloorName(props.data.nextStops[0]) : "-"}</strong>
                    </Typography>
                </Stack>
            </Stack>
        </ElevatorBase>
    );
};

export default Elevator;