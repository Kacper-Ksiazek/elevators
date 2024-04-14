import type { ElevatorID, ElevatorRequest, ElevatorState, ElevatorSystem as IElevatorSystem } from "./@types.ts";
import { Elevator } from "@Elevator/Elevator.ts";
import { NoSuchElevatorError } from "@Elevator/Errors";

interface ElevatorSystemConstructorParams {
    maxFloor: number;
    elevatorsAmount: number;
}

const COLORS: Record<ElevatorID, ElevatorState["color"]> = {
    "elevator-0": "#FF5733",
    "elevator-1": "#48A9A6",
    "elevator-2": "#5733FF",
    "elevator-3": "#FF33A1",
    "elevator-4": "#33A1FF",
    "elevator-5": "#FFA500",
    "elevator-6": "#FF338B",
    "elevator-7": "#274690",
    "elevator-8": "#006400",
    "elevator-9": "#C19149",
    "elevator-10": "#8B4513",
    "elevator-11": "#0077B6",
    "elevator-12": "#8A2BE2",
    "elevator-13": "#ECA72C",
    "elevator-14": "#A05C54",
    "elevator-15": "#1DD79D"
};

export class ElevatorSystem implements IElevatorSystem {
    private readonly _maxFloor: number;
    private readonly _elevatorsAmount: number;

    private elevators: Record<ElevatorID, Elevator> = {};

    public constructor({ maxFloor, elevatorsAmount }: ElevatorSystemConstructorParams) {
        this._maxFloor = maxFloor;
        this._elevatorsAmount = elevatorsAmount;

        for (let i = 0; i < elevatorsAmount; i++) {
            this.elevators[ElevatorSystem.generateElevatorID(i)] = new Elevator(0);
        }
    }

    get simulationCanProceed(): boolean {
        return Object.values(this.elevators).some((elevator) => elevator.status !== "IDLE");
    }

    get status(): IElevatorSystem["status"] {
        return Object.entries(this.elevators).map(([_elevatorID, elevator]) => {
            const elevatorID: ElevatorID = _elevatorID as ElevatorID;

            return {
                elevatorID,
                currentFloor: elevator.currentFloor,
                status: elevator.status,
                nextStops: elevator.routes.length > 0 ? elevator.routes[0].stops : null,
                color: COLORS[elevatorID]
            };
        });
    }

    get maxFloor(): number {
        return this._maxFloor;
    }

    get elevatorsAmount(): number {
        return this._elevatorsAmount;
    }

    public requestElevator(request: ElevatorRequest): void {
        const elevatorByID = this.getElevatorByID(request.elevatorID);

        elevatorByID.pickup(request.startingFloor, request.destinationFloor);
    }

    public doSimulationStep(): void {
        for (const elevator of Object.values(this.elevators)) {
            elevator.makeSimulationMove();
        }
    }

    public static generateElevatorID(index: number): ElevatorID {
        return `elevator-${index}`;
    }

    private getElevatorByID(elevatorID: ElevatorID): Elevator {
        const elevator = this.elevators[elevatorID];

        // Ensure the elevator exists
        if (!elevator) throw new NoSuchElevatorError(elevatorID);

        return elevator;
    }
}