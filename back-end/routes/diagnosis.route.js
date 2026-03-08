const { Router } = require("express");
const {
    getAllDiagnoses,
    getDiagnosisById,
    createDiagnosis,
    updateDiagnosis,
    deleteDiagnosis
} = require("../controllers/diagnosis.controller");

const diagnosisRouter = Router();

diagnosisRouter.get("/", getAllDiagnoses);
diagnosisRouter.get("/:id", getDiagnosisById);
diagnosisRouter.post("/", createDiagnosis);
diagnosisRouter.put("/:id", updateDiagnosis);
diagnosisRouter.delete("/:id", deleteDiagnosis);

module.exports = diagnosisRouter;