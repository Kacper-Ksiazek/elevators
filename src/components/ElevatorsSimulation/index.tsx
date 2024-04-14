// Tools and hooks
import { toast } from "react-toastify";
import { generateMockElevatorRoute } from "./utils";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
// Types
import type { FunctionComponent } from "react";
// Components
import Box from "@mui/material/Box";
import Button from "@/components/atoms/Button.tsx";
import FullscreenButton from "./FullscreenButton.tsx";
import Elevator from "@/components/ElevatorsSimulation/Elevator";
// Icons
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import ElevatorRoundedIcon from "@mui/icons-material/ElevatorRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";

interface ElevatorsSimulationProps {
    /** The function to reset the Elevator System */
    reset: () => void;
}


const ElevatorsSimulation: FunctionComponent<ElevatorsSimulationProps> = (props) => {
    const system = useElevatorSystemContext();

    function onMockClick() {
        let numberOfRoutesGeneratedPerElevator: number | null = null;

        system.status.forEach((elevator) => {
            numberOfRoutesGeneratedPerElevator = generateMockElevatorRoute({
                elevatorID: elevator.elevatorID,
                maxFloor: system.maxFloor,
                requestElevator: system.requestElevator
            });
        });

        const msgPrefix: string = numberOfRoutesGeneratedPerElevator === 1 ?
            "1 route has been" :
            `${numberOfRoutesGeneratedPerElevator} routes have been`;

        toast(`${msgPrefix} generated for each elevator`, {
            type: "success",
            theme: "colored"
        });
    }

    function onSimulationStepClick() {
        system.doSimulationStep();
    }

    function goBack() {
        props.reset();
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    gap: "16px",
                    height: "calc(100vh - 96px)",
                    width: "100%",
                    justifyContent: "center"
                }}
            >
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

            <Box
                sx={theme => ({
                    background: theme.palette.background.default,
                    height: "64px",
                    mt: "16px",
                    width: "100%",
                    ...theme.mixins.flex_center,
                    gap: "8px",
                    padding: "0 16px"
                })}
            >
                <Button
                    tooltip="Return to the system config menu"
                    onClick={goBack}
                    color="error"
                >
                    <NavigateBeforeRoundedIcon />
                    Go back
                </Button>

                <span style={{ flexGrow: 1 }} />

                <Button
                    onClick={onMockClick}
                    tooltip="Request an elevator ride"
                >
                    <ElevatorRoundedIcon />
                    Pickup
                </Button>

                <Button
                    onClick={onMockClick}
                    tooltip="Generate a few random routes for each elevator"
                >
                    <ShuffleRoundedIcon />
                    Generate
                </Button>

                <Button
                    disabled={!system.simulationCanProceed}
                    onClick={onSimulationStepClick}
                    tooltip="Make a simulation step"
                >
                    <NavigateNextRoundedIcon />
                    Make simulation step
                </Button>

                <Button
                    disabled={!system.simulationCanProceed}
                    onClick={onSimulationStepClick}
                    tooltip="Play the simulation"
                >
                    <PlayArrowRoundedIcon />
                    Play
                </Button>

                <Box
                    sx={{
                        width: "300px",
                        height: "6px",
                        background: "black"
                    }}
                />

                <span style={{ flexGrow: 1 }} />

                <FullscreenButton />
            </Box>
        </>
    );
};

export default ElevatorsSimulation;