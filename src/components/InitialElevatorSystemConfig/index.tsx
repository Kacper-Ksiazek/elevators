import type { FunctionComponent } from "react";
import { useState } from "react";

import type { ElevatorSystemConfigToSave } from "@/components/InitialElevatorSystemConfig/@types.ts";

import SliderPanel from "./SliderPanel";
import { Box, Button, Fade, Stack, Typography } from "@mui/material";


interface InitialElevatorSystemConfigProps {
    /** Callback to save the configuration */
    saveConfig: (config: ElevatorSystemConfigToSave) => void;
}

const InitialElevatorSystemConfig: FunctionComponent<InitialElevatorSystemConfigProps> = (props) => {
    const [numberOfFloors, setNumberOfFloors] = useState<number>(4);
    const [numberOfElevators, setNumberOfElevators] = useState<number>(3);

    const [hideThisScreen, setHideThisScreen] = useState<boolean>(false);


    function handleSetRecommendedValuesButtonOnClick() {
        setNumberOfFloors(14);
        setNumberOfElevators(3);
    }

    function handleContinueButtonOnClick() {
        setHideThisScreen(true);

        setTimeout(() => {
            props.saveConfig({ numberOfElevators, numberOfFloors });
        }, 300);
    }

    return (
        <Fade in={!hideThisScreen}>
            <Stack sx={{ pt: 4 }} spacing={3} alignItems="center" justifyContent="center">
                <Typography variant="h2">Adjust the Elevator System</Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "32px"
                    }}
                >
                    <SliderPanel
                        value={numberOfFloors}
                        description="The number of floors in the building. Ground floor is included separately."
                        label="Floors"
                        restrictions={{ min: 4, max: 20 }}
                        recommendedValue={14}
                        setValue={setNumberOfFloors}
                    />

                    <SliderPanel
                        value={numberOfElevators}
                        label="Elevators"
                        recommendedValue={3}
                        description="The number of elevators in the building. Each elevator can access all floors."
                        restrictions={{ min: 1, max: 16 }}
                        setValue={setNumberOfElevators}
                    />
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                        button: {
                            padding: "0 32px"
                        }
                    }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSetRecommendedValuesButtonOnClick}
                        disabled={numberOfFloors === 14 && numberOfElevators === 3}
                    >
                        Set recommended values
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleContinueButtonOnClick}
                    >
                        Continue
                    </Button>
                </Box>
            </Stack>
        </Fade>
    );
};

export default InitialElevatorSystemConfig;
