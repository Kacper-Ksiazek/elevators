import { FunctionComponent } from "react";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
import Elevator from "@/components/ElevatorsSimulation/Elevator";
import Box from "@mui/material/Box";

const ElevatorsSimulation: FunctionComponent = () => {
    const { system } = useElevatorSystemContext();

    return (
        <>
            <Box sx={{
                display: "flex",
                gap: "16px",
                height: "calc(100vh - 96px)",
                width: "100%",
                justifyContent: "center"
            }}>
                {system.status.map((item, index) => {
                    return (
                        <Elevator
                            key={item.elevatorID}
                            data={item}
                            elevatorOrderNumber={index + 1}
                        />
                    );
                })}

            </Box>
            <Box sx={{ background: "red", height: "64px", mt: "16px", width: "100%" }}>
                button
            </Box>
        </>
    )
        ;
};

export default ElevatorsSimulation;