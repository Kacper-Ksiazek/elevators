import { Elevator } from "@Elevator/Elevator.ts";
import { ElevatorRoute } from "@Elevator/ElevatorRoute.ts";

import type { ElevatorMoveDirection, ElevatorStatus } from "@Elevator/@types.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function printRoutes(routes: ElevatorRoute[]) {
    routes.forEach(move => {
        console.log(`Direction: ${move.direction}, Stops: ${move.stops}`);
    });
}

test("By default elevator should be IDLE", () => {
    const elevator = new Elevator();
    expect(elevator.status).toEqual("IDLE");
});

test("Simulate going up with 1 stop (from current floor)", () => {
    const elevator = new Elevator();
    expect(elevator.status).toEqual("IDLE" as ElevatorStatus);

    elevator.pickupFromCurrentFloor(3);

    expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);
    expect(elevator.currentFloor).toEqual(0);

    elevator.makeSimulationMove();
    expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);
    expect(elevator.currentFloor).toEqual(1);

    elevator.makeSimulationMove();
    expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);
    expect(elevator.currentFloor).toEqual(2);

    elevator.makeSimulationMove();
    expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);
    expect(elevator.currentFloor).toEqual(3);

    elevator.makeSimulationMove();
    expect(elevator.status).toEqual("IDLE" as ElevatorStatus);
});

test("Simulate going up with 3 stops (from current floor) ", () => {
    const elevator = new Elevator();

    elevator.pickupFromCurrentFloor([3, 5, 10]);

    expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);

    elevator.makeSimulationMove(); // floor 1
    elevator.makeSimulationMove(); // floor 2
    elevator.makeSimulationMove(); // floor 3

    expect(elevator.currentFloor).toEqual(3);
    expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);

    elevator.makeSimulationMove(); // still at floor 3

    expect(elevator.currentFloor).toEqual(3);
    expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);

    elevator.makeSimulationMove(); // floor 4
    elevator.makeSimulationMove(); // floor 5

    expect(elevator.currentFloor).toEqual(5);
    expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);

    elevator.makeSimulationMove(); // still at floor 5

    expect(elevator.currentFloor).toEqual(5);
    expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);

    elevator.makeSimulationMove(); // floor 6
    elevator.makeSimulationMove(); // floor 7
    elevator.makeSimulationMove(); // floor 8
    elevator.makeSimulationMove(); // floor 9
    elevator.makeSimulationMove(); // floor 10

    expect(elevator.currentFloor).toEqual(10);
    expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);

    elevator.makeSimulationMove(); // still at floor 10

    expect(elevator.currentFloor).toEqual(10);
    expect(elevator.status).toEqual("IDLE" as ElevatorStatus);
});

test("Simulate requesting an elevator from the floor in a current direction ( UP )", () => {
    const elevator = new Elevator(0);

    expect(elevator.routes).toHaveLength(0);
    expect(elevator.status).toEqual("IDLE" as ElevatorStatus);

    elevator.pickup(2, 5);

    expect(elevator.routes[0].stops).toEqual([2]);
    expect(elevator.routes).toHaveLength(1);
    expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);
    expect(elevator.currentFloor).toEqual(0);
    expect(elevator.proxies.getConnectedFloors(2, false)).toEqual([5]);

    elevator.makeSimulationMove(); // floor 1
    elevator.makeSimulationMove(); // floor 2

    expect(elevator.currentFloor).toEqual(2);
    expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);
    expect(elevator.proxies.getConnectedFloors(2)).toEqual([]);
    expect(elevator.routes[0].stops).toEqual([5]);
    expect(elevator.routes).toHaveLength(1);

    elevator.makeSimulationMove(); // unpause, still at floor 2
    expect(elevator.currentFloor).toEqual(2);

    elevator.makeSimulationMove(); // floor 3
    elevator.makeSimulationMove(); // floor 4
    elevator.makeSimulationMove(); // floor 5

    expect(elevator.currentFloor).toEqual(5);
    expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);

    elevator.makeSimulationMove(); // still at floor 5
    expect(elevator.currentFloor).toEqual(5);
    expect(elevator.status).toEqual("IDLE" as ElevatorStatus);
});

