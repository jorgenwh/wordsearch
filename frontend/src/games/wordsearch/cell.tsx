import './cell.css';

interface CellProps {
    character: string;
    isSelected: boolean;
    isFound: boolean;
    key: string;
    onClick: () => void;
}

const Cell = ({ 
    character,
    isSelected,
    isFound,
    onClick
} : CellProps) => {

    const style = {
        color: isFound ? 'yellow' : (isSelected ? 'yellow' : 'white'),
        opacity: isFound ? 0.6 : 1
    };

    return (
        <div 
            className="Cell"
            onClick={onClick}
        >
            <p style={style}>{character}</p>
        </div>
    );
}

export default Cell;
