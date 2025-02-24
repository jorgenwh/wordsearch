import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import WordSearch from './games/wordsearch/wordsearch';
import { WordSearchConfig } from './games/wordsearch/wordsearch';
import Weave from './games/weave/weave';
import { WeaveConfig } from './games/weave/weave';


interface DailyConfig {
    wordSearchConfig: WordSearchConfig;
    weaveConfig: WeaveConfig;
}


const App = () => {
    const [sessionId, setSessionId] = useState<string>("");
    const [game, setGame] = useState<string>("wordsearch");
    const [dailyConfig, setDailyConfig] = useState<DailyConfig | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    const gameCompleted = () => {
        switch (game) {
            case "wordsearch":
                setGame("weave");
                break;
            case "weave":
                setGame("wordsearch");
                break;
            default:
                console.error("Invalid game: " + game);
        }
    }

    useEffect(() => {
        axios.get("http://178.232.190.235:8000/session", {
            headers: { "X-API-KEY": "vanillachocolate" },
            withCredentials: true,
        })
        .then((response) => {
            setSessionId(response.data.session_id);
        })
        .catch((error) => {
            setError("Error loading session: " + error);
        });
    }, []);

    useEffect(() => {
        axios.get<DailyConfig>("http://178.232.190.235:8000/get_daily_config", {
            headers: { "X-API-KEY": "vanillachocolate" },
            withCredentials: true,
        })
        .then((response) => {
            setDailyConfig(response.data);
        })
        .catch((error) => {
            setError("Error loading daily config: " + error);
        });
    }, []);

    if (error !== undefined) {
        return (
            <div className="App">
                <h1 className="Error">{error}</h1>
            </div>
        );
    }

    if (dailyConfig === undefined) {
        return (
            <div className="App">
                <h1 className="Loading">Loading...</h1>
            </div>
        );
    }

    let content = null;
    let header = null;
    switch (game) {
        case "wordsearch":
            header = (
                <h1 className="Title">Word Search</h1>
            );
            content = (
                <WordSearch 
                    config={dailyConfig.wordSearchConfig}
                    setCompleted={gameCompleted}
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
                    setCompleted={gameCompleted}
                />
            );
            break;
        default:
            header = (
                <h1 className="Title">Error</h1>
            );
            content = (
                <div>Error loading game. Please refresh</div>
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
