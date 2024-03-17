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
const board_1 = __importDefault(require("../models/board"));
const ctrlWrapper_1 = __importDefault(require("../decorators/ctrlWrapper"));
const HttpError_1 = __importDefault(require("../helpers/HttpError"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllBoards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield board_1.default.find();
    // if not needed - find({}, '-name -email etc')
    res.json({ data });
});
const getBoardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // if search by title - await Contact.findOne({title: title})
    const pipeline = [
        {
            $match: {
                _id: new mongoose_1.default.Types.ObjectId(id),
            },
        },
        {
            $addFields: {
                boardStringId: { $toString: '$_id' },
            },
        },
        {
            $lookup: {
                from: 'cards',
                localField: 'boardStringId',
                foreignField: 'owner',
                as: 'cards',
            },
        },
    ];
    const result = yield board_1.default.aggregate(pipeline);
    if (!result) {
        throw (0, HttpError_1.default)(404, `Board with ID ${id} not found`);
    }
    res.json(result);
});
const addBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const createdBoard = yield board_1.default.create(Object.assign({}, body));
    res.status(201).json(createdBoard);
});
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedBoard = yield board_1.default.findByIdAndDelete(id);
    if (!deletedBoard) {
        throw (0, HttpError_1.default)(404, `Board with ID ${id} not found`);
    }
    res.json(deletedBoard);
    // res.status(204).send();
});
const updateBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const body = req.body;
    const updatedBoard = yield board_1.default.findByIdAndUpdate(id, body, {
        new: true,
    });
    if (!updatedBoard) {
        throw (0, HttpError_1.default)(404, `Board with ID ${id} not found`);
    }
    res.json(updatedBoard);
});
exports.default = {
    getAllBoards: (0, ctrlWrapper_1.default)(getAllBoards),
    getBoardById: (0, ctrlWrapper_1.default)(getBoardById),
    addBoard: (0, ctrlWrapper_1.default)(addBoard),
    deleteBoard: (0, ctrlWrapper_1.default)(deleteBoard),
    updateBoard: (0, ctrlWrapper_1.default)(updateBoard),
};
