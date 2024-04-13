import "./App.css";
import { useState } from "react";

import type { ElevatorSystemConfigToSave } from "@/components/InitialElevatorSystemConfig/@types.ts";

import ElevatorsSimulation from "@/components/ElevatorsSimulation";
import InitialElevatorSystemConfig from "@/components/InitialElevatorSystemConfig";
import ElevatorSystemContextProvider from "@/contexts/elevatorSystemContext/Provider.tsx";
import Fade from "@mui/material/Fade";

function App() {
    const [config, setConfig] = useState<ElevatorSystemConfigToSave | null>(null);

    function handleSaveConfig(_config: ElevatorSystemConfigToSave) {
        setConfig(_config);
    }

    if (config === null) return (
        <main>
            <InitialElevatorSystemConfig saveConfig={handleSaveConfig} />
        </main>
    );

    return (
        <Fade in={true}>
            <main>
                <ElevatorSystemContextProvider config={config}>
                    <ElevatorsSimulation />
                </ElevatorSystemContextProvider>
            </main>
        </Fade>
    );
}

export default App;
