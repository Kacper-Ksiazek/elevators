import {ElevatorMoveDirection} from "./@types.ts";

export class Stops extends Array<number> {
    public constructor(private currentDirection: ElevatorMoveDirection | null = null) {
        super();
    }

    set setCurrentDirection(direction: ElevatorMoveDirection) {
        this.currentDirection = direction;
    }

    get lastStop(): number {
        return this[this.length - 1];
    }

    get firstStop(): number {
        return this[0];
    }

    get asArray(): number[] {
        return new Array(...this);
    }

    public insertAtIndex(value: number, index: number): void {
        this.splice(index, 0, value)
    }

    public addStop(floor: number, direction: "CURRENT_DIRECTION" | "OPPOSITE_DIRECTION"): void {
        if (this.length === 0) {
            this.push(floor);
            return;
        }

        if (direction === "CURRENT_DIRECTION") this.pushInDirection(floor);
        else this.pushInOppositeDirection(floor);
    }

    private pushInDirection(stopToBeAdded: number): void {

        if(!this.twoFloorsAreInSameDirection(this.firstStop, stopToBeAdded)) {
            this.unshift(stopToBeAdded);
            return;
        }

        let stopHasBeenAdded: boolean = false;

        let previousFloor: number | null = null;
        let currentFloor: number;

        let stopToBeAddedIsNotInDirection: boolean;
        let twoConsecutiveFloorsAreNotInDirection: boolean;

        // Otherwise, we need to insert the new stop in the right place
        for (let i = 0; i < this.length; i++) {
            currentFloor = this[i];
            stopToBeAddedIsNotInDirection = !this.twoFloorsAreInSameDirection(currentFloor, stopToBeAdded);
            twoConsecutiveFloorsAreNotInDirection = previousFloor !== null && !this.twoFloorsAreInSameDirection(previousFloor, currentFloor);

            if (stopToBeAddedIsNotInDirection || twoConsecutiveFloorsAreNotInDirection) {
                this.insertAtIndex(stopToBeAdded, i);
                stopHasBeenAdded = true;
                break;
            }

            previousFloor = this[i];
        }

        if (!stopHasBeenAdded) this.push(stopToBeAdded);
    }

    private pushInOppositeDirection(stopToBeAdded: number): void {
        if(!this.twoFloorsAreInSameDirection(this.lastStop, stopToBeAdded)) {
            this.push(stopToBeAdded);
            return;
        }

        let stopHasBeenAdded: boolean = false;

        let previousFloor: number | null = null;
        let currentFloor: number;

        let stopToBeAddedIsNotInDirection: boolean;
        let twoConsecutiveFloorsAreInDirection: boolean;

        // Otherwise, we need to insert the new stop in the right place
        for (let i = this.length - 1; i >= 0; i--) {
            currentFloor = this[i];
            stopToBeAddedIsNotInDirection = !this.twoFloorsAreInSameDirection( stopToBeAdded, currentFloor);
            twoConsecutiveFloorsAreInDirection = previousFloor !== null && !this.twoFloorsAreInSameDirection(currentFloor, previousFloor);

            if (stopToBeAddedIsNotInDirection || twoConsecutiveFloorsAreInDirection) {
                this.insertAtIndex(stopToBeAdded, i);
                stopHasBeenAdded = true;
                break;
            }

            previousFloor = this[i];
        }

        if (!stopHasBeenAdded) this.push(stopToBeAdded);
    }

    private twoFloorsAreInSameDirection(floor1: number, floor2: number): boolean {
        if (floor1 === floor2) return false;
        return floor1 < floor2 ? this.currentDirection === "UP" : this.currentDirection === "DOWN";
    }
}

