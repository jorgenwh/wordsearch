import { useEffect, useState } from 'react';
import './wordsearch.css';
import Grid from './grid';
import { createGameState } from './gamelogic';

export interface WordSearchConfig {
    words: string[];
}

interface WordSearchProps {
    config: WordSearchConfig;
    gameCompleted: (elapsedTime: number) => void;
}

interface GameState {
    gridContent: string[][];
    wordPositions: {entry: {word: string, positions: {row: number, col: number}[]}}[];
}

const WordSearch = ({ config, gameCompleted } : WordSearchProps) => {
    const words = config?.words || [];

    const [found, setFound] = useState<string[]>([]);
    const [state, setState] = useState<GameState | undefined>(createGameState(words));
    const [startTime, setStartTime] = useState<number>(Date.now());

    const onWordFound = (word: string) => {
        setFound([...found, word]);
        if (found.length === words.length - 1) {
            const elapsedTime = Date.now() - startTime;
            gameCompleted(elapsedTime);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
          setState(createGameState(words));
        }, 10000);

        return () => clearInterval(interval);
      }, []);

    if (state === undefined) {
        return (
            <div className="WordSearch">
                <div className="Loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="WordSearch">
            <Grid 
                content={state.gridContent}
                wordPositions={state.wordPositions}
                found={found}
                onWordFound={onWordFound}
            />
            <div className="Words">
                {words.map((word, i) => {
                    return (
                        <div key={i}>{found.includes(word) ? "" : word.toUpperCase()}</div>
                    );
                })}
            </div>
        </div>
    );
}

export default WordSearch;
