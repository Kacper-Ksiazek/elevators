import { ElevatorRoute, StopsCollection } from "@Elevator/ElevatorRoute.ts";
import { ElevatorCannotMoveThereError } from "@Elevator/Errors/ElevatorCannotMoveThereError.ts";
import { Elevator } from "@Elevator/Elevator.ts";
import { ElevatorMoveDirection, ElevatorStatus } from "@Elevator/@types.ts";
import {
    ElevatorIsCurrentlyAtThisFloorError
} from "@Elevator/Errors/ElevatorIsCurrentlyAtThisFloorError.ts";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function printRoutes(routes: ElevatorRoute[]) {
    routes.forEach(move => {
        console.log(`Direction: ${move.direction}, Stops: ${move.stops}`);
    });
}

describe("StopsCollection:", () => {
    test("Insert in ascending order", () => {
        const stops = new StopsCollection();

        stops.insertWithOrder(5, "ASC");
        stops.insertWithOrder(3, "ASC");
        stops.insertWithOrder(8, "ASC");
        stops.insertWithOrder(7, "ASC");
        stops.insertWithOrder(6, "ASC");
        stops.insertWithOrder(1, "ASC");
        stops.insertWithOrder(2, "ASC");
        stops.insertWithOrder(10, "ASC");
        stops.insertWithOrder(0, "ASC");
        stops.insertWithOrder(4, "ASC");

        expect(stops).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 10]);
    });

    test("Insert in descending order", () => {
        const stops = new StopsCollection();

        stops.insertWithOrder(5, "DESC");
        stops.insertWithOrder(3, "DESC");
        stops.insertWithOrder(8, "DESC");
        stops.insertWithOrder(7, "DESC");
        stops.insertWithOrder(6, "DESC");
        stops.insertWithOrder(1, "DESC");
        stops.insertWithOrder(2, "DESC");
        stops.insertWithOrder(10, "DESC");
        stops.insertWithOrder(0, "DESC");
        stops.insertWithOrder(4, "DESC");

        expect(stops).toEqual([10, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    });
});

describe("ElevatorMove:", () => {
    test(".canFitInQueue() while moving up", () => {
        const move = new ElevatorRoute(5, "UP");

        // Test floors above
        [6, 10, 20, 30].forEach(floor => {
            expect(move.canFitInQueue(floor)).toBe(true);
        });

        // Test floors below
        [4, 3, 2, 1, 0].forEach(floor => {
            expect(move.canFitInQueue(floor)).toBe(false);
        });
    });

    test(".canFitInQueue() while moving down", () => {
        const move = new ElevatorRoute(5, "DOWN");

        // Test floors above
        [6, 10, 20, 30].forEach(floor => {
            expect(move.canFitInQueue(floor)).toBe(false);
        });

        // Test floors below
        [4, 3, 2, 1, 0].forEach(floor => {
            expect(move.canFitInQueue(floor)).toBe(true);
        });
    });

    test(".addStop() while moving up (only valid floors)", () => {
        const move = new ElevatorRoute(5, "UP");

        move.addStop(10);
        move.addStop(30);
        move.addStop(6);
        move.addStop(20);

        expect(move.stops).toEqual([6, 10, 20, 30]);
    });

    test(".addStop() while moving down (only valid floors)", () => {
        const move = new ElevatorRoute(15, "DOWN");

        move.addStop(11);
        move.addStop(5);
        move.addStop(14);
        move.addStop(1);

        expect(move.stops).toEqual([14, 11, 5, 1]);
    });

    test(".addStop() while moving up (invalid floor) should thrown an error", () => {
        const move = new ElevatorRoute(5, "UP");

        expect(() => move.addStop(4)).toThrow(ElevatorCannotMoveThereError);
    });

    test(".addStop() while moving down (invalid floor) should thrown an error", () => {
        const move = new ElevatorRoute(5, "DOWN");

        expect(() => move.addStop(6)).toThrow(ElevatorCannotMoveThereError);
    });

    test(".addStop() move to the same floor should thrown an error", () => {
        const move = new ElevatorRoute(5, "UP");

        expect(() => move.addStop(5)).toThrow(ElevatorIsCurrentlyAtThisFloorError);
    });

    test(".addStop() move to an already added stop again should not duplicate stops", () => {
        const move = new ElevatorRoute(5, "UP");

        move.addStop(10);
        move.addStop(30);
        move.addStop(30);

        expect(move.stops).toEqual([10, 30]);
    });
});

