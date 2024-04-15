import type { ElevatorID } from "@Elevator/@types.ts";
import type { RequestedPickupParams } from "@/contexts/requestPickupContext";

/** Describes the floor on elevator route */
export type ElevatorPositionMark = "active" | "stops_at" | "goes_through" | "none";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ElevatorRequestingPickupClassName {
    type Optional<T> = undefined | T;

    export type Elevator = Optional<"picking_elevator" | "selected_elevator" | "different_elevator_is_selected">;
    export type Floor = Optional<"picking_floor" | "selected_floor">;

    export function getElevatorClassName(params: {
        isRequestingPickup: boolean,
        elevatorID: ElevatorID,
        pickup: RequestedPickupParams
    }): Elevator {
        const { isRequestingPickup, elevatorID, pickup } = params;

        if (!isRequestingPickup) return undefined;
        else if (pickup.elevatorID === null) return "picking_elevator";
        else if (pickup.elevatorID !== elevatorID) return "different_elevator_is_selected";
        return elevatorID === pickup.elevatorID ? "selected_elevator" : undefined;
    }

    export function getFloorClassName(params: {
        isRequestingPickup: boolean,
        floorID: number,
        elevatorID: ElevatorID,
        pickup: RequestedPickupParams
    }): Floor {
        const { floorID, pickup, isRequestingPickup, elevatorID } = params;
        if (!isRequestingPickup || pickup.elevatorID != elevatorID) return undefined;

        return floorID === pickup.destinationFloor || floorID === pickup.startFloor ? "selected_floor" : "picking_floor";
    }
}
