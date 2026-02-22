const { Router } = require("express");
const {
    getAllTreatments,
    getTreatmentById,
    createTreatment,
    updateTreatment,
    deleteTreatment
} = require("../controllers/treatment.controller");

const treatmentRouter = Router();

treatmentRouter.get("/", getAllTreatments);
treatmentRouter.get("/:id", getTreatmentById);
treatmentRouter.post("/", createTreatment);
treatmentRouter.put("/:id", updateTreatment);
treatmentRouter.delete("/:id", deleteTreatment);

module.exports = treatmentRouter;