// noinspection JSUnusedLocalSymbols

import { ElevatorMoveDirection } from "./@types.ts";
import { ElevatorCannotMoveThereError } from "./Errors/ElevatorCannotMoveThereError.ts";
import { ElevatorIsCurrentlyAtThisFloorError } from "./Errors/ElevatorIsCurrentlyAtThisFloorError.ts";

export class StopsCollection extends Array<number> {
    get asArray(): number[] {
        return new Array(...this);
    }

    public insertWithOrder(value: number, order: "ASC" | "DESC"): void {
        if (order === "ASC") {
            this.insertInAscendingOrder(value);
        } else {
            this.insertInDescendingOrder(value);
        }
    }

    private insertInAscendingOrder(value: number): void {
        let index: number = 0;
        while (this[index] < value) {
            index++;
        }
        this.splice(index, 0, value);
    }

    private insertInDescendingOrder(value: number): void {
        let index: number = 0;
        while (this[index] > value) {
            index++;
        }
        this.splice(index, 0, value);
    }
}

type CurrentFloor = number | "ADAPT";

export class ElevatorRoute {
    /** The array of floors the elevator is going to stop at in order */
    public stops: StopsCollection;

    get direction(): ElevatorMoveDirection {
        return this._direction;
    }

    constructor(public currentFloor: CurrentFloor,
                private _direction: ElevatorMoveDirection,
                private directConnection: boolean = false
    ) {
        this.stops = new StopsCollection();
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