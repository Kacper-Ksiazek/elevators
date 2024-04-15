import { useRequestPickupContext } from "@/hooks/useRequestPickupContext.ts";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";

import type { FunctionComponent } from "react";
import Button from "@/components/atoms/Button.tsx";

import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import { Box } from "@mui/material";
import SmoothConditionalRender from "@/components/atoms/SmoothConditionalRender.tsx";
import { toast } from "react-toastify";

interface RequestPickupActionControlsProps {
    //
}

const RequestPickupActionControls: FunctionComponent<RequestPickupActionControlsProps> = (props) => {
    const { requestParams, updateRequestParams } = useRequestPickupContext();
    const system = useElevatorSystemContext();

    function goButtonOnClick() {
        const { elevatorID, destinationFloor, startFloor } = requestParams;

        // Ensure that all the parameters are set
        if (destinationFloor !== null && elevatorID !== null && startFloor !== null) {
            // Request the elevator to go to the destination floor
            system.requestElevator({
                elevatorID: elevatorID,
                destinationFloor: destinationFloor,
                startingFloor: startFloor
            });

            // Display a success message
            toast.success(
                `Requested ${elevatorID} to go from floor ${startFloor} to floor ${destinationFloor}`,
                {
                    theme: "colored"
                }
            );

            // Reset the request parameters
            updateRequestParams({
                elevatorID: null,
                startFloor: null,
                destinationFloor: null
            });
        }
    }

    return (
        <>
            <Button
                color="success"
                tooltip="Request this ride"
                onClick={goButtonOnClick}
                disabled={requestParams.destinationFloor === null}
            >
                <KeyboardDoubleArrowUpRoundedIcon />
                Go
            </Button>

            <Box
                sx={{
                    flexGrow: 1,
                    background: "red",
                    position: "relative",
                    "&>.smooth-conditional-render-wrapper": {
                        top: "50%",
                        transform: "translateY(-50%)"
                    }
                }}
            >
                <SmoothConditionalRender when={requestParams.elevatorID === null}>
                    <span>Select <strong>an elevator</strong> </span>
                </SmoothConditionalRender>

                <SmoothConditionalRender when={requestParams.elevatorID !== null && requestParams.startFloor === null}>
                    <span>Elevator ID: <strong>{requestParams.elevatorID}</strong>. Pick the starting floor</span>
                </SmoothConditionalRender>

                <SmoothConditionalRender when={requestParams.startFloor !== null && requestParams.destinationFloor === null}>
                    Select the destination floor
                </SmoothConditionalRender>

                <SmoothConditionalRender when={requestParams.destinationFloor !== null}>
                    <span>Requesting elevator <strong>{requestParams.elevatorID}</strong> to go from floor <strong>{requestParams.startFloor}</strong> to floor <strong>{requestParams.destinationFloor}</strong></span>
                </SmoothConditionalRender>
            </Box>
        </>
    );
};

export default RequestPickupActionControls;