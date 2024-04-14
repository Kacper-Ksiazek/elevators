import { useContext } from "react";
import { requestPickupContext } from "@/contexts/requestPickupContext";

export function useRequestPickupContext() {
    return useContext(requestPickupContext);
}