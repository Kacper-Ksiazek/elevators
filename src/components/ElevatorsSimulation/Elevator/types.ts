import type { ElevatorID } from "@Elevator/@types.ts";
import type { RequestedPickupParams } from "@/contexts/requestPickupContext";

/** Describes the floor on elevator route */
export type ElevatorPositionMark = "active" | "stops_at" | "goes_through" | "none";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ElevatorRequestingPickupClassName {
    type Optional<T> = undefined | T;

    export type Elevator = Optional<"picking_elevator" | "selected_elevator" | "different_elevator_is_selected">;
    export type Floor = Optional<"picking_floor" | "selected_floor" | "all_floors_are_selected">;

    export function getElevatorClassName(params: {
        isRequestingPickup: boolean,
        elevatorID: ElevatorID,
        pickup: RequestedPickupParams
    }): Elevator {
        const { isRequestingPickup, elevatorID, pickup } = params;

        // If the pickup is not requested, return undefined
        if (!isRequestingPickup) return undefined;

        // Check whether the elevator has been already selected
        else if (pickup.elevatorID === null) return "picking_elevator";

        // Check whether the different from current elevator is selected
        else if (pickup.elevatorID !== elevatorID) return "different_elevator_is_selected";

        // Check whether the current elevator is selected
        return elevatorID === pickup.elevatorID ? "selected_elevator" : undefined;
    }

    export function getFloorClassName(params: {
        isRequestingPickup: boolean,
        floorID: number,
        elevatorID: ElevatorID,
        pickup: RequestedPickupParams
    }): Floor {
        const { floorID, pickup, isRequestingPickup, elevatorID } = params;

        // If the pickup is not requested or the different elevator is selected, return undefined
        if (!isRequestingPickup || pickup.elevatorID != elevatorID) return undefined;

        // Check whether a current floor has been selected
        else if (floorID === pickup.destinationFloor || floorID === pickup.startFloor) return "selected_floor";

        // Check whether all needed floors are already selected
        else if (pickup.destinationFloor !== null) return "all_floors_are_selected";

        return "picking_floor";
    }
}
