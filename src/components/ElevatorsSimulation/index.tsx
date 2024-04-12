import { FunctionComponent } from "react";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
import Elevator from "@/components/ElevatorsSimulation/Elevator.tsx";
import Box from "@mui/material/Box";

const ElevatorsSimulation: FunctionComponent = () => {
    const { system } = useElevatorSystemContext();

    return (
        <Box sx={{ display: "flex", gap: "16px" }}>
            {system.status.map((item, index) => {
                return (
                    <Elevator
                        key={item.elevatorID}
                        data={item}
                        maxFloor={system.maxFloor}
                        elevatorOrderNumber={index + 1}
                    />
                );
            })}
        </Box>
    );
};

export default ElevatorsSimulation;