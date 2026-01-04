function Homepage() {
    return (
        <>
            <main class="page">

                <section class="stats">
                    <div class="stat-card">
                        <span>Total Patients</span>
                        <h2>1,245</h2>
                    </div>
                    <div class="stat-card">
                        <span>Today's OPD</span>
                        <h2>36</h2>
                    </div>
                    <div class="stat-card">
                        <span>Doctors</span>
                        <h2>12</h2>
                    </div>
                    <div class="stat-card">
                        <span>Revenue</span>
                        <h2>₹18,500</h2>
                    </div>
                </section>

                <section class="grid">

                    <div class="panel">
                        <div class="panel-head">
                            <h3>Today's OPD Visits</h3>
                            <button class="primary">+ New OPD</button>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>OPD</th>
                                    <th>Patient</th>
                                    <th>Doctor</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>#101</td>
                                    <td>Rahul Patel</td>
                                    <td>Dr. Mehta</td>
                                    <td><span class="badge open">Open</span></td>
                                    <td><button class="link">View</button></td>
                                </tr>

                                <tr>
                                    <td>#102</td>
                                    <td>Anita Shah</td>
                                    <td>Dr. Joshi</td>
                                    <td><span class="badge done">Completed</span></td>
                                    <td><button class="link">Receipt</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <aside class="actions">
                        <h3>Quick Actions</h3>
                        <button>➕ Register Patient</button>
                        <button>➕ Create OPD</button>
                        <button>➕ Add Doctor</button>
                        <button>🧾 Generate Bill</button>
                    </aside>

                </section>

            </main>
        </>
    )
}

export default Homepage