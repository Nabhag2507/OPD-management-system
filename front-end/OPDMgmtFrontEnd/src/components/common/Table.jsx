const Table = ({ columns, data, onEdit, onDelete }) => {
    return (
        <table className="data-table" style={{ animation: 'fadeInScale 0.4s ease-out' }}>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col}>{col.toUpperCase()}</th>
                    ))}
                    {(onEdit || onDelete) && <th>ACTIONS</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr key={idx} style={{ animation: `slideInFromLeft 0.3s ease-out ${idx * 0.05}s both` }}>
                        {columns.map((col) => (
                            <td key={col}>{row[col]}</td>
                        ))}
                        {(onEdit || onDelete) && (
                            <td className="actions">
                                {onEdit && (
                                    <button 
                                        className="btn-small btn-edit smooth-transition" 
                                        onClick={() => onEdit(row)}
                                    >
                                        Edit
                                    </button>
                                )}
                                {onDelete && (
                                    <button 
                                        className="btn-small btn-delete smooth-transition" 
                                        onClick={() => onDelete(row)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
