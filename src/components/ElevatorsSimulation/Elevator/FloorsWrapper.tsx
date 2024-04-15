import { styled } from "@mui/material";
import { fadeIn, fadeOut } from "@/mui/keyframes/fade.ts";
import { ElevatorRequestingPickupClassName } from "@/components/ElevatorsSimulation/Elevator/types.ts";
import type { FunctionComponent, PropsWithChildren } from "react";
import type { ElevatorState } from "@Elevator/@types.ts";

const FloorsWrapperBase = styled("div", {
    shouldForwardProp: (prop: string) => prop !== "color"
})<{ color: string }>(({ theme, ...props }) => ({
    flexGrow: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    transition: "opacity .3s",

    ".current-floor": {
        position: "absolute",
        width: "100%"
    },

    "&:after": {
        content: "''",
        ...theme.mixins.absolute_full,
        background: "#d2d2d2",
        zIndex: 1,
        transition: "all .2s",
        opacity: 1,
        animationDuration: ".2s",
        animationPlayState: "linear",
        animationName: fadeOut,
        animationFillMode: "both"
    },

    [`&.${"picking_elevator" as ElevatorRequestingPickupClassName.Elevator}`]: {
        "&:after": {
            animationName: fadeIn
        },
        "&:hover:after": {
            cursor: "pointer",
            background: props.color
        }
    },

    [`&.${"different_elevator_is_selected" as ElevatorRequestingPickupClassName.Elevator}`]: {
        opacity: .16,
        "&:after": {
            animationName: fadeIn
        }
    }
}));


interface FloorsWrapperProps extends PropsWithChildren {
    className?: string;
    color: ElevatorState["color"];
}

const FloorsWrapper: FunctionComponent<FloorsWrapperProps> = (props) => {
    return (
        <FloorsWrapperBase
            color={props.color}
            className={props.className}
        >
            {props.children}
        </FloorsWrapperBase>
    );
};

export default FloorsWrapper;