test("Simulate requesting an elevator from the floor in a current direction ( DOWN )", () => {
    const elevator = new Elevator(10);

    expect(elevator.routes).toHaveLength(0);
    expect(elevator.status).toEqual("IDLE" as ElevatorStatus);

    elevator.pickup(8, 5);

    expect(elevator.routes[0].stops).toEqual([8]);
    expect(elevator.routes).toHaveLength(1);
    expect(elevator.status).toEqual("MOVING_DOWN" as ElevatorStatus);
    expect(elevator.currentFloor).toEqual(10);
    expect(elevator.proxies.getConnectedFloors(8, false)).toEqual([5]);

    elevator.makeSimulationMove(); // floor 9
    elevator.makeSimulationMove(); // floor 8

    expect(elevator.currentFloor).toEqual(8);
    expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);
    expect(elevator.proxies.getConnectedFloors(8)).toEqual([]);
    expect(elevator.routes[0].stops).toEqual([5]);

    elevator.makeSimulationMove(); // unpause, still at floor 8
    expect(elevator.currentFloor).toEqual(8);
    expect(elevator.status).toEqual("MOVING_DOWN" as ElevatorStatus);

    elevator.makeSimulationMove(); // floor 7
    elevator.makeSimulationMove(); // floor 6
    elevator.makeSimulationMove(); // floor 5

    expect(elevator.currentFloor).toEqual(5);
    expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);

    elevator.makeSimulationMove(); // still at floor 5
    expect(elevator.currentFloor).toEqual(5);
    expect(elevator.status).toEqual("IDLE" as ElevatorStatus);
});


