require('dotenv').config();

const express = require('express');
const cors = require('cors');
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

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRouter);

app.use("/appointment", appointmentRouter);
app.use("/billing", billingRouter);
app.use("diagnosis", diagnosisRouter);
app.use("/doctors", doctorRouter);
app.use("/hospitals", hospitalRouter);
app.use("/opd", opdRouter);
app.use("/patients", patientRouter);
app.use("/receipt", receiptRouter);
app.use("/treatement", treatmentRouter);

PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Database connection failed", err);
    });