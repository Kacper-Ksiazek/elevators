import { useContext } from "react";
import { elevatorSystemContext } from "@/contexts/elevatorSystemContext";

export function useElevatorSystemContext() {
    return useContext(elevatorSystemContext);
}