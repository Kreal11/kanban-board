"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cards_1 = __importDefault(require("../../contollers/cards"));
const cardsRouter = express_1.default.Router();
cardsRouter.get('/', cards_1.default.getAllCards);
cardsRouter.get('/:id', cards_1.default.getCardById);
cardsRouter.post('/', cards_1.default.addCard);
cardsRouter.patch('/', cards_1.default.updateCard);
cardsRouter.patch('/workStatus', cards_1.default.updateCardWorkStatus);
cardsRouter.delete('/', cards_1.default.deleteCard);
exports.default = cardsRouter;
