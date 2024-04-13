import type { ElevatorPositionMark } from "../types.ts";
import type { ElevatorMoveDirection, ElevatorState } from "@Elevator/@types.ts";

interface GetElevatorPositionMarkParams {
    /** The floor for which the mark is calculated */
    floor: number;

    /** The next stops of the elevator */
    nextStops: ElevatorState["nextStops"];

    /** Current floor of the elevator */
    elevatorCurrentFloor: number;
}

export function getElevatorPositionMark(params: GetElevatorPositionMarkParams): ElevatorPositionMark {
    const { floor, elevatorCurrentFloor, nextStops } = params;

    // Check if the floor is the current floor
    if (floor === elevatorCurrentFloor) return "active";

    // Ensure that the elevator is moving
    else if (nextStops === null || nextStops.length === 0) return "none";


    // Check if the floor is one of the next stops
    else if (nextStops.includes(floor)) return "stops_at";

    // Check if the floor is between the current floor and the last stop
    const lastStop: number = nextStops[nextStops.length - 1];
    const direction: ElevatorMoveDirection = lastStop > elevatorCurrentFloor ? "UP" : "DOWN";

    if (
        (direction === "UP" && floor > elevatorCurrentFloor && floor < lastStop) ||
        (direction === "DOWN" && floor < elevatorCurrentFloor && floor > lastStop)
    ) return "goes_through";

    //
    return "none";
}