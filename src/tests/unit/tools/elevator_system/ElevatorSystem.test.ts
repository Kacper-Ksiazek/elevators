import { ElevatorSystem } from "@Elevator/index.ts";
import { ElevatorStatus } from "@Elevator/@types.ts";

test("Create an instance", () => {
    const elevatorSystem = new ElevatorSystem({
        maxFloor: 10,
        elevatorsAmount: 3
    });

    expect(elevatorSystem).toBe(ElevatorSystem);

    expect(elevatorSystem.maxFloor).toEqual(10);
    expect(elevatorSystem.elevatorsAmount).toEqual(3);

    expect(elevatorSystem.status).toHaveLength(3);

    elevatorSystem.status.forEach(elevator => {
        expect(elevator.currentFloor).toEqual(0);
        expect(elevator.status).toEqual("IDLE");
        expect(elevator.nextStops).toBeNull();
        expect(elevator.color).toMatch(/^#[0-9A-F]{6}$/);
    });
});

test("Pickup three different elevators", () => {
    const elevatorSystem = new ElevatorSystem({
        maxFloor: 10,
        elevatorsAmount: 3
    });

    // Step 0.

    expect(elevatorSystem.status[0].status).toEqual("IDLE");
    expect(elevatorSystem.status[1].status).toEqual("IDLE");
    expect(elevatorSystem.status[2].status).toEqual("IDLE");

    elevatorSystem.requestElevator({
        elevatorID: "elevator-0",
        startingFloor: 0,
        destinationFloor: 5
    });
    expect(elevatorSystem.status[0].status).toEqual("MOVING_UP");
    expect(elevatorSystem.status[0].nextStops).toEqual([5]);

    elevatorSystem.requestElevator({
        elevatorID: "elevator-1",
        startingFloor: 3,
        destinationFloor: 0
    });
    expect(elevatorSystem.status[1].status).toEqual("MOVING_UP");
    expect(elevatorSystem.status[1].nextStops).toEqual([3]);

    elevatorSystem.requestElevator({
        elevatorID: "elevator-2",
        startingFloor: 2,
        destinationFloor: 5
    });
    expect(elevatorSystem.status[2].status).toEqual("MOVING_UP");
    expect(elevatorSystem.status[2].nextStops).toEqual([2]);


    // Step 1.
    elevatorSystem.doSimulationStep();

    expect(elevatorSystem.status[0].currentFloor).toEqual(1);
    expect(elevatorSystem.status[1].currentFloor).toEqual(1);
    expect(elevatorSystem.status[2].currentFloor).toEqual(1);

    // Step 2.
    elevatorSystem.doSimulationStep();

    expect(elevatorSystem.status[0].currentFloor).toEqual(2);
    expect(elevatorSystem.status[1].currentFloor).toEqual(2);
    expect(elevatorSystem.status[2].currentFloor).toEqual(2);

    expect(elevatorSystem.status[2].status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);
    expect(elevatorSystem.status[2].nextStops).toEqual([5]);

    // Step 3.
    elevatorSystem.doSimulationStep();

    expect(elevatorSystem.status[0].currentFloor).toEqual(3);
    expect(elevatorSystem.status[1].currentFloor).toEqual(3);
    expect(elevatorSystem.status[2].currentFloor).toEqual(2);

    expect(elevatorSystem.status[1].status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);
    expect(elevatorSystem.status[1].nextStops).toEqual([0]);

    // Step 4.
    elevatorSystem.doSimulationStep();

    expect(elevatorSystem.status[0].currentFloor).toEqual(4);
    expect(elevatorSystem.status[1].currentFloor).toEqual(3);
    expect(elevatorSystem.status[2].currentFloor).toEqual(3);

    // Step 5.
    elevatorSystem.doSimulationStep();

    expect(elevatorSystem.status[0].currentFloor).toEqual(5);
    expect(elevatorSystem.status[1].currentFloor).toEqual(2);
    expect(elevatorSystem.status[2].currentFloor).toEqual(4);

    expect(elevatorSystem.status[0].status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);
    expect(elevatorSystem.status[0].nextStops).toBeNull();

    // Step 6.
    elevatorSystem.doSimulationStep();

    expect(elevatorSystem.status[0].currentFloor).toEqual(5);
    expect(elevatorSystem.status[1].currentFloor).toEqual(1);
    expect(elevatorSystem.status[2].currentFloor).toEqual(5);

    expect(elevatorSystem.status[0].status).toEqual("IDLE" as ElevatorStatus);
    expect(elevatorSystem.status[2].status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);
    expect(elevatorSystem.status[2].nextStops).toBeNull();

    // Step 7.
    elevatorSystem.doSimulationStep();

    expect(elevatorSystem.status[0].currentFloor).toEqual(5);
    expect(elevatorSystem.status[1].currentFloor).toEqual(0);
    expect(elevatorSystem.status[2].currentFloor).toEqual(5);

    expect(elevatorSystem.status[0].status).toEqual("IDLE" as ElevatorStatus);
    expect(elevatorSystem.status[1].status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);
    expect(elevatorSystem.status[1].nextStops).toBeNull();
    expect(elevatorSystem.status[2].status).toEqual("IDLE" as ElevatorStatus);

    // Step 8.
    elevatorSystem.doSimulationStep();

    expect(elevatorSystem.status[0].currentFloor).toEqual(5);
    expect(elevatorSystem.status[1].currentFloor).toEqual(0);
    expect(elevatorSystem.status[2].currentFloor).toEqual(5);

    expect(elevatorSystem.status[0].status).toEqual("IDLE" as ElevatorStatus);
    expect(elevatorSystem.status[1].status).toEqual("IDLE" as ElevatorStatus);
    expect(elevatorSystem.status[2].status).toEqual("IDLE" as ElevatorStatus);
});