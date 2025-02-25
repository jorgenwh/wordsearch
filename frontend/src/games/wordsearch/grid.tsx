import { useState } from 'react';
import './grid.css';
import Cell from './cell';

interface GridProps {
    content: string[][];
    wordPositions: {entry: {word: string, positions: {row: number, col: number}[]}}[];
    found: string[];
    onWordFound: (word: string) => void;
}

const Grid = ({ content, wordPositions, found, onWordFound} : GridProps) => {
    const [selected, setSelected] = useState<{row: number, col: number} | undefined>(undefined);

    const handleOnClick = (row: number, col: number) => {
        if (selected === undefined) {
            setSelected({row: row, col: col});
            return;
        }

        const s1 = selected;
        const s2 = {row: row, col: col};

        for (let i = 0; i < wordPositions.length; i++) {
            const word = wordPositions[i].entry.word;
            const positions = wordPositions[i].entry.positions;

            if (
                    positions[0].row === s1.row && 
                    positions[0].col === s1.col && 
                    positions[positions.length - 1].row === s2.row && 
                    positions[positions.length - 1].col === s2.col
            ) {
                onWordFound(word);
                setSelected(undefined);
                return;
            }
        }

        setSelected(undefined);
    }

    const cells = [];
    for (let row = 0; row < content.length; row++) {
        for (let col = 0; col < content[row].length; col++) {
            const isSelected = selected !== undefined && selected.row === row && selected.col === col;
            const isFound = wordPositions.some((entry) => {
                return entry.entry.positions.some((pos) => {
                    const wordIsFound = found.includes(entry.entry.word);
                    const isInWord = pos.row === row && pos.col === col;
                    return wordIsFound && isInWord;
                });
            });

            cells.push(
                <Cell 
                    character={content[row][col]}
                    isSelected={isSelected}
                    isFound={isFound}
                    key={row + "-" + col}
                    onClick={() => handleOnClick(row, col)}
                />
            );
        }
    }

    return (
        <div className="Grid">
            {cells} 
        </div>
    );
}

export default Grid;
