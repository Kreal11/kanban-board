"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cards_1 = __importDefault(require("../../contollers/cards"));
const cardsRouter = express_1.default.Router();
cardsRouter.get('/:id/cards', cards_1.default.getAllCards);
cardsRouter.post('/:id/cards', cards_1.default.addCard);
cardsRouter.patch('/:id/cards', cards_1.default.updateCard);
cardsRouter.delete('/:id/cards', cards_1.default.deleteCard);
exports.default = cardsRouter;
