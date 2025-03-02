import { useState } from 'react';
import './endscreen.css';
import Table, { TableEntry } from './table';

interface EndScreenProps {
    times: {game: string, time: number}[];
}

const EndScreen = ({ times } : EndScreenProps) => {
    const [loading, setLoading] = useState(true);

    const tableEntries: TableEntry[] = [
        { 
            name: "Jørgen",
            wordSearchTime: 43,
            weaveTime: 87,
            totalTime: 130,
        },
        { 
            name: "Saranyaa",
            wordSearchTime: 22,
            weaveTime: 59,
            totalTime: 81,
        },
        { 
            name: "Timmo",
            wordSearchTime: 176,
            weaveTime: 255,
            totalTime: 431,
        },
    ];

    if (loading) {
        return (
            <div className="EndScreen">
                <div className="Loading">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="EndScreen">
            <Table entries={tableEntries}/>
        </div>
    );
}

export default EndScreen;
