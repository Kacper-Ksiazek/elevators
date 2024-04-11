export class ElevatorCannotMoveThereError extends Error {
    constructor(msg: string = "The elevator cannot move to the given floor") {
        super(msg);
    }
}