describe("ElevatorRoute", () => {
    test("4 people going to the different floors entering a elevator at the ground level", () => {
        const elevator = new Elevator();

        elevator.pickupFromCurrentFloor(10);
        elevator.pickupFromCurrentFloor(3);
        elevator.pickupFromCurrentFloor(1);
        elevator.pickupFromCurrentFloor(5);

        expect(elevator.routes).toHaveLength(1);
        expect(elevator.routes[0].stops).toEqual([1, 3, 5, 10]);
    });

    // test("Requesting an elevator from the other floor while being IDLE will create a direct connection to that floor", ()=>{
    //     const elevator = new Elevator();
    //
    //     elevator.pickup(3, 10);
    //
    //     expect(elevator.routes).toHaveLength(1);
    //     expect(elevator.routes[0].stops).toEqual([3]);
    //     expect(elevator.routes[0].direction).toEqual("UP" as ElevatorMoveDirection);
    //
    //     // Besides that
    // })

    test("Different people request an elevator from different floors, but everyone goes up", () => {
        const elevator = new Elevator();

        elevator.pickup(3, 10);
        elevator.pickup(1, 10);
        elevator.pickup(5, 10);
        elevator.pickup(7, 10);
        elevator.pickup(2, 20);

        expect(elevator.routes).toHaveLength(1);
        expect(elevator.routes[0].stops).toEqual([1, 2, 3, 5, 7, 10, 20]);
    });

    test("Different people request an elevator from different floors, but everyone goes down", () => {
        const elevator = new Elevator(21);

        elevator.pickup(10, 3);
        elevator.pickup(10, 1);
        elevator.pickup(10, 5);
        elevator.pickup(10, 7);
        elevator.pickup(20, 2);

        expect(elevator.routes).toHaveLength(1);
        expect(elevator.routes[0].stops).toEqual([20, 10, 7, 5, 3, 2, 1]);

    });


    test("Different people request an elevator from different floors and everyone goes up and down", () => {
        const elevator = new Elevator(0);

        // People going up
        elevator.pickup(3, 10);
        elevator.pickup(1, 21);
        elevator.pickup(5, 7);
        elevator.pickup(7, 10);

        // People going down
        elevator.pickup(10, 3);
        elevator.pickup(20, 2);
        elevator.pickup(6, 0);
        elevator.pickup(8, 0);

        // And up again
        elevator.pickup(7, 15);
        elevator.pickup(5, 10);
        elevator.pickup(20, 30);

        // And down again
        elevator.pickup(10, 5);
        elevator.pickup(3, 0);

        expect(elevator.routes[0].direction).toEqual("UP" as ElevatorMoveDirection);
        expect(elevator.routes[0].stops).toEqual([1, 3, 5, 7, 10, 15, 20, 21, 30]);

        expect(elevator.routes[1].direction).toEqual("DOWN" as ElevatorMoveDirection);
        expect(elevator.routes[1].stops).toEqual([20, 10, 8, 6, 5, 3, 2, 0]);
    });
});

describe("Elevator", () => {
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

        elevator.pickupFromCurrentFloor(3);
        elevator.pickupFromCurrentFloor(5);
        elevator.pickupFromCurrentFloor(10);

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
        expect(elevator.routes[0].stops).toEqual([2, 5]);
        expect(elevator.routes).toHaveLength(1);
        expect(elevator.status).toEqual("MOVING_UP" as ElevatorStatus);
        expect(elevator.currentFloor).toEqual(0);

        elevator.makeSimulationMove(); // floor 1
        elevator.makeSimulationMove(); // floor 2

        expect(elevator.currentFloor).toEqual(2);
        expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);

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
        expect(elevator.routes[0].stops).toEqual([8, 5]);
        expect(elevator.routes).toHaveLength(1);
        expect(elevator.status).toEqual("MOVING_DOWN" as ElevatorStatus);
        expect(elevator.currentFloor).toEqual(10);

        elevator.makeSimulationMove(); // floor 9
        elevator.makeSimulationMove(); // floor 8

        expect(elevator.currentFloor).toEqual(8);
        expect(elevator.status).toEqual("STOPPED_AT_FLOOR" as ElevatorStatus);

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

    test("Request an elevator from floor in opposite direction (UP -> DOWN) ", () => {
        const elevator = new Elevator(0);

        expect(elevator.routes).toHaveLength(0);
        expect(elevator.status).toEqual("IDLE" as ElevatorStatus);

        elevator.pickup(3, 1);

        expect(elevator.routes).toHaveLength(2);

        expect(elevator.routes[0].stops).toEqual([3]);
        expect(elevator.routes[0].direction).toEqual("UP" as ElevatorMoveDirection);

        expect(elevator.routes[1].stops).toEqual([1]);
        expect(elevator.routes[1].direction).toEqual("DOWN" as ElevatorMoveDirection);

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

    test("Request an elevator from the floor in opposite direction (DOWN -> UP)", () => {
        const elevator = new Elevator(10);

        expect(elevator.routes).toHaveLength(0);
        expect(elevator.status).toEqual("IDLE" as ElevatorStatus);

        elevator.pickup(7, 9);

        expect(elevator.routes).toHaveLength(2);
        expect(elevator.routes[0].stops).toEqual([7]);
        expect(elevator.routes[0].direction).toEqual("DOWN" as ElevatorMoveDirection);

        expect(elevator.routes[1].stops).toEqual([9]);
        expect(elevator.routes[1].direction).toEqual("UP" as ElevatorMoveDirection);

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
});