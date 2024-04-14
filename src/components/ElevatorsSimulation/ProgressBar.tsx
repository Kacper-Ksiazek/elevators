import { alpha, keyframes, styled } from "@mui/material";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";

import type { FunctionComponent } from "react";

const scaleX = keyframes({
    from: {
        transform: "scaleX(0)"
    },
    to: {
        transform: "scaleX(1)"
    }
});

const ProgressBarBase = styled("div")(({ theme }) => ({
    width: "240px",
    height: "18px",
    border: `1px solid ${alpha("#000", 0.2)}`,
    borderRadius: "3px",

    "&::before": {
        content: "\"\"",
        width: "100%",
        height: "100%",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "3px",
        transformOrigin: "left",
        display: "none"
    },

    "&.running": {
        "&::before": {
            display: "block",
            animation: `${scaleX} .5s infinite linear`
        }
    }

}));

const ProgressBar: FunctionComponent = () => {
    const { simulationRefreshKey, isSimulationRunning } = useElevatorSystemContext();

    return (
        <>
            <ProgressBarBase
                className={isSimulationRunning ? "running" : ""}
            />
            <span style={{width: "96px"}}>Move: <strong>{simulationRefreshKey}</strong></span>
        </>

    );
};

export default ProgressBar;