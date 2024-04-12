import { useState } from "react";
import "./App.css";
import { Button } from "@mui/material";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            {count}

            <Button variant="contained" onClick={() => setCount(val => val + 1)}>
                text
            </Button>
        </>
    );
}

export default App;
