import { Slider, styled, Typography } from "@mui/material";

import type { FunctionComponent } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledSliderBase = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "8px",
    padding: "16px",

    h3: {
        fontSize: "3rem"
    },

    p: {
        opacity: .7
    },

    ".choice": {
        fontSize: "10rem"
    }
}));

interface StyledSliderProps {
    value: number;
    label: string;
    description: string;
    recommendedValue: number;
    restrictions: { min: number, max: number };

    setValue: (value: number) => void;
}

const SliderPanel: FunctionComponent<StyledSliderProps> = (props) => {
    return (
        <StyledSliderBase>
            <span className="choice">
                <strong>{props.value}</strong>
            </span>

            <Typography variant="h2">
                {props.label}
            </Typography>

            <p>
                {props.description}
            </p>


            <Slider
                min={props.restrictions.min}
                max={props.restrictions.max}
                value={props.value}
                step={1}
                valueLabelDisplay="auto"
                marks={[
                    { value: props.restrictions.min, label: props.restrictions.min.toString() },
                    { value: props.restrictions.max, label: props.restrictions.max.toString() }
                ]}
                onChange={(_, value) => props.setValue(value as number)}
            />

            <p>
                The recommended value is <strong>{props.recommendedValue}</strong>
            </p>

        </StyledSliderBase>

    );
};

export default SliderPanel;