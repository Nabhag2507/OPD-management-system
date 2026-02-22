const { Router } = require("express");
const {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
} = require("../controllers/patient.controller");

const patientRouter = Router();

patientRouter.get("/", getAllPatients);
patientRouter.get("/:id", getPatientById);
patientRouter.post("/", createPatient);
patientRouter.put("/:id", updatePatient);
patientRouter.delete("/:id", deletePatient);

module.exports = patientRouter;