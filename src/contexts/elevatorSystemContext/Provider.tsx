import { elevatorSystemContext } from ".";
import { ElevatorSystem } from "@Elevator/index.ts";
import React, { FunctionComponent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { ElevatorSystemConfigToSave } from "@/components/InitialElevatorSystemConfig/@types.ts";
import type { ElevatorRequest } from "@Elevator/@types.ts";
import { toast } from "react-toastify";

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

    const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(false);

    const [simulationRefreshKey, setSimulationRefreshKey] = useState<number>(1);

    const doSimulationStep = useCallback(() => {
        system.current.doSimulationStep();
        setStatus([...system.current.status]);
    }, []);

    const requestElevator = useCallback((request: ElevatorRequest) => {
        system.current.requestElevator(request);
        setStatus([...system.current.status]);
    }, []);

    function toggleSimulationRunning() {
        setIsSimulationRunning(val => !val);
    }

    // Auto-pause simulation loop when it can't proceed
    useEffect(() => {
        if (!system.current.simulationCanProceed) {
            setIsSimulationRunning(false);

            toast.success("Simulation is done!", {
                theme: "colored"
            });

        }
    }, [system.current.simulationCanProceed]);

    // Simulation loop
    useEffect(() => {
        if (isSimulationRunning) {
            doSimulationStep();
            setSimulationRefreshKey(1);

            const interval = setInterval(() => {
                doSimulationStep();
                setSimulationRefreshKey(prev => prev + 1);
            }, 500);

            return () => clearInterval(interval);
        }
    }, [doSimulationStep, isSimulationRunning]);

    return (
        <elevatorSystemContext.Provider
            value={{
                maxFloor: system.current.maxFloor,
                elevatorsAmount: system.current.elevatorsAmount,
                simulationCanProceed: system.current.simulationCanProceed,
                status,
                isSimulationRunning,
                doSimulationStep,
                requestElevator,
                simulationRefreshKey,
                toggleSimulationRunning
            }}
        >
            {props.children}
        </elevatorSystemContext.Provider>
    );
};

export default ElevatorSystemContextProvider;