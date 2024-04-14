// Tools and hooks
import { useRequestPickupContext } from "@/hooks/useRequestPickupContext.ts";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
// Types
import type { FunctionComponent } from "react";
// Components
import Button from "@/components/atoms/Button.tsx";
import SmoothConditionalRender from "@/components/atoms/SmoothConditionalRender.tsx";
// Icons
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import ElevatorRoundedIcon from "@mui/icons-material/ElevatorRounded";


const RequestPickupButton: FunctionComponent = () => {
    const { isSimulationRunning } = useElevatorSystemContext();
    const { toggleRequestingPickup, isRequestingPickup } = useRequestPickupContext();

    return (
        <Button
            onClick={toggleRequestingPickup}
            tooltip="Request an elevator ride"
            disabled={isSimulationRunning}
            color={isRequestingPickup ? "error" : "secondary"}
            sx={{
                width: "120px",
                position: "relative"
            }}
        >
            <SmoothConditionalRender when={!isRequestingPickup}>
                <ElevatorRoundedIcon />
                Pickup
            </SmoothConditionalRender>

            <SmoothConditionalRender when={isRequestingPickup}>
                <ClearRoundedIcon />
                Cancel
            </SmoothConditionalRender>
        </Button>
    );
};

export default RequestPickupButton;