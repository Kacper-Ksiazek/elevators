// Tools and hooks
import { toast } from "react-toastify";
import { generateMockElevatorRoute } from "./utils";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
// Types
import type { FunctionComponent } from "react";
// Components
import Button from "@/components/atoms/Button.tsx";
// Icons
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";


const GenerateRoutesButton: FunctionComponent = () => {
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

    return (
        <Button
            onClick={onMockClick}
            tooltip="Generate a few random routes for each elevator"
            disabled={system.isSimulationRunning}
        >
            <ShuffleRoundedIcon />
            Generate
        </Button>

    );
};

export default GenerateRoutesButton;