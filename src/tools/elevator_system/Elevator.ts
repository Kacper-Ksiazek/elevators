import { ElevatorRoute } from "@Elevator/ElevatorRoute.ts";
import { ElevatorCannotMoveThereError } from "@Elevator/Errors/ElevatorCannotMoveThereError.ts";

import type { ElevatorMoveDirection, ElevatorStatus } from "./@types.ts";

export class Elevator {
    /** Elevator has stopped at a floor in order to pick up or drop off passengers */
    private _isAtPause: boolean = false;

    /** All routes the elevator has to take in order */
    public routes: ElevatorRoute[] = [];

    /** The status of the elevator describing its current state and direction of movement */
    get status(): ElevatorStatus {
        if (this._isAtPause) return "STOPPED_AT_FLOOR";
        if (this.routes.length === 0) return "IDLE";

        return `MOVING_${this.routes[0].direction}`;
    }

    get currentFloor(): number {
        return this._currentFloor;
    }

    private get currentRoute(): ElevatorRoute {
        return this.routes[0];
    }

    constructor(private _currentFloor: number = 0) {
        //
    }

    /** Request the elevator to pick up a person from and to specific floors */
    public pickup(startFloor: number, destinationFloor: number) {
        if (startFloor === this._currentFloor)
            return this.pickupFromCurrentFloor(destinationFloor);

        // Otherwise, find the one that can fit the floor
        const direction: ElevatorMoveDirection =
            startFloor < destinationFloor ? "UP" : "DOWN";

        try {
            this.addElevatorStop(startFloor, direction);
            this.addElevatorStop(destinationFloor, direction);
        } catch (e) {
            if (e instanceof ElevatorCannotMoveThereError) {
                this.routes.push(this.createDirectRouteToFloor(startFloor));

                this.addElevatorStop(destinationFloor, direction);
            } else throw e;
        }
    }

    /** Request the elevator to pick up a person from the current floor to a specific floor */
    public pickupFromCurrentFloor(destinationFloor: number) {
        if(this.status === "MOVING_UP" || this.status === "MOVING_DOWN") this.pause();

        const direction: ElevatorMoveDirection =
            this._currentFloor < destinationFloor ? "UP" : "DOWN";

        this.addElevatorStop(destinationFloor, direction);


    }

    /** Perform a simulation step of the elevator system */
    public makeSimulationMove() {
        if (this.status === "IDLE") return;

        // The stop lasts for 1 simulation step, so if the elevator has been paused in the previous step, resume
        if (this._isAtPause) return this.unpause();
        // If the elevator is not paused, move it one level closer to the next stop
        else this.processCurrentRoute();

        // If the previous step has finished the current route, delete it and proceed to the next one if there is any
        if (this.currentRoute.stops.length === 0) this.finishCurrentRoute();

        return;
    }

    /** Unpause the elevator */
    private unpause() {
        this._isAtPause = false;
    }

    /** Pause the elevator */
    private pause() {
        this._isAtPause = true;
    }

    /** Finish the current route and proceed to the next one */
    private finishCurrentRoute() {
        this.routes.shift();

        // If there are no more routes,
        if (this.routes.length === 0) return;

        const subsequentRoute: ElevatorRoute = this.routes[0];
        const firstFloorOfSubsequentRoute: number = subsequentRoute.stops[0];

        if (firstFloorOfSubsequentRoute === this._currentFloor) {
            this.routes[0].stops.shift();
            return;
        }
        // if (firstFloorOfSubsequentRoute === this._currentFloor) return;

        // Send the elevator to the first floor of the subsequent route
        if (
            (subsequentRoute.direction === "UP" &&
                firstFloorOfSubsequentRoute < this._currentFloor) ||
            (subsequentRoute.direction === "DOWN" &&
                firstFloorOfSubsequentRoute > this._currentFloor)
        ) {
            this.routes.unshift(
                this.createDirectRouteToFloor(firstFloorOfSubsequentRoute)
            );
        }
    }

    private createDirectRouteToFloor(floor: number): ElevatorRoute {
        const directionTowardsFirstFloorOfSubsequentRoute: ElevatorMoveDirection =
            this._currentFloor < floor ? "UP" : "DOWN";

        const directConnection = new ElevatorRoute(
            this._currentFloor,
            directionTowardsFirstFloorOfSubsequentRoute,
            true
        );
        directConnection.addStop(floor);

        return directConnection;
    }

    private processCurrentRoute() {
        const { currentRoute } = this;
        // Otherwise, move the elevator one level closer to the next stop
        this._currentFloor =
            currentRoute.direction === "UP"
                ? this._currentFloor + 1
                : this._currentFloor - 1;
        currentRoute.currentFloor = this._currentFloor;

        // If the elevator has reached the next stop, remove it from the route and pause
        if (this._currentFloor === currentRoute.stops[0]) {
            currentRoute.stops.shift();
            this.pause();
        }
        return;
    }

    private addElevatorStop(floor: number, direction: ElevatorMoveDirection) {
        // Otherwise, find the one that can fit the floor
        for (const move of this.routes) {
            if (move.direction === direction && move.canFitInQueue(floor)) {
                move.addStop(floor);
                return;
            }
        }

        // Create a new route
        const route = new ElevatorRoute(
            this.routes.length === 0 ? this._currentFloor : "ADAPT",
            direction
        );
        route.addStop(floor);
        this.routes.push(route);
    }
}
