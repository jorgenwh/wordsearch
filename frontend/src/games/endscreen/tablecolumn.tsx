import './tablecolumn.css';

interface TableColumnProps {
    header: string;
    values: string[];
    currentUserIndex: number;
}

const TableColumn = ({ header, values, currentUserIndex } : TableColumnProps) => {
    return (
        <div className={(header === "") ? `TableColumnLeft` : `TableColumn`}>
            <div className="Header">
                <div className="Value">
                    {header.toUpperCase()}
                </div>
            </div>
            <div className="Content">
                {values.map((value, index) => {
                    return (
                        <div className={index === currentUserIndex ? "ValueCurrentUser" : "Value"} key={index}>
                            {value}
                        </div>
                    );
                })}
            </div>
            <div className="Footer">
            </div>
        </div>
    );
}

export default TableColumn;
