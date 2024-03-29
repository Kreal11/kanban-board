"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const boards_1 = __importDefault(require("../../contollers/boards"));
const boardsRouter = express_1.default.Router();
boardsRouter.get('/', boards_1.default.getAllBoards);
boardsRouter.get('/:id', boards_1.default.getBoardById);
boardsRouter.post('/', boards_1.default.addBoard);
boardsRouter.patch('/', boards_1.default.updateBoard);
boardsRouter.delete('/:id', boards_1.default.deleteBoard);
exports.default = boardsRouter;
