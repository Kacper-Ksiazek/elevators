// Tools and hooks
import { useRequestPickupContext } from "@/hooks/useRequestPickupContext.ts";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
// Types
import type { FunctionComponent } from "react";
// Components
import ElevatorsList from "./ElevatorsList.tsx";
import Button from "@/components/atoms/Button.tsx";
import FullscreenButton from "./FullscreenButton.tsx";
import RequestPickupButton from "./RequestPickupButton.tsx";
import { AllButtonsWrapper, DynamicControlsWrapper } from "./_styled_components.tsx";
import SmoothConditionalRender from "@/components/atoms/SmoothConditionalRender.tsx";
import SimulationActionControls from "@/components/ElevatorsSimulation/SimulationActionControls";
import RequestPickupActionControls from "@/components/ElevatorsSimulation/RequestPickupActionControls";
// Icons
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";

interface ElevatorsSimulationProps {
    /** The function to reset the Elevator System */
    reset: () => void;
}


const ElevatorsSimulation: FunctionComponent<ElevatorsSimulationProps> = (props) => {
    const system = useElevatorSystemContext();
    const { isRequestingPickup } = useRequestPickupContext();

    function goBack() {
        props.reset();
    }

    return (
        <>
            <ElevatorsList />

            <AllButtonsWrapper>
                {/* Button to return to the system config menu */}
                <Button
                    tooltip="Return to the system config menu"
                    onClick={goBack}
                    color="error"
                    disabled={system.isSimulationRunning}
                >
                    <NavigateBeforeRoundedIcon />
                    Go back
                </Button>

                <span style={{ flexGrow: 1 }} />

                {/* Button responsible for requesting a pickup */}
                <RequestPickupButton />

                {/* Wrapper for dynamic controls */}
                <DynamicControlsWrapper>

                    {/* If the user is not requesting a pickup, show the simulation controls */}
                    <SmoothConditionalRender when={!isRequestingPickup}>
                        <SimulationActionControls />
                    </SmoothConditionalRender>

                    {/* If the user is requesting a pickup, show the pickup controls */}
                    <SmoothConditionalRender when={isRequestingPickup}>
                        <RequestPickupActionControls />
                    </SmoothConditionalRender>

                </DynamicControlsWrapper>

                <span style={{ flexGrow: 1 }} />

                <FullscreenButton />
            </AllButtonsWrapper>
        </>
    );
};

export default ElevatorsSimulation;