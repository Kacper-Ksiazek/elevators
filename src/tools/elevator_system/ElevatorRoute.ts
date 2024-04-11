// noinspection JSUnusedLocalSymbols

import { Stops } from "@Elevator/Stops.ts";
import { ElevatorCannotMoveThereError } from "@Elevator/Errors/ElevatorCannotMoveThereError.ts";
import { ElevatorIsCurrentlyAtThisFloorError } from "@Elevator/Errors/ElevatorIsCurrentlyAtThisFloorError.ts";

import type { ElevatorMoveDirection } from "./@types.ts";

type CurrentFloor = number | "ADAPT";

export class ElevatorRoute {
    /** The array of floors the elevator is going to stop at in order */
    public stops: Stops;

    get direction(): ElevatorMoveDirection {
        return this._direction;
    }

    constructor(public currentFloor: CurrentFloor,
                private _direction: ElevatorMoveDirection,
                private directConnection: boolean = false
    ) {
        this.stops = new Stops();
    }

    public canFitInQueue(floor: number): boolean {
        if (this.currentFloor === "ADAPT") return true;
        // If the elevator is in direct connection mode, it can go to any floor, but only to the ONE floor
        if (this.directConnection) return this.stops.length === 0;

        return this.direction === "UP" ? this.currentFloor < floor : this.currentFloor > floor;
    }

    public addStop(floor: number): void {
        // Check if the elevator is already going to the given floor
        if (this.stops.includes(floor)) return;

        // Check if the elevator can fit in the queue and if the floor is not the current floor
        if (this.currentFloor === floor) throw new ElevatorIsCurrentlyAtThisFloorError(this.currentFloor);
        if (!this.canFitInQueue(floor)) throw new ElevatorCannotMoveThereError(`"The elevator cannot move to the given floor, because it is not in the right direction. Current floor: ${this.currentFloor}, destination floor: ${floor} and the direction is ${this.direction}.`);

        // Insert the new stop in the right place
        this.stops.insertWithOrder(
            floor,
            this.direction === "UP" ? "ASC" : "DESC"
        );
    }
}