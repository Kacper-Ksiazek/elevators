import { elevatorSystemContext } from ".";
import { ElevatorSystem } from "@Elevator/index.ts";
import type { FunctionComponent, ReactNode } from "react";

interface ElevatorSystemContextProviderProps {
    numberOfFloors: number;
    numberOfElevators: number;

    children: ReactNode;
}

const ElevatorSystemContextProvider: FunctionComponent<ElevatorSystemContextProviderProps> = (props) => {
    return (
        <elevatorSystemContext.Provider value={{
            system: new ElevatorSystem({
                elevatorsAmount: props.numberOfElevators,
                maxFloor: props.numberOfFloors
            })
        }}>
            {props.children}
        </elevatorSystemContext.Provider>
    );
};

export default ElevatorSystemContextProvider;