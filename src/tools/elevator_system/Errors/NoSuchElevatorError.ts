import type { ElevatorID } from "@Elevator/@types.ts";

/** Error thrown when trying to access an elevator that does not exist */
export class NoSuchElevatorError extends Error {
    public constructor(elevatorID: ElevatorID) {
        super(`No elevator with ID "${elevatorID}" exists.`);
    }
}