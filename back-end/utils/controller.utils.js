const mongoose = require("mongoose");

const createHttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

const trimString = (value) => {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
};

const toNumber = (value) => {
    if (value === undefined || value === null || value === "") return undefined;
    return Number(value);
};

const toDate = (value) => {
    if (!value) return undefined;
    return new Date(value);
};

const pickDefined = (payload) =>
    Object.fromEntries(
        Object.entries(payload).filter(([, value]) => value !== undefined)
    );

const validateObjectId = (id, label = "Resource") => {
    if (!mongoose.isValidObjectId(id)) {
        throw createHttpError(400, `Invalid ${label} ID`);
    }
};

const ensureDocumentExists = async (Model, id, label) => {
    validateObjectId(id, label);

    const exists = await Model.exists({ _id: id });
    if (!exists) {
        throw createHttpError(404, `${label} not found`);
    }
};

const ensureReferences = async (references = []) => {
    for (const reference of references) {
        const { Model, id, label } = reference;

        if (id !== undefined) {
            await ensureDocumentExists(Model, id, label);
        }
    }
};

const sendError = (res, err, fallbackMessage = "Internal server error") => {
    if (err.status) {
        return res.status(err.status).json({
            err: true,
            message: err.message,
        });
    }

    if (err.name === "ValidationError") {
        const message = Object.values(err.errors)
            .map((error) => error.message)
            .join(", ");

        return res.status(400).json({
            err: true,
            message: message || "Validation failed",
        });
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            err: true,
            message: `Invalid ${err.path}`,
        });
    }

    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern || {})[0] || "field";
        return res.status(400).json({
            err: true,
            message: `${field} already exists`,
        });
    }

    return res.status(500).json({
        err: true,
        message: err.message || fallbackMessage,
    });
};

module.exports = {
    createHttpError,
    trimString,
    toNumber,
    toDate,
    pickDefined,
    validateObjectId,
    ensureDocumentExists,
    ensureReferences,
    sendError,
};
