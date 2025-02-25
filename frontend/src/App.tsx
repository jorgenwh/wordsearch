import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import WordSearch from './games/wordsearch/wordsearch';
import { WordSearchConfig } from './games/wordsearch/wordsearch';
import Weave from './games/weave/weave';
import { WeaveConfig } from './games/weave/weave';


const FRONTEND_PORT = 3000;
const BACKEND_PORT = 8000;


interface DailyConfig {
    wordSearchConfig: WordSearchConfig;
    weaveConfig: WeaveConfig;
}


const App = () => {
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const [game, setGame] = useState<string>("weave");
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
        axios.get(`http://178.232.190.235:${BACKEND_PORT}/session`, {
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
        if (sessionId === undefined) {
            return;
        }

        axios.get<DailyConfig>(`http://178.232.190.235:${BACKEND_PORT}/get_daily_config`, {
            headers: { "X-API-KEY": "vanillachocolate" },
            withCredentials: true,
        })
        .then((response) => {
            setDailyConfig(response.data);
        })
        .catch((error) => {
            setError("Error loading daily config: " + error);
        });
    }, [sessionId]);

    console.log("sessionId: " + sessionId);
    console.log("dailyConfig: " + dailyConfig);
    console.log("error: " + error);

    if (error !== undefined) {
        return (
            <div className="App">
                <h1 className="Error">{error}</h1>
            </div>
        );
    }

    if (sessionId === undefined) {
        return (
            <div className="App">
                <h1 className="Loading">Loading session...</h1>
            </div>
        );
    }

    if (dailyConfig === undefined) {
        return (
            <div className="App">
                <h1 className="Loading">Loading daily config...</h1>
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
