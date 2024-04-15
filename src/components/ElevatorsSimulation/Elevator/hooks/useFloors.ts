import { useMemo } from "react";

export function useFloors(maxFloor: number): number[] {
    return useMemo<number[]>(() => {
        return [
            ...Array.from({ length: maxFloor + 1 }, (_, i) => i)
        ].reverse();
    }, [maxFloor]);
}
