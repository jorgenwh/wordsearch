import { useEffect, useState } from 'react';
import './wordrow.css';

const Cell = ({ character, color } : { character: string | undefined, color: number }) => {
    let colorIndicator;
    switch (color) {
        case 0:
            colorIndicator = "rgba(255, 255, 255, 0.2)";
            break;
        case 1:
            colorIndicator = "rgba(0, 255, 0, 0.55)";
            break;
    }

    const style = {
        width: "1.75em",
        height: "1.75em",
        minWidth: "1.75em",
        minHeight: "1.75em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        margin: "0.1em",
        backgroundColor: colorIndicator,
    };

    const content = character !== undefined ? character.toUpperCase() : "";

    return (
        <div style={style} className="Cell">
            {content}
        </div>
    );
}

interface WordRowProps{
    characters: string[];
    colors: number[] | undefined;
}

const WordRow = ({ characters, colors } : WordRowProps) => {
    const cells = [];
    for (let i = 0; i < 5; i++) {
        cells.push(
            <Cell 
                key={i} 
                character={characters.length >= i ? characters[i] : undefined}
                color={colors !== undefined ? colors[i] : 0}
            />
        );
    }

    return (
        <div className="WordRow">
            {cells}
        </div>
    );
}

export default WordRow;
