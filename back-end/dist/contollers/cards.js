"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ctrlWrapper_1 = __importDefault(require("../decorators/ctrlWrapper"));
const HttpError_1 = __importDefault(require("../helpers/HttpError"));
const card_1 = __importDefault(require("../models/card"));
const getAllCards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = yield card_1.default.find({ owner: id });
    if (!data) {
        throw (0, HttpError_1.default)(404, `Something went wrong`);
    }
    res.json({ data });
});
const getCardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const card = yield card_1.default.findById(id);
    if (!card) {
        throw (0, HttpError_1.default)(404, `Card with ID ${id} not found`);
    }
    res.json(card);
});
const addCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const createdCard = yield card_1.default.create(Object.assign({}, body));
    if (!createdCard) {
        throw (0, HttpError_1.default)(404, `Card was not created`);
    }
    res.status(201).json(createdCard);
});
const deleteCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    const deletedCard = yield card_1.default.findByIdAndDelete(id);
    if (!deletedCard) {
        throw (0, HttpError_1.default)(404, `Card with ID ${id} not found`);
    }
    res.json(deletedCard);
});
const updateCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const body = req.body;
    const updatedCard = yield card_1.default.findByIdAndUpdate(id, body, {
        new: true,
    });
    if (!updatedCard) {
        throw (0, HttpError_1.default)(404, `Card with ID ${id} not found`);
    }
    res.json(updatedCard);
});
const updateCardWorkStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const body = req.body;
    const updatedCardWorkStatus = yield card_1.default.findByIdAndUpdate(id, body, {
        new: true,
    });
    if (!updatedCardWorkStatus) {
        throw (0, HttpError_1.default)(404, `Card with ID ${id} not found`);
    }
    res.json(updatedCardWorkStatus);
});
const updateCardOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const body = req.body;
    const updatedCardOrder = yield card_1.default.findByIdAndUpdate(id, body, {
        new: true,
    });
    if (!updatedCardOrder) {
        throw (0, HttpError_1.default)(404, `Card with ID ${id} not found`);
    }
    res.json(updatedCardOrder);
});
exports.default = {
    getAllCards: (0, ctrlWrapper_1.default)(getAllCards),
    getCardById: (0, ctrlWrapper_1.default)(getCardById),
    addCard: (0, ctrlWrapper_1.default)(addCard),
    deleteCard: (0, ctrlWrapper_1.default)(deleteCard),
    updateCard: (0, ctrlWrapper_1.default)(updateCard),
    updateCardWorkStatus: (0, ctrlWrapper_1.default)(updateCardWorkStatus),
    updateCardOrder: (0, ctrlWrapper_1.default)(updateCardOrder),
};
