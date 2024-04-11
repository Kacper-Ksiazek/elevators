import {Stops} from "../../../../tools/elevator_system/Stops.ts";

// function assertArraysEqual<T>(a: T[], b: T[]): void {
//     expect(a.length).toEqual(b.length);
//
//     a.forEach((value, index) => {
//         expect(b[index]).toEqual(value);
//     })
// }

describe(".addStop", () => {
    test("**up** current direction", () => {
        const stops = new Stops("UP");

        stops.addStop(5, "CURRENT_DIRECTION");
        stops.addStop(3, "OPPOSITE_DIRECTION");
        stops.addStop(8, "CURRENT_DIRECTION");
        stops.addStop(7, "CURRENT_DIRECTION");
        stops.addStop(6, "CURRENT_DIRECTION");
        stops.addStop(1, "OPPOSITE_DIRECTION");
        stops.addStop(2, "OPPOSITE_DIRECTION");
        stops.addStop(10, "CURRENT_DIRECTION");
        stops.addStop(0, "OPPOSITE_DIRECTION")
        stops.addStop(4, "CURRENT_DIRECTION")

        expect(stops.asArray).toEqual([4, 5, 6, 7, 8, 10, 3, 2, 1, 0]);
    })

    test("**down** current direction", () => {
        const stops = new Stops("DOWN");

        stops.addStop(15, "CURRENT_DIRECTION");
        stops.addStop(13, "CURRENT_DIRECTION");
        stops.addStop(18, "CURRENT_DIRECTION");
        stops.addStop(5, "OPPOSITE_DIRECTION")
        stops.addStop(17, "CURRENT_DIRECTION");
        stops.addStop(10, "CURRENT_DIRECTION");
        stops.addStop(11, "CURRENT_DIRECTION");
        stops.addStop(0, "OPPOSITE_DIRECTION");
        stops.addStop(20, "CURRENT_DIRECTION");
        stops.addStop(4, "OPPOSITE_DIRECTION");

        console.log(stops.asArray);

        expect(stops.asArray).toEqual([20, 18, 17, 15, 13, 11, 10, 5, 4, 0]);
    })
});