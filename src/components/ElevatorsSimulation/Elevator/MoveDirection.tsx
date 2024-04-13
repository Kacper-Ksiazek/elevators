import { styled } from "@mui/material";

import type { FunctionComponent } from "react";
import type { ElevatorStatus } from "@Elevator/@types.ts";

import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

const MoveDirectionBase = styled("div")(({ theme }) => ({
    height: "48px",
    marginBottom: "4px",
    ...theme.mixins.flex_center,
    opacity: .5,

    svg: {
        fontSize: "48px"
    }
}));

interface MoveDirectionProps {
    status: ElevatorStatus;
}

const MoveDirection: FunctionComponent<MoveDirectionProps> = (props) => {
    return (
        <MoveDirectionBase>
            {(() => {
                switch (props.status) {
                    case "MOVING_UP":
                        return <ArrowUpwardRoundedIcon />;
                    case "MOVING_DOWN":
                        return <ArrowDownwardRoundedIcon />;
                    case "STOPPED_AT_FLOOR":
                        return <PauseRoundedIcon />;
                    default:
                        return <></>;
                        // return <ArrowDownwardRoundedIcon />;
                }
            })()}
        </MoveDirectionBase>
    );
};

export default MoveDirection;