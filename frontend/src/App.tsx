import { useState, useEffect } from 'react';
import './App.css';

import StartScreen from './games/startscreen/startscreen';
import EndScreen from './games/endscreen/endscreen';

import WordSearch from './games/wordsearch/wordsearch';
import Weave from './games/weave/weave';

import { DailyConfig } from './common';


const App = () => {
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const [dailyConfig, setDailyConfig] = useState<DailyConfig | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const [screen, setScreen] = useState<string>("startscreen");
    const [times, setTimes] = useState<{game: string, time: number}[]>([]);

    const updateScreen = () => {
        switch (screen) {
            case "startscreen":
                setScreen("wordsearch");
                break;
            case "wordsearch":
                setScreen("weave");
                break;
            case "weave":
                setScreen("endscreen");
                break;
            default:
                console.error("Invalid screen: " + screen);
        }
    }

    if (dailyConfig === undefined) {
        return (
            <div className="App">
                <h1 className="Title">Error: no set config</h1>
            </div>
        );
    }

    let content = null;
    let header = null;
    switch (screen) {
        case "startscreen":
            header = (
                <h1 className="Title">Welcome</h1>
            );
            content = (
                <StartScreen
                    setSessionId={setSessionId}
                    setDailyConfig={setDailyConfig}
                    setName={setName}
                    updateScreen={updateScreen}
                />
            );
            break
        case "wordsearch":
            header = (
                <h1 className="Title">Word Search</h1>
            );
            content = (
                <WordSearch 
                    config={dailyConfig.wordSearchConfig}
                    updateScreen={updateScreen}
                />
            );
            break;
        case "weave":
            header = (
                <h1 className="Title">Weave</h1>
            );
            content = (
                <Weave
                    config={dailyConfig.weaveConfig}
                    updateScreen={updateScreen}
                />
            );
            break;
        case "endscreen":
            header = (
                <h1 className="Title">Results</h1>
            );
            content = (
                <EndScreen
                    times={times}
                />
            );
            break;
    }

    return (
        <div className="App">
            {header}
            {content}
        </div>
    );
}

export default App;
