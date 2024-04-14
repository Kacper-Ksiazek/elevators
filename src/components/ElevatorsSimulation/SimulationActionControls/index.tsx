// Types
import type { FunctionComponent } from "react";
// Components
import PlayButton from "./PlayButton";
import ProgressBar from "./ProgressBar";
import GenerateRoutesButton from "./GenerateRoutesButton";
import MakeSimulationStepButton from "./MakeSimulationStepButton";


const SimulationActionControls: FunctionComponent = () => {
    return (
        <>
            <GenerateRoutesButton />
            <MakeSimulationStepButton />
            <PlayButton />
            <ProgressBar />
        </>
    );
};

export default SimulationActionControls;