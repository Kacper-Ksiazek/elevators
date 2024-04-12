import { styled } from "@mui/material";
import type { ElevatorState } from "@Elevator/@types.ts";

const ElevatorBase = styled("div")(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "2px",

    "div.floor": {
        flexGrow: 1,
        background: theme.palette.background.default,
        width: "100px"

    }
}));

interface ElevatorProps {
    data: ElevatorState;
    maxFloor: number;
    elevatorOrderNumber: number;
}

const Elevator: React.FunctionComponent<ElevatorProps> = (props) => {
    return (
        <ElevatorBase>
            {Array.from({ length: props.maxFloor }, (_, i) => {
                return (
                    <div key={i} className="floor">
                        {i}
                    </div>
                );
            })}

            <span>
                Elevator {props.elevatorOrderNumber}
            </span>
            <span>
                id: <strong>{props.data.elevatorID}</strong>
            </span>
        </ElevatorBase>
    );
};

export default Elevator;