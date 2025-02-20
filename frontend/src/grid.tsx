import { useState } from 'react';
import './grid.css';

interface GridProps {
    gridSize: number;
    words: string[];
}

const buildGrid = (gridSize: number, words: string[]): string[][] => {
    const grid = new Array(gridSize).fill(null).map(() => new Array(gridSize).fill(null));

    return grid;
};


function Grid({ gridSize, words }: GridProps) {
    const [grid, setGrid] = useState<string[][]>(buildGrid(gridSize, words));

    return (
        <div className="Grid">
            {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="Row">
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className="Cell">
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grid;
