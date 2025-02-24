import { useEffect, useState } from 'react';
import './weave.css';

export interface WeaveConfig {
    startWord: string;
    targetWord: string;
}

interface WeaveProps {
    config: WeaveConfig;
    setCompleted: () => void;
}

function Weave({ config, setCompleted } : WeaveProps) {
    const startWord: string | undefined = config?.startWord || undefined;
    const targetWord: string | undefined = config?.targetWord || undefined;

    if (startWord === undefined || targetWord === undefined) {
        return (
            <div className="Weave">
                <div className="Loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="Weave">
        </div>
    );
}

export default Weave;
