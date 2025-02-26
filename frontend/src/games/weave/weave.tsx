import { useEffect, useState } from 'react';
import './weave.css';
import WordRow from './wordrow';

export interface WeaveConfig {
    startWord: string;
    targetWord: string;
    wordList: string[];
}

interface WeaveProps {
    config: WeaveConfig;
    gameCompleted: (elapsedTime: number) => void;
}

const getColors = (characters: string[], target: string[]) => {
    const colors = new Array(5).fill(0);
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].toUpperCase() === target[i].toUpperCase()) {
            colors[i] = 1;
        }
    }
    return colors;
}

const Weave = ({ config, gameCompleted } : WeaveProps) => {
    const startWord: string[] | undefined = config?.startWord.split("") || undefined;
    const targetWord: string[] | undefined = config?.targetWord.split("") || undefined;
    const wordList: string[] | undefined = config?.wordList || undefined;

    const [history, setHistory] = useState<string[][]>([]);
    const [input, setInput] = useState<string[]>(["", "", "", "", ""]);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [startTime, setStartTime] = useState<number>(Date.now());

    const isInputValid = () => {
        if (activeIndex !== 4 || input[4] === "") {
            return false;
        }

        if (!wordList.includes(input.join("").toLowerCase())) {
            return false;
        }

        let similarity = 0;
        const reference = history.length > 0 ? history[history.length - 1] : startWord;
        for (let i = 0; i < 5; i++) {
            if (input[i].toUpperCase() === reference[i].toUpperCase()) {
                similarity++;
            }
        }

        return similarity === 4;
    };

    const isDone = () => {
        for (let i = 0; i < 5; i++) {
            if (input[i].toUpperCase() !== targetWord[i].toUpperCase()) {
                return false;
            }
        }

        return true;
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey) { 
                return; 
            }

            if (event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
                event.preventDefault();

                if (activeIndex === 4 && input[4] !== "") {
                    return;
                }

                if (activeIndex < 5) {
                    const newInput = [...input];
                    newInput[activeIndex] = event.key.toUpperCase();
                    setInput(newInput);
                    if (activeIndex < 4) {
                        setActiveIndex(activeIndex + 1);
                    }
                }
            } else if (event.key === "Backspace") {
                event.preventDefault();

                if (activeIndex > 0) {
                    const newInput = [...input];
                    if (newInput[activeIndex] === "") {
                        newInput[activeIndex - 1] = "";
                        setInput(newInput);
                        setActiveIndex(activeIndex - 1);
                    } else {
                        newInput[activeIndex] = "";
                        setInput(newInput);
                    }
                }
            } else if (event.key === "Enter") {
                event.preventDefault();

                if (isInputValid()) {
                    if (isDone()) {
                        const elapsedTime = Date.now() - startTime;
                        gameCompleted(elapsedTime);
                    }
                    setHistory([...history, input]);
                    setInput(["", "", "", "", ""]);
                    setActiveIndex(0);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeIndex, input, history]);

    if (startWord === undefined || targetWord === undefined || wordList === undefined) {
        return (
            <div className="Weave">
                <div className="Loading">Error: cannot find config</div>
            </div>
        );
    }

    return (
        <div className="Weave">
            <WordRow 
                characters={startWord}
                colors={undefined}
            />
            {history.map((characters, i) => (
                <WordRow 
                    key={i}
                    characters={characters}
                    colors={getColors(characters, targetWord)}
                />
            ))}
            <WordRow
                characters={input}
                colors={undefined}
            />
            <WordRow 
                characters={targetWord}
                colors={undefined}
            />
        </div>
    );
}

export default Weave;
