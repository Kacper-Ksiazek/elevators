import { FunctionComponent, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import SliderPanel from "./SliderPanel";

interface InitialElevatorSystemConfigProps {
    //
}

const InitialElevatorSystemConfig: FunctionComponent<InitialElevatorSystemConfigProps> = () => {
    const [numberOfFloors, setNumberOfFloors] = useState<number>(4);
    const [numberOfElevators, setNumberOfElevators] = useState<number>(3);

    return (
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
                <Button variant="contained" color="secondary">Set recommended values</Button>

                <Button variant="contained">Continue</Button>
            </Box>
        </Stack>
    );
};

export default InitialElevatorSystemConfig;
