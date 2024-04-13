export function getFloorName(_floor: number): string {
    if (_floor === 0) return "GROUND";
    const floor: string = String(_floor);

    if (floor[floor.length - 1] === "1" && _floor !== 11) return `${floor}st`;
    if (floor[floor.length - 1] === "2" && _floor !== 12) return `${floor}nd`;
    if (floor[floor.length - 1] === "3" && _floor !== 13) return `${floor}rd`;

    return `${floor}th`;
}
