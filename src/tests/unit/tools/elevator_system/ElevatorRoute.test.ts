import { Elevator } from "@Elevator/Elevator.ts";
import { ElevatorRoute } from "@Elevator/ElevatorRoute.ts";

import type { ElevatorMoveDirection } from "@Elevator/@types.ts";

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
