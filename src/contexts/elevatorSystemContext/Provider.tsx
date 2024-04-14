import { elevatorSystemContext } from ".";
import { ElevatorSystem } from "@Elevator/index.ts";
import { FunctionComponent, ReactNode, useCallback, useRef, useState } from "react";
import { ElevatorSystemConfigToSave } from "@/components/InitialElevatorSystemConfig/@types.ts";
import type { ElevatorRequest } from "@Elevator/@types.ts";

interface ElevatorSystemContextProviderProps {
    config: ElevatorSystemConfigToSave;

    children: ReactNode;
}

const ElevatorSystemContextProvider: FunctionComponent<ElevatorSystemContextProviderProps> = (props) => {
    const system = useRef<ElevatorSystem>(new ElevatorSystem({
        elevatorsAmount: props.config.numberOfElevators,
        maxFloor: props.config.numberOfFloors
    }));

    const [status, setStatus] = useState<ElevatorSystem["status"]>(
        system.current.status
    );

    const doSimulationStep = useCallback(() => {
        system.current.doSimulationStep();
        setStatus([...system.current.status]);
    }, []);

    const requestElevator = useCallback((request: ElevatorRequest) => {
        system.current.requestElevator(request);
        setStatus([...system.current.status]);
    }, []);

    return (
        <elevatorSystemContext.Provider
            value={{
                maxFloor: system.current.maxFloor,
                elevatorsAmount: system.current.elevatorsAmount,
                simulationCanProceed: system.current.simulationCanProceed,
                status,
                doSimulationStep,
                requestElevator
            }}
        >
            {props.children}
        </elevatorSystemContext.Provider>
    );
};

export default ElevatorSystemContextProvider;