import { createContext, type Dispatch } from "react";

export interface RequestedPickupParams {
    /** The elevator ID that the user is requesting a pickup from */
    elevatorID: null | number;

    /** The floor number that the user is requesting a pickup from */
    startFloor: null | number;

    /** The floor number that the user is requesting to go to */
    destinationFloor: null | number;
}

export interface I_RequestPickupContext {
    /** True if the user is requesting a pickup */
    isRequestingPickup: boolean;

    /** Toggle the requesting pickup state */
    toggleRequestingPickup: () => void;

    /** The requested pickup parameters */
    requestParams: RequestedPickupParams;

    /** Update the requested pickup parameters */
    updateRequestParams: Dispatch<Partial<RequestedPickupParams>>;
}

export const requestPickupContext = createContext<I_RequestPickupContext>({
    //
} as I_RequestPickupContext);