import { useState } from "react";

const MyReceipts = () => {
    const [receipts] = useState([
        { id: 1, amount: "₹500", date: "2025-01-20", status: "Paid", description: "General Check-up" },
        { id: 2, amount: "₹1000", date: "2025-01-21", status: "Paid", description: "Blood Test" },
        { id: 3, amount: "₹800", date: "2025-01-25", status: "Pending", description: "Consultation" }
    ]);

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">My Receipts</h1>
            
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {receipts.map(r => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.amount}</td>
                            <td>{r.date}</td>
                            <td><span className={`status-${r.status.toLowerCase()}`}>{r.status}</span></td>
                            <td>{r.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyReceipts;
