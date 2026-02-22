const { Router } = require("express");
const {
    getAllHospitals,
    getHospitalById,
    createHospital,
    updateHospital,
    deleteHospital
} = require("../controllers/hospital.controller");

const hospitalRouter = Router();

hospitalRouter.get("/", getAllHospitals);
hospitalRouter.get("/:id", getHospitalById);
hospitalRouter.post("/", createHospital);
hospitalRouter.put("/:id", updateHospital);
hospitalRouter.delete("/:id", deleteHospital);

module.exports = hospitalRouter;