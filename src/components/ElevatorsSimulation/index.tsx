import { FunctionComponent } from "react";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
import Elevator from "@/components/ElevatorsSimulation/Elevator";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { generateMockElevatorRoute } from "./utils";

const ElevatorsSimulation: FunctionComponent = () => {
    const system = useElevatorSystemContext();

    function onMockClick() {
        system.status.forEach((elevator) => {
            generateMockElevatorRoute({
                elevatorID: elevator.elevatorID,
                maxFloor: system.maxFloor,
                requestElevator: system.requestElevator
            });
        });
    }

    function onSimulationStepClick() {
        system.doSimulationStep();
    }

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

            <Box sx={theme => ({
                background: "red",
                height: "64px",
                mt: "16px",
                width: "100%",
                ...theme.mixins.flex_center,
                gap: "8px"

            })}>
                <Button variant="contained"
                        color="secondary"
                        onClick={onMockClick}
                >
                    Mock
                </Button>

                <Button variant="contained"
                        color="secondary"
                        disabled={system.status.every(el => el.status === "IDLE")}
                        onClick={onSimulationStepClick}
                >
                    Make simulation step
                </Button>
            </Box>
        </>
    )
        ;
};

export default ElevatorsSimulation;