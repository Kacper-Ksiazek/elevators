/* eslint-disable @typescript-eslint/no-namespace */

import { ProxyStops } from "@Elevator/ProxyStops.ts";
import type { Stops } from "@Elevator/Stops.ts";

/** The ID of an elevator */
export type ElevatorID = `elevator-${number}`;

/** The direction of elevator movement */
export type ElevatorMoveDirection = "UP" | "DOWN";

/** The status of an elevator */
export type ElevatorStatus = `MOVING_${ElevatorMoveDirection}` | "STOPPED_AT_FLOOR" | "IDLE";

/** Interface describing the state of an elevator */
export interface ElevatorState {
    elevatorID: ElevatorID;

    /** The current floor the elevator is on */
    currentFloor: number;

    /** The status of the elevator */
    status: ElevatorStatus;

    /** The floors the elevator will stop at next */
    nextStops: number[] | null;

    /** In the form of "#RRGGBB" */
    color: `#${string}`;
}

/** Interface describing a request for an elevator */
export interface ElevatorRequest {
    elevatorID: ElevatorID;
    startingFloor: number;
    destinationFloor: number;
}

export interface ElevatorSystem {
    /** The ultimate floor number in the building */
    maxFloor: number;

    /** The number of elevators in the building */
    elevatorsAmount: number;

    /** Whether the simulation can proceed meaning there is an elevator that can move */
    simulationCanProceed: boolean;

    /** The current status of all elevators */
    status: ElevatorState[];

    /** Request an elevator to pick up a person */
    requestElevator(request: ElevatorRequest): void;

    /** Simulate a step of the elevator system */
    doSimulationStep(): void;
}
export interface Elevator {
    /** All routes the elevator has to take in order */
    routes: ElevatorRoute[];

    /** All floors that are connected by proxies */
    proxies: ProxyStops;

    /** The current status of the elevator */
    status: ElevatorStatus;

    /** The current floor the elevator is on */
    currentFloor: number;

    /** Request the elevator to pick up a person from and to specific floors */
    pickup(startFloor: number, destinationFloor: number): void;

    /** Request the elevator to pick up a person from the current floor to a specific floor */
    pickupFromCurrentFloor(destinationFloor: number | number []): void;

    /** Perform a simulation step of the elevator system */
    makeSimulationMove(): void;
}

export interface ElevatorRoute {
    /** The array of floors the elevator is going to stop at in order */
    stops: Stops;

    /** The direction in which the elevator is moving during this route */
    direction: ElevatorMoveDirection;

    /** Returns boolean value if the elevator can fit in the route*/
    canFit(floor: number): boolean;

    /** Add a new stop to the route */
    addStop(floor: number): void;
}
