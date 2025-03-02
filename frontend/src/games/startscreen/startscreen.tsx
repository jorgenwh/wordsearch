import './startscreen.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { BACKEND_PORT, DailyConfig } from '../../common';

interface LoadingStatus {
    sessionIdSet: boolean;
    dailyConfigSet: boolean;
    nameSet: boolean;
}

interface StartScreenProps {
    setSessionId: (sessionId: string) => void;
    setDailyConfig: (dailyConfig: DailyConfig) => void;
    setName: (name: string) => void;
    updateScreen: () => void;
}

const getDailyConfig = (sessionId: string) => {
    axios.get<DailyConfig>(`http://178.232.190.235:${BACKEND_PORT}/get_daily_config`, {
        headers: { "X-API-KEY": "vanillachocolate" },
        withCredentials: true,
    })
    .then((response) => {
        console.log("Received daily config: ", response.data);
        return response.data;
    })
    .catch((error) => console.log("Error loading daily config:", error));
}

const getSessionId = () => {
    axios.get(`http://178.232.190.235:${BACKEND_PORT}/session`, {
        headers: { "X-API-KEY": "vanillachocolate" },
        withCredentials: true,
    })
    .then((response) => {
        console.log("Received session ID: ", response.data.session_id);
        return response.data.session_id;
    })
    .catch((error) => console.log("Error loading session ID: " + error));
}

const StartScreen = ({ setName, updateScreen } : StartScreenProps) => {
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>({ sessionIdSet: false, dailyConfigSet: false, nameSet: false });

    const handleSetName = () => {
        const name = document.querySelector('.NameInputInput') as HTMLInputElement;
        if (!/^[a-zA-Z _-]+$/.test(name.value) || name.value === "") {
            alert("Invalid name. Please use only letters, spaces, and underscores.");
            return;
        }

        setLoadingStatus({ ...loadingStatus, nameSet: true });
        setName(name.value);
    }

    useEffect(() => {
        const sessonId = getSessionId();
        setSessionId(sessionId);
        setLoadingStatus({ ...loadingStatus, sessionIdSet: true });
    }, []);

    useEffect(() => {
        if (sessionId === undefined) {
            return;
        }

        const dailyConfig = getDailyConfig(sessionId);
        setDailyConfig(dailyConfig);
        setLoadingStatus({ ...loadingStatus, dailyConfigSet: true });
    }, [sessionId]);

    const message = loading ? (nameEntered ? "Loading daily config" : "Enter name above") : "Press to start!";
    const start = (
        <div className="Start">
            <p className="StartText">{message}</p>
            <div className={loading ? "LoadingText" : "StartButton"}>
                {loading ? "Loading..." : "Start"}
            </div>
        </div>
    );

    return (
        <div className="StartScreen">
            <div className="NameInput">
                <input className="NameInputInput" type="text" placeholder="Enter name ..."/>
                <button className="NameInputButton" onClick={handleSetName}>Enter</button>
            </div>
            {start}
        </div>
    );
}

export default StartScreen;
