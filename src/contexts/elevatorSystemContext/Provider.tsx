import { elevatorSystemContext } from ".";
import { ElevatorSystem } from "@Elevator/index.ts";
import type { FunctionComponent, ReactNode } from "react";
import { ElevatorSystemConfigToSave } from "@/components/InitialElevatorSystemConfig/@types.ts";

interface ElevatorSystemContextProviderProps {
    config: ElevatorSystemConfigToSave;

    children: ReactNode;
}

const ElevatorSystemContextProvider: FunctionComponent<ElevatorSystemContextProviderProps> = (props) => {
    return (
        <elevatorSystemContext.Provider value={{
            system: new ElevatorSystem({
                elevatorsAmount: props.config.numberOfElevators,
                maxFloor: props.config.numberOfFloors
            })
        }}>
            {props.children}
        </elevatorSystemContext.Provider>
    );
};

export default ElevatorSystemContextProvider;