// Tools and hooks
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
// Types
import type { FunctionComponent } from "react";
// Components
import Button from "@/components/atoms/Button.tsx";

// Icons
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";

const MakeSimulationStep: FunctionComponent = () => {
    const system = useElevatorSystemContext();

    function onSimulationStepClick() {
        system.doSimulationStep();
    }
    return (
        <Button
            disabled={!system.simulationCanProceed || system.isSimulationRunning}
            onClick={onSimulationStepClick}
            tooltip="Make a simulation step"
        >
            <NavigateNextRoundedIcon />
            Make simulation step
        </Button>

    );
};

export default MakeSimulationStep;