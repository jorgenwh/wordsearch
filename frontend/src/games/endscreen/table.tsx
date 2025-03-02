import './table.css';
import TableColumn from './tablecolumn';

export interface TableEntry {
    name: string;
    wordSearchTime: number;
    weaveTime: number;
    totalTime: number;
}


interface TableProps {
    entries: TableEntry[];
}

const formatTime = (time: number) => {
    const seconds = time % 60;
    const minutes = Math.floor(time / 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

const constructColumns = (entries: TableEntry[]) => {
    const headers = ["", "name", "word search time", "weave time", "total time"];

    const names = entries.map((entry) => { 
        return entry.name.toUpperCase();
    });

    const wordSearchTimes = entries.map((entry) => {
        return formatTime(entry.wordSearchTime);
    });

    const weaveTimes = entries.map((entry) => {
        return formatTime(entry.weaveTime);
    });

    const totalTimes = entries.map((entry) => {
        return formatTime(entry.totalTime);
    });

    const columns = headers.map((header, index) => {
        let values: string[] = [];
        switch (header) {
            case "name":
                values = names;
                break;
            case "word search time":
                values = wordSearchTimes;
                break;
            case "weave time":
                values = weaveTimes;
                break;
            case "total time":
                values = totalTimes;
                break;
            default:
                break;
        }
        return <TableColumn header={header} values={values} currentUserIndex={0} key={index} />;
    });

    return columns;
}

const Table = ({ entries } : TableProps) => {
    const sortedEntries: TableEntry[] = entries.sort((a, b) => a.totalTime - b.totalTime);
    const columns = constructColumns(sortedEntries);

    return (
        <div className="Table">
            {columns}
        </div>
    );
}

export default Table;
