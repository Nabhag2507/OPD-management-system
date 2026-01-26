const Prescriptions = () => {
    const [prescriptions] = useState([
        { id: 1, patientId: 1, medication: "Aspirin", dosage: "500mg", frequency: "Twice daily" },
        { id: 2, patientId: 2, medication: "Metformin", dosage: "1000mg", frequency: "Three times daily" }
    ]);

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Prescriptions</h1>
            
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient ID</th>
                        <th>Medication</th>
                        <th>Dosage</th>
                        <th>Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.patientId}</td>
                            <td>{p.medication}</td>
                            <td>{p.dosage}</td>
                            <td>{p.frequency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Prescriptions;
