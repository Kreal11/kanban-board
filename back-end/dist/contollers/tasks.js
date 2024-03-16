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
const getAllBoards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield board_1.default.find();
    // if not needed - find({}, '-name -email etc')
    res.json({ data });
});
const getBoardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const board = yield board_1.default.findById(id);
    // if search by title - await Contact.findOne({title: title})
    if (!board) {
        throw (0, HttpError_1.default)(404, `Contact with ID ${id} not found`);
    }
    res.json(board);
});
exports.default = {
    getAllBoards: (0, ctrlWrapper_1.default)(getAllBoards),
    getBoardById: (0, ctrlWrapper_1.default)(getBoardById),
};
