const { Router } = require("express");
const {
    getAllBillings,
    getBillingById,
    createBilling,
    updateBilling,
    deleteBilling
} = require("../controllers/billing.controller");

const billingRouter = Router();

billingRouter.get("/", getAllBillings);
billingRouter.get("/:id", getBillingById);
billingRouter.post("/", createBilling);
billingRouter.put("/:id", updateBilling);
billingRouter.delete("/:id", deleteBilling);

module.exports = billingRouter;