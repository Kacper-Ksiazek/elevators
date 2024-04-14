/* eslint-disable @typescript-eslint/no-namespace */

export type ElevatorID = `elevator-${number}`;
export type ElevatorMoveDirection = "UP" | "DOWN";

export type ElevatorStatus = `MOVING_${ElevatorMoveDirection}` | "STOPPED_AT_FLOOR" | "IDLE";

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
