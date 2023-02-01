import React, { useState } from "react";
import "./App.css";
import useMarkdownParser from "./hooks/useMarkdownParser";

function App() {
    const [txt, setTxt] = useState("");
    const [markdownComponents] = useMarkdownParser(txt);

    return (
        <div>
            <textarea
                onChange={(value) => setTxt(value.target.value)}
            ></textarea>
            <div>{markdownComponents}</div>
        </div>
    );
}

export default App;
