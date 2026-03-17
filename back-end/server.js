require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const patientRouter = require('./routes/patient.route');
const opdRouter = require('./routes/opd.route');
const doctorRouter = require('./routes/doctor.route');
const treatmentRouter = require('./routes/treatement.route');
const appointmentRouter = require('./routes/appointment.route');
const billingRouter = require('./routes/billing.route');
const diagnosisRouter = require('./routes/diagnosis.route');
const hospitalRouter = require('./routes/hospital.route');
const receiptRouter = require('./routes/receipt.route');
const authRouter = require('./routes/auth.route');
const { requireAuth } = require('./middleware/auth.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        err: false,
        message: "OPD backend is running"
    });
});

app.get("/health", (req, res) => {
    const isDatabaseConnected = mongoose.connection.readyState === 1;

    res.status(isDatabaseConnected ? 200 : 503).json({
        err: false,
        server: "up",
        database: isDatabaseConnected ? "connected" : "disconnected"
    });
});

// Routes
app.use("/auth", authRouter);
app.use("/appointment", requireAuth, appointmentRouter);
app.use("/appointments", requireAuth, appointmentRouter);
app.use("/billing", requireAuth, billingRouter);
app.use("/billings", requireAuth, billingRouter);
app.use("/diagnosis", requireAuth, diagnosisRouter);
app.use("/diagnoses", requireAuth, diagnosisRouter);
app.use("/doctor", requireAuth, doctorRouter);
app.use("/doctors", requireAuth, doctorRouter);
app.use("/hospital", requireAuth, hospitalRouter);
app.use("/hospitals", requireAuth, hospitalRouter);
app.use("/opd", requireAuth, opdRouter);
app.use("/opds", requireAuth, opdRouter);
app.use("/patient", requireAuth, patientRouter);
app.use("/patients", requireAuth, patientRouter);
app.use("/receipt", requireAuth, receiptRouter);
app.use("/receipts", requireAuth, receiptRouter);
app.use("/treatement", requireAuth, treatmentRouter);
app.use("/treatment", requireAuth, treatmentRouter);
app.use("/treatments", requireAuth, treatmentRouter);

app.use((req, res) => {
    res.status(404).json({
        err: true,
        message: "Route not found"
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        err: true,
        message: "Internal server error"
    });
});

const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        return server;
    } catch (err) {
        console.error("Database connection failed:", err.message);
        throw err;
    }
};

if (require.main === module) {
    startServer().catch(() => {
        process.exit(1);
    });
}

module.exports = { app, startServer };
