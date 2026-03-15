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
app.use("/appointment", appointmentRouter);
app.use("/appointments", appointmentRouter);
app.use("/billing", billingRouter);
app.use("/billings", billingRouter);
app.use("/diagnosis", diagnosisRouter);
app.use("/diagnoses", diagnosisRouter);
app.use("/doctor", doctorRouter);
app.use("/doctors", doctorRouter);
app.use("/hospital", hospitalRouter);
app.use("/hospitals", hospitalRouter);
app.use("/opd", opdRouter);
app.use("/opds", opdRouter);
app.use("/patient", patientRouter);
app.use("/patients", patientRouter);
app.use("/receipt", receiptRouter);
app.use("/receipts", receiptRouter);
app.use("/treatement", treatmentRouter);
app.use("/treatment", treatmentRouter);
app.use("/treatments", treatmentRouter);

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
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    connectDB().catch((err) => {
        console.error("Database connection failed:", err.message);
    });
};

startServer();

module.exports = app;
