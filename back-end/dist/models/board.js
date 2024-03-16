"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const handleMongooseError_1 = __importDefault(require("../helpers/handleMongooseError"));
const boardSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Set title for contact'],
        unique: true,
    },
    theme: {
        type: String,
        required: [true, 'Set title for contact'],
    },
}, { versionKey: false, timestamps: true });
boardSchema.post('save', handleMongooseError_1.default);
const Board = (0, mongoose_1.model)('board', boardSchema);
exports.default = Board;
