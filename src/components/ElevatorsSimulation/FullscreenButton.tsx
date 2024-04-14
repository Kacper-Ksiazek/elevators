// Types
import { type FunctionComponent, useEffect, useState } from "react";
// Icons
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import FullscreenExitRoundedIcon from "@mui/icons-material/FullscreenExitRounded";
// Components
import Button from "@/components/atoms/Button.tsx";
import SmoothConditionalRender from "@/components/atoms/SmoothConditionalRender.tsx";


const FullscreenButton: FunctionComponent = () => {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    function handleOnClick() {
        // Check if the document is in fullscreen mode
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
        // If not, request fullscreen
        else {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        }
    }

    useEffect(() => {
        if(document){
            setIsFullscreen(true);
            document.documentElement.requestFullscreen();
        }

        return () => {
            if(document){
                setIsFullscreen(false);
                document.exitFullscreen();
            }
        }
    }, []);

    return (
        <Button
            onClick={handleOnClick}
            tooltip="Fullscreen"
            color={isFullscreen ? "error" : "secondary"}
            sx={{
                width: "120px",
                svg: {
                    marginTop: "2px"
                }
            }}
        >
            <SmoothConditionalRender when={!isFullscreen}>
                <FullscreenRoundedIcon />
                Open
            </SmoothConditionalRender>

            <SmoothConditionalRender when={isFullscreen}>
                <FullscreenExitRoundedIcon />
                Close
            </SmoothConditionalRender>
        </Button>

    );
};

export default FullscreenButton;