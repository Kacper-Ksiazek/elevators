// Tools
import { styled } from "@mui/material";
import type { FunctionComponent } from "react";
import { useElevatorSystemContext } from "@/hooks/useElevatorSystemContext.ts";
// Components
import Elevator from "./Elevator";

// Styled Components
const ElevatorsListBase = styled("div")(({ theme }) => ({
    display: "flex",
    gap: "16px",
    height: "calc(100vh - 96px)",
    width: "100%",
    justifyContent: "center",
    marginBottom: "12px"
}));
const ElevatorsList: FunctionComponent = () => {
    const system = useElevatorSystemContext();

    return (
        <ElevatorsListBase>
            {system.status.map((item, index) => {
                return (
                    <Elevator
                        key={item.elevatorID}
                        data={item}
                        elevatorOrderNumber={index + 1}
                    />
                );
            })}
        </ElevatorsListBase>
    );
};

export default ElevatorsList;