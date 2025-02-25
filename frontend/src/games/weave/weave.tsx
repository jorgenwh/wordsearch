import { useEffect, useState } from 'react';
import './weave.css';
import WordRow from './wordrow';

export interface WeaveConfig {
    startWord: string;
    targetWord: string;
}

interface WeaveProps {
    config: WeaveConfig;
    setCompleted: () => void;
}

const getColors = (characters: string[], target: string[]) => {
    const colors = new Array(5).fill(0);
    for (let i = 0; i < characters.length; i++) {
        if (characters[i] === target[i]) {
            colors[i] = 1;
        }
    }
    return colors;
}

const Weave = ({ config, setCompleted } : WeaveProps) => {
    // const startWord: string[] | undefined = config?.startWord.split("") || undefined;
    // const targetWord: string[] | undefined = config?.targetWord.split("") || undefined;
    const startWord: string[] | undefined = ["c", "l", "a", "m", "p"];
    const targetWord: string[] | undefined = ["c", "h", "i", "l", "e"];

    const [history, setHistory] = useState<string[][]>([
        ["c", "l", "u", "m", "p"], 
        ["c", "h", "u", "m", "p"], 
    ]);
    const [input, setInput] = useState<string[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const isWordValid = (word: string[]) => {
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

                if (activeIndex === 4 && input[4] !== "" && isWordValid(input)) {
                    setHistory([...history, input]);
                    setInput(["", "", "", "", ""]);
                    setActiveIndex(0);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeIndex, input, history]);

    if (startWord === undefined || targetWord === undefined) {
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
                colors={getColors(input, targetWord)}
            />
            <WordRow 
                characters={targetWord}
                colors={undefined}
            />
        </div>
    );
}

export default Weave;
