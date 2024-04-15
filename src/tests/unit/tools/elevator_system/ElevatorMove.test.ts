import { ElevatorRoute } from "@Elevator/ElevatorRoute.ts";
import { ElevatorCannotMoveThereError ,ElevatorIsCurrentlyAtThisFloorError} from "@Elevator/Errors";

test(".canFitInQueue() while moving up", () => {
    const move = new ElevatorRoute(5, "UP");

    // Test floors above
    [6, 10, 20, 30].forEach(floor => {
        expect(move.canFit(floor)).toBe(true);
    });

    // Test floors below
    [4, 3, 2, 1, 0].forEach(floor => {
        expect(move.canFit(floor)).toBe(false);
    });
});

test(".canFitInQueue() while moving down", () => {
    const move = new ElevatorRoute(5, "DOWN");

    // Test floors above
    [6, 10, 20, 30].forEach(floor => {
        expect(move.canFit(floor)).toBe(false);
    });

    // Test floors below
    [4, 3, 2, 1, 0].forEach(floor => {
        expect(move.canFit(floor)).toBe(true);
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
