export class Stops extends Array<number> {
    get asArray(): number[] {
        return new Array(...this);
    }

    public insertWithOrder(value: number, order: "ASC" | "DESC"): void {
        if (order === "ASC") {
            this.insertInAscendingOrder(value);
        } else {
            this.insertInDescendingOrder(value);
        }
    }

    private insertInAscendingOrder(value: number): void {
        let index: number = 0;
        while (this[index] < value) {
            index++;
        }
        this.splice(index, 0, value);
    }

    private insertInDescendingOrder(value: number): void {
        let index: number = 0;
        while (this[index] > value) {
            index++;
        }
        this.splice(index, 0, value);
    }
}
