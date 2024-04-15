// Tools and hooks
import { getElevatorPositionMark, getFloorName } from "./utils";
import React, { FunctionComponent, useMemo } from "react";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
import { useRequestPickupContext } from "@/hooks/useRequestPickupContext.ts";
// Types
import { ElevatorRequestingPickupClassName } from "./types.ts";
import type { ElevatorState } from "@Elevator/@types.ts";
// Components
import Floor from "./Floor.tsx";
import MoveDirection from "./MoveDirection.tsx";
import { keyframes, Stack, styled, Typography } from "@mui/material";
import ElevatorCurrentPosition from "./ElevatorCurrentPosition.tsx";

const fadeIn = keyframes({
    "0%": {
        opacity: 0,
        visibility: "hidden"
    },
    "1%": {
        opacity: 0,
        visibility: "visible"
    },
    "100%": {
        opacity: 1,
        visibility: "visible"
    }
});

const fadeOut = keyframes({
    "0%": {
        opacity: 1,
        visibility: "visible"
    },
    "99%": {
        opacity: 0,
        visibility: "visible"
    },
    "100%": {
        opacity: 0,
        visibility: "hidden"
    }
});

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

const FloorsWrapper = styled("div", {
    shouldForwardProp: (prop: string) => prop !== "color"
})<{ color: string }>(({ theme, ...props }) => ({
    flexGrow: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    transition: "opacity .3s",

    ".current-floor": {
        position: "absolute",
        width: "100%"
    },

    "&:after": {
        content: "''",
        ...theme.mixins.absolute_full,
        background: "#d2d2d2",
        zIndex: 1,
        transition: "all .2s",
        opacity: 1,
        cursor: "pointer",
        animationDuration: ".2s",
        animationPlayState: "linear",
        animationName: fadeOut,
        animationFillMode: "both"
    },

    [`&.${"picking_elevator" as ElevatorRequestingPickupClassName.Elevator}`]: {
        "&:after": {
            animationName: fadeIn
        },
        "&:hover:after": {
            background: props.color
        }
    },

    [`&.${"different_elevator_is_selected" as ElevatorRequestingPickupClassName.Elevator}`]: {
        opacity: .16,
        "&:after": {
            animationName: fadeIn
        }
    }
}));


function useFloors(maxFloor: number): number[] {
    return useMemo<number[]>(() => {
        return [
            ...Array.from({ length: maxFloor + 1 }, (_, i) => i)
        ].reverse();
    }, [maxFloor]);
}

interface ElevatorProps {
    data: ElevatorState;
    elevatorOrderNumber: number;
}

const Elevator: FunctionComponent<ElevatorProps> = (props) => {
    const { maxFloor, elevatorsAmount } = useElevatorSystemContext();
    const requestPickupContext = useRequestPickupContext();

    const floors = useFloors(maxFloor);

    function onElevatorClick() {
        requestPickupContext.updateRequestParams({
            elevatorID: props.data.elevatorID
        });
    }

    function onFloorClick(floorNumber: number) {
        const { updateRequestParams, requestParams } = requestPickupContext;

        console.log(requestParams);

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