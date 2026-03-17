const formatHeader = (value) =>
    value
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

const formatCellValue = (value) => {
    if (value === null || value === undefined || value === "") {
        return "—";
    }

    if (typeof value === "boolean") {
        return value ? "Yes" : "No";
    }

    return String(value);
};

const Table = ({ columns, data, onEdit, onDelete }) => {
    const hasActions = Boolean(onEdit || onDelete);

    if (!data.length) {
        return (
            <div className="empty-state">
                <h3>No records yet</h3>
                <p>Add a new item to populate this section.</p>
            </div>
        );
    }

    return (
        <div className="table-shell">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col}>{formatHeader(col)}</th>
                        ))}
                        {hasActions && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                        <tr key={row.id || row._id || idx}>
                            {columns.map((col) => (
                                <td key={col}>{formatCellValue(row[col])}</td>
                            ))}
                            {hasActions && (
                                <td className="actions">
                                    {onEdit && (
                                        <button
                                            className="btn-small btn-edit"
                                            onClick={() => onEdit(row)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            className="btn-small btn-delete"
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
        </div>
    );
};

export default Table;
