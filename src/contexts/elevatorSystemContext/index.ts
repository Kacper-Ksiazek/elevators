import { createContext } from "react";
import { ElevatorSystem } from "@Elevator/index.ts";

interface I_ElevatorSystemContext {
    system: ElevatorSystem;
}

export const elevatorSystemContext = createContext<I_ElevatorSystemContext>(
    {} as I_ElevatorSystemContext
);