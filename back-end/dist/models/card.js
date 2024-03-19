"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const handleMongooseError_1 = __importDefault(require("../helpers/handleMongooseError"));
const cardSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Set title for card'],
    },
    description: {
        type: String,
        required: [true, 'Set description for card'],
    },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'boards' },
    workStatus: {
        type: String,
        required: [true, 'Set status for card'],
    },
}, { versionKey: false, timestamps: true });
cardSchema.post('save', handleMongooseError_1.default);
const Card = (0, mongoose_1.model)('card', cardSchema);
exports.default = Card;
