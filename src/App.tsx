// Styles
import "./App.css";
// Tools and hooks
import { useState } from "react";
// Types
import type { ElevatorSystemConfigToSave } from "@/components/InitialElevatorSystemConfig/@types.ts";
// MUI Components
import Fade from "@mui/material/Fade";
// Components
import ElevatorsSimulation from "@/components/ElevatorsSimulation";
import InitialElevatorSystemConfig from "@/components/InitialElevatorSystemConfig";
// Context Providers
import RequestPickupContextProvider from "@/contexts/requestPickupContext/Provider.tsx";
import ElevatorSystemContextProvider from "@/contexts/elevatorSystemContext/Provider.tsx";

function App() {
    const [config, setConfig] = useState<ElevatorSystemConfigToSave | null>(null);
    const [fadeSimulationScreen, setFadeSimulationScreen] = useState<boolean>(false);

    function handleSaveConfig(_config: ElevatorSystemConfigToSave) {
        setConfig(_config);
        setFadeSimulationScreen(false);
    }

    function handleReset() {
        setFadeSimulationScreen(true);

        setTimeout(() => {
            setConfig(null);
        }, 300);
    }

    if (config === null) return (
        <main>
            <InitialElevatorSystemConfig saveConfig={handleSaveConfig} />
        </main>
    );

    return (
        <Fade in={!fadeSimulationScreen}>
            <main>
                <ElevatorSystemContextProvider config={config}>
                    <RequestPickupContextProvider>
                        <ElevatorsSimulation
                            reset={handleReset}
                        />
                    </RequestPickupContextProvider>
                </ElevatorSystemContextProvider>
            </main>
        </Fade>
    );
}

export default App;
