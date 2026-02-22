const { Router } = require("express");
const {
    getAllOPD,
    getOPDById,
    createOPD,
    updateOPD,
    deleteOPD,
} = require("../controllers/opd.controller");

const opdRouter = Router();

opdRouter.get("/", getAllOPD);
opdRouter.get("/:id", getOPDById);
opdRouter.post("/", createOPD);
opdRouter.put("/:id", updateOPD);
opdRouter.delete("/:id", deleteOPD);

module.exports = opdRouter;