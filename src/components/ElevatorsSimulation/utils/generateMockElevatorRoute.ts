import type { ElevatorRequest, ElevatorState } from "@Elevator/@types.ts";

interface GenerateMockElevatorRouteProps {
    maxFloor: number;
    elevatorID: ElevatorState["elevatorID"];
    requestElevator: (request: ElevatorRequest) => void;
}

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTwoDifferentRandomInts(min: number, max: number): [number, number] {
    const firstRandomInt: number = randomInt(min, max);
    let secondRandomInt: number = randomInt(min, max);

    while (firstRandomInt === secondRandomInt) {
        secondRandomInt = randomInt(min, max);
    }

    return [firstRandomInt, secondRandomInt];
}

export function generateMockElevatorRoute(params: GenerateMockElevatorRouteProps): void {
    const numberOfRidesToGenerate: number = Math.floor(params.maxFloor / 3);

    for (let i = 0; i < numberOfRidesToGenerate; i++) {
        const [startingFloor, destinationFloor]: [number, number] = generateTwoDifferentRandomInts(0, params.maxFloor);

        params.requestElevator({
            elevatorID: params.elevatorID,
            startingFloor,
            destinationFloor
        });
    }

}