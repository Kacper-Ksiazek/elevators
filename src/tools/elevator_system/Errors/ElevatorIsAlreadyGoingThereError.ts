/**
 * Error thrown when trying to add a stop which is already present in the list of stops
 */
export class ElevatorIsAlreadyGoingThereError extends Error {
    constructor() {
        super("The elevator is already going to the destination floor");
    }
}