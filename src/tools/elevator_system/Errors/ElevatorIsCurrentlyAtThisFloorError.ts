export class ElevatorIsCurrentlyAtThisFloorError extends Error {
    constructor(floorNumber: number) {
        super(`Elevator is currently at floor ${floorNumber} and cannot be requested from the same floor.`);
    }
}