import './endscreen.css';

interface EndScreenProps {
    times: {game: string, time: number}[];
}

const EndScreen = ({ times } : EndScreenProps) => {
    return (
        <div className="EndScreen">
            {times.map((time, i) => {
                return (
                    <div key={i} className="Time">
                        <h1 className="Time">{time.game}</h1>
                        <h1 className="Time">{" : "}</h1>
                        <h1 className="Time">{time.time/1000}s</h1>
                    </div>
                );
            })}
        </div>
    );
}

export default EndScreen;