describe("Request an elevator from the floor in opposite direction", () => {
    test("Go UP, pick up people and return DOWN ( DOWN -> UP -> DOWN )", () => {
        const elevator = new Elevator(0);

        expect(elevator.routes).toHaveLength(0);
        expect(elevator.status).toEqual("IDLE" as ElevatorStatus);

        elevator.pickup(3, 1);

        expect(elevator.routes).toHaveLength(1);

        expect(elevator.routes[0].stops).toEqual([3]);
        expect(elevator.routes[0].direction).toEqual("UP" as ElevatorMoveDirection);
        expect(elevator.proxies.getConnectedFloors(3, false)).toEqual([1]);

        expect(elevator.currentFloor).toEqual(0);
        expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);

        elevator.makeSimulationMove(); // floor 1
        elevator.makeSimulationMove(); // floor 2
        elevator.makeSimulationMove(); // floor 3

        expect(elevator.currentFloor).toEqual(3);
        expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);
        expect(elevator.routes).toHaveLength(1);

        elevator.makeSimulationMove(); // still at floor 3

        expect(elevator.currentFloor).toEqual(3);
        expect(elevator.status).toEqual("MOVING_DOWN" as ElevatorStatus);

        elevator.makeSimulationMove(); // floor 2
        elevator.makeSimulationMove(); // floor 1

        expect(elevator.currentFloor).toEqual(1);
        expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);

        elevator.makeSimulationMove(); // still at floor 1
        expect(elevator.currentFloor).toEqual(1);
        expect(elevator.status).toEqual("IDLE" as ElevatorStatus);
    });

    test("Go DOWN, pick up people and return UP ( UP -> DOWN -> UP )", () => {
        const elevator = new Elevator(10);

        expect(elevator.routes).toHaveLength(0);
        expect(elevator.status).toEqual("IDLE" as ElevatorStatus);

        elevator.pickup(7, 9);

        expect(elevator.routes).toHaveLength(1);
        expect(elevator.routes[0].stops).toEqual([7]);
        expect(elevator.routes[0].direction).toEqual("DOWN" as ElevatorMoveDirection);
        expect(elevator.proxies.getConnectedFloors(7, false)).toEqual([9]);

        expect(elevator.currentFloor).toEqual(10);
        expect(elevator.status).toEqual("MOVING_DOWN" as ElevatorStatus);

        elevator.makeSimulationMove(); // floor 9
        elevator.makeSimulationMove(); // floor 8
        elevator.makeSimulationMove(); // floor 7

        expect(elevator.currentFloor).toEqual(7);
        expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);
        expect(elevator.routes).toHaveLength(1);

        elevator.makeSimulationMove(); // still at floor 7
        expect(elevator.currentFloor).toEqual(7);
        expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);

        elevator.makeSimulationMove(); // floor 8
        elevator.makeSimulationMove(); // floor 9

        expect(elevator.currentFloor).toEqual(9);
        expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);

        elevator.makeSimulationMove(); // still at floor 9
        expect(elevator.currentFloor).toEqual(9);
        expect(elevator.status).toEqual("IDLE" as ElevatorStatus);
    });

    test("Start at 7 and go down to 5 and then go up to 10 through 6", () => {
        const elevator = new Elevator(7);

        elevator.pickup(5, 10);
        elevator.pickup(6, 10);

        expect(elevator.routes).toHaveLength(2);
        expect(elevator.routes[0].stops).toEqual([5]);
        expect(elevator.routes[0].direction).toEqual("DOWN");

        expect(elevator.routes[1].stops).toEqual([6]);
        expect(elevator.routes[1].direction).toEqual("UP");

        expect(elevator.proxies.getConnectedFloors(5, false)).toEqual([10]);
        expect(elevator.proxies.getConnectedFloors(6, false)).toEqual([10]);

        elevator.makeSimulationMove(); // floor 6
        elevator.makeSimulationMove(); // floor 5

        expect(elevator.currentFloor).toEqual(5);
        expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);
        expect(elevator.proxies.getConnectedFloors(5)).toEqual([]);

        expect(elevator.routes[0].stops).toEqual([6, 10]);


    });

    test("( 6 -> 10 ) and ( 5 -> 8 )", () => {
        const elevator = new Elevator(7);

        elevator.pickup(6, 10);
        elevator.pickup(5, 8);

        // printRoutes(elevator.routes);

        expect(elevator.currentFloor).toEqual(7);
        expect(elevator.status).toEqual("MOVING_DOWN" as ElevatorStatus);

        elevator.makeSimulationMove(); // floor 6, pause

        expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);
        expect(elevator.currentFloor).toEqual(6);

        elevator.makeSimulationMove(); // floor 6, unpause

        expect(elevator.currentFloor).toEqual(6);
        expect(elevator.status).toEqual("MOVING_DOWN");

        elevator.makeSimulationMove(); // floor 5, pause

        expect(elevator.currentFloor).toEqual(5);
        expect(elevator.status).toEqual("STOPPED_AT_FLOOR");

        elevator.makeSimulationMove(); // floor 5, unpause

        expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);
        expect(elevator.currentFloor).toEqual(5);

        elevator.makeSimulationMove(); // floor 6
        elevator.makeSimulationMove(); // floor 7
        elevator.makeSimulationMove(); // floor 8, pause

        expect(elevator.currentFloor).toEqual(8);
        expect(elevator.status).toEqual("STOPPED_AT_FLOOR");

        elevator.makeSimulationMove(); // floor 8, unpause

        expect(elevator.currentFloor).toEqual(8);
        expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);

        elevator.makeSimulationMove(); // floor 9
        elevator.makeSimulationMove(); // floor 10, pause

        expect(elevator.currentFloor).toEqual(10);
        expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);

        elevator.makeSimulationMove(); // floor 10, unpause

        expect(elevator.currentFloor).toEqual(10);
        expect(elevator.status).toEqual("IDLE" as ElevatorStatus);
    });

    test("Request picking up while already going up", () => {
        const elevator = new Elevator(0);

        elevator.pickupFromCurrentFloor(10);

        expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);

        elevator.makeSimulationMove();
        elevator.makeSimulationMove();
        elevator.makeSimulationMove();
        elevator.makeSimulationMove();

        expect(elevator.currentFloor).toEqual(4);
        expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);

        expect(elevator.routes[0].stops).toEqual([10]);

        elevator.pickup(5, 7);

        expect(elevator.routes[0].stops).toEqual([5, 10]);
        expect(elevator.proxies.getConnectedFloors(5, false)).toEqual([7]);
    });

    test("Request picking up while already going down", () => {
        const elevator = new Elevator(10);
        elevator.pickupFromCurrentFloor(0);

        expect(elevator.status).toEqual("MOVING_DOWN" as ElevatorStatus);

        elevator.makeSimulationMove();
        elevator.makeSimulationMove();
        elevator.makeSimulationMove();
        elevator.makeSimulationMove();

        expect(elevator.currentFloor).toEqual(6);

        expect(elevator.routes[0].stops).toEqual([0]);
        elevator.pickup(5, 3);
        expect(elevator.routes[0].stops).toEqual([5, 0]);
        expect(elevator.proxies.getConnectedFloors(5, false)).toEqual([3]);
    });

    test("Request pickupFromCurrentFloor heading up when the elevator is in move", () => {
        const elevator = new Elevator(5);
        elevator.pickupFromCurrentFloor(10);

        expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);

        elevator.makeSimulationMove();
        elevator.makeSimulationMove();
        elevator.makeSimulationMove();

        expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);
        expect(elevator.currentFloor).toEqual(8);
        expect(elevator.routes[0].stops).toEqual([10]);

        elevator.pickupFromCurrentFloor(20);

        expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);
        expect(elevator.currentFloor).toEqual(8);
        expect(elevator.routes[0].stops).toEqual([10, 20]);

        elevator.makeSimulationMove();

        expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);
        expect(elevator.currentFloor).toEqual(8);
        elevator.makeSimulationMove();

        expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);
        expect(elevator.currentFloor).toEqual(9);
    });

    test("Request pickup from floor 3 to 8 while the elevator is currently at 4 and goes to 7", () => {
        const elevator = new Elevator(4);
        elevator.pickupFromCurrentFloor(7);

        expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);
        expect(elevator.currentFloor).toEqual(4);
        expect(elevator.routes[0].stops).toEqual([7]);

        elevator.makeSimulationMove(); // floor 5

        expect(elevator.currentFloor).toEqual(5);

        elevator.pickup(3, 8);

        // printRoutes(elevator.routes);
    });
});

