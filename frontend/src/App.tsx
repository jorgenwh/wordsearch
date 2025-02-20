import { useEffect, useState } from 'react';
import './App.css';

import Grid from './grid';


function App() {
    const [words, setWords] = useState(["typescript", "react", "css"]);
    const [gridSize, setGridSize] = useState(10);

    return (
        <div className="App">
            <h1 className="Title">wordsearch</h1>
            <Grid gridSize={gridSize} words={words}/>
        </div>
    );
}

export default App;
