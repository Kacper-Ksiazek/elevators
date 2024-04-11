/* eslint-disable @typescript-eslint/no-namespace */

export type ElevatorID = `elevator-${number}`;
export type ElevatorMoveDirection = "UP" | "DOWN";

export type ElevatorStatus = `MOVING_${ElevatorMoveDirection}` | "STOPPED_AT_FLOOR" | "IDLE";


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
    elevatorCount: number;

    /** The current status of all elevators */
    elevatorStatuses: Record<ElevatorID, ElevatorStatus>;

    /** Request an elevator to pick up a person */
    requestElevator(request: ElevatorRequest): void;

    /** Simulate a step of the elevator system */
    doSimulationStep(): void;
}
