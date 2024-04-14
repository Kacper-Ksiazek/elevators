import { createContext, type Dispatch, type SetStateAction } from "react";
import { ElevatorSystem } from "@Elevator/index.ts";

interface I_ElevatorSystemContext extends Pick<ElevatorSystem, "maxFloor"
    | "elevatorsAmount"
    | "status"
    | "doSimulationStep"
    | "requestElevator"
    | "simulationCanProceed"
> {
    /** If the simulation is running automatically */
    isSimulationRunning: boolean;

    /** Toggles the simulation running state */
    toggleSimulationRunning: () => void;

    /** Refresh key for the simulation */
    simulationRefreshKey: number;
}

export const elevatorSystemContext = createContext<I_ElevatorSystemContext>(
    {} as I_ElevatorSystemContext
);