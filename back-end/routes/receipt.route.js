const { Router } = require("express");
const {
    getAllReceipts,
    getReceiptById,
    createReceipt,
    updateReceipt,
    deleteReceipt
} = require("../controllers/receipt.controller");

const receiptRouter = Router();

receiptRouter.get("/", getAllReceipts);
receiptRouter.get("/:id", getReceiptById);
receiptRouter.post("/", createReceipt);
receiptRouter.put("/:id", updateReceipt);
receiptRouter.delete("/:id", deleteReceipt);

module.exports = receiptRouter;