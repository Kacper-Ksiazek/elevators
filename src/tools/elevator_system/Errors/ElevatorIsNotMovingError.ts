export class ElevatorIsNotMovingError extends Error {
    constructor() {
        super("The elevator is not moving at all");
    }
}