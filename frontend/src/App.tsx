import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import WordSearch from './games/wordsearch/wordsearch';
import { WordSearchConfig } from './games/wordsearch/wordsearch';
import Weave from './games/weave/weave';
import { WeaveConfig } from './games/weave/weave';
import EndScreen from './games/endscreen/endscreen';


const FRONTEND_PORT = 3000;
const BACKEND_PORT = 8000;


interface DailyConfig {
    wordSearchConfig: WordSearchConfig;
    weaveConfig: WeaveConfig;
}


const App = () => {
    const [dailyConfig, setDailyConfig] = useState<DailyConfig | undefined>(
        {
            wordSearchConfig: {
                words: ["123", "456", "789"],
            },
            weaveConfig: {
                startWord: "clump",
                targetWord: "chile",
            },
        }
    );
    const [game, setGame] = useState<string>(dailyConfig === undefined ? "" : "wordsearch");
    const [error, setError] = useState<string | undefined>(undefined);
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const [times, setTimes] = useState<{game: string, time: number}[]>([]);

    const gameCompleted = (elapsedTime: number) => {
        setTimes([...times, {game, time: elapsedTime}]);

        switch (game) {
            case "":
                break;
            case "wordsearch":
                setGame("weave");
                break;
            case "weave":
                setGame("endscreen");
                break;
            default:
                console.error("Invalid game: " + game);
                setError("Failed to switch game");
        }
    }

    // useEffect(() => {
    //     axios.get(`http://178.232.190.235:${BACKEND_PORT}/session`, {
    //         headers: { "X-API-KEY": "vanillachocolate" },
    //         withCredentials: true,
    //     })
    //     .then((response) => {
    //         setSessionId(response.data.session_id);
    //     })
    //     .catch((error) => {
    //         setError("Error loading session: " + error);
    //     });
    // }, []);
    //
    // useEffect(() => {
    //     if (sessionId === undefined) {
    //         return;
    //     }
    //
    //     axios.get<DailyConfig>(`http://178.232.190.235:${BACKEND_PORT}/get_daily_config`, {
    //         headers: { "X-API-KEY": "vanillachocolate" },
    //         withCredentials: true,
    //     })
    //     .then((response) => {
    //         setDailyConfig(response.data);
    //     })
    //     .catch((error) => {
    //         setError("Error loading daily config: " + error);
    //     });
    // }, [sessionId]);
    

    if (error !== undefined) {
        return (
            <div className="App">
                <h1 className="Error">{error}</h1>
            </div>
        );
    }

    // if (sessionId === undefined) {
    //     return (
    //         <div className="App">
    //             <h1 className="Loading">Loading session...</h1>
    //         </div>
    //     );
    // }

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
        case "":
            header = (
                <h1 className="Title">Loading...</h1>
            );
            content = (
                <div>Loading...</div>
            );
            break;
        case "wordsearch":
            header = (
                <h1 className="Title">Word Search</h1>
            );
            content = (
                <WordSearch 
                    config={dailyConfig.wordSearchConfig}
                    gameCompleted={gameCompleted}
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
                    gameCompleted={gameCompleted}
                />
            );
            break;
        case "endscreen":
            header = (
                <h1 className="Title">End Screen</h1>
            );
            content = (
                <EndScreen
                    times={times}
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
