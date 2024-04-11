import type {ElevatorRequest, ElevatorStatus, ElevatorSystem as IElevatorSystem,} from './@types.ts'

export class ElevatorSystem implements IElevatorSystem {
    public elevatorStatuses: Record<`elevator-${number}`, ElevatorStatus>;

    public constructor(public maxFloor: number, public elevatorCount: number) {
        this.elevatorStatuses = {};
        for (let i = 0; i < elevatorCount; i++) {
            this.elevatorStatuses[`elevator-${i}`] = {currentFloor: 0};
        }
    }

    public requestElevator(request: ElevatorRequest): void {
        throw new Error('Method not implemented.');
    }

    public doSimulationStep(): void {
        throw new Error('Method not implemented.');
    }

}