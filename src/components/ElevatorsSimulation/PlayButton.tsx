// Tools
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
// Types
import type { FunctionComponent } from "react";
// Components
import Button from "@/components/atoms/Button.tsx";
import SmoothConditionalRender from "@/components/atoms/SmoothConditionalRender.tsx";
// Icons
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const PlayButton: FunctionComponent = () => {
    const {
        simulationCanProceed,
        isSimulationRunning,
        toggleSimulationRunning
    } = useElevatorSystemContext();

    return (
        <Button
            disabled={!simulationCanProceed}
            onClick={toggleSimulationRunning}
            tooltip={isSimulationRunning ? "Pause simulation" : "Play simulation"}
            sx={{ width: "112px" }}
            color={isSimulationRunning ? "error" : "secondary"}
        >
            <SmoothConditionalRender when={!isSimulationRunning}>
                <PlayArrowRoundedIcon />
                Play
            </SmoothConditionalRender>

            <SmoothConditionalRender when={isSimulationRunning}>
                <StopRoundedIcon />
                Pause
            </SmoothConditionalRender>
        </Button>

    );
};

export default PlayButton;