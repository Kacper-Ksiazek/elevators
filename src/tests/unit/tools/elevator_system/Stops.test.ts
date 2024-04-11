import { Stops } from "@Elevator/Stops.ts";

test("Insert in ascending order", () => {
    const stops = new Stops();

    [5, 3, 8, 7, 6, 1, 2, 10, 0, 4].forEach(value => {
        stops.insertWithOrder(value, "ASC");
    });

    expect(stops).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 10]);
});

test("Insert in descending order", () => {
    const stops = new Stops();

    [5, 3, 8, 7, 6, 1, 2, 10, 0, 4].forEach(value => {
        stops.insertWithOrder(value, "DESC");
    });

    expect(stops).toEqual([10, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
});
