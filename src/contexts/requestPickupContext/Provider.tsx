import { type RequestedPickupParams, requestPickupContext } from "./index.ts";
import { type FunctionComponent, type PropsWithChildren, useState } from "react";
import { useSimpleReducer } from "@/hooks/useSimpleReducer.ts";

interface RequestPickupContextProps extends PropsWithChildren {
    //
}

const RequestPickupContext: FunctionComponent<RequestPickupContextProps> = (props) => {
    const [isRequestingPickup, setIsRequestingPickup] = useState<boolean>(false);

    const [state, updateState] = useSimpleReducer<RequestedPickupParams>({
        elevatorID: null,
        startFloor: null,
        destinationFloor: null
    });


    function toggleRequestingPickup() {
        setIsRequestingPickup((currentVal) => {
            // If the value changes from true to false, reset the request parameters
            if (currentVal) {
                updateState({
                    elevatorID: null,
                    startFloor: null,
                    destinationFloor: null
                });
            }
            return !currentVal;
        });
    }


    return (
        <requestPickupContext.Provider
            value={{
                isRequestingPickup,
                requestParams: state,
                toggleRequestingPickup,
                updateRequestParams: updateState
            }}
        >
            {props.children}
        </requestPickupContext.Provider>
    );
};


export default RequestPickupContext;