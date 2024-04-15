// Types
import type { FunctionComponent } from "react";
import { useState } from "react";
import type { ElevatorSystemConfigToSave } from "@/components/InitialElevatorSystemConfig/@types.ts";
// Components
import SliderPanel from "./SliderPanel";
import AuthorHeader from "./AuthorHeader.tsx";
import { Box, Button, Fade, Stack, Typography } from "@mui/material";

interface InitialElevatorSystemConfigProps {
    /** Callback to save the configuration */
    saveConfig: (config: ElevatorSystemConfigToSave) => void;
}

const RECOMMENDED_VALUES: Record<"floors" | "elevators", number> = {
    floors: 14,
    elevators: 8
};

const InitialElevatorSystemConfig: FunctionComponent<InitialElevatorSystemConfigProps> = (props) => {
    const [numberOfFloors, setNumberOfFloors] = useState<number>(4);
    const [numberOfElevators, setNumberOfElevators] = useState<number>(3);

    const [hideThisScreen, setHideThisScreen] = useState<boolean>(false);


    function handleSetRecommendedValuesButtonOnClick() {
        setNumberOfFloors(RECOMMENDED_VALUES.floors);
        setNumberOfElevators(RECOMMENDED_VALUES.elevators);
    }

    function handleContinueButtonOnClick() {
        setHideThisScreen(true);

        setTimeout(() => {
            props.saveConfig({ numberOfElevators, numberOfFloors });
        }, 300);
    }

    return (
        <Fade in={!hideThisScreen}>
            <Stack
                sx={{
                    pt: 16
                }}
                spacing={3}
                alignItems="center"
                justifyContent="center"
            >
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
                        recommendedValue={RECOMMENDED_VALUES.floors}
                        setValue={setNumberOfFloors}
                    />

                    <SliderPanel
                        value={numberOfElevators}
                        label="Elevators"
                        recommendedValue={RECOMMENDED_VALUES.elevators}
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
                        disabled={numberOfFloors === RECOMMENDED_VALUES.floors &&
                            numberOfElevators === RECOMMENDED_VALUES.elevators
                        }
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

                <AuthorHeader />
            </Stack>
        </Fade>
    );
};

export default InitialElevatorSystemConfig;
