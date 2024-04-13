import { alpha, styled } from "@mui/material";

const FloorBase = styled("div")(({ theme }) => ({
    flexGrow: 1,
    background: alpha("#000", .05),
    color: alpha("#000", .5),
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}));

interface FloorProps {
    /** The number of the floor */
    floorNumber: number;
}

const Floor: React.FunctionComponent<FloorProps> = (props) => {
    return (
        <FloorBase>
            {props.floorNumber === 0 ? "GROUND" : props.floorNumber}
        </FloorBase>
    );
};

export default Floor;