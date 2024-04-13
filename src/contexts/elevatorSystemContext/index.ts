import { createContext } from "react";
import { ElevatorSystem } from "@Elevator/index.ts";

interface I_ElevatorSystemContext extends Pick<ElevatorSystem, "maxFloor" | "elevatorsAmount" | "status" | "doSimulationStep" | "requestElevator"> {
}

export const elevatorSystemContext = createContext<I_ElevatorSystemContext>(
    {} as I_ElevatorSystemContext
);