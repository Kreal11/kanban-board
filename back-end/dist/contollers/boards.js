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
const getAllBoards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield board_1.default.find();
    // if not needed - find({}, '-name -email etc')
    res.json({ data });
});
exports.default = {
    getAllBoards: (0, ctrlWrapper_1.default)(getAllBoards),
};
