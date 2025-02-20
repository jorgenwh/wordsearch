import { useState } from 'react';
import './grid.css';

interface GridProps {
    words: string[];
}

function Grid({ words }: GridProps) {
    console.log(words);

    return (
        <div className="Grid">
        </div>
    );
}

export default Grid;
