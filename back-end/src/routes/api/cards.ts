import express from 'express';

import cardsController from '../../contollers/cards';

const cardsRouter = express.Router();

cardsRouter.get('/', cardsController.getAllCards);
cardsRouter.get('/:id', cardsController.getCardById);

cardsRouter.post('/', cardsController.addCard);

cardsRouter.patch('/', cardsController.updateCard);
cardsRouter.patch('/', cardsController.updateCardWorkStatus);

cardsRouter.delete('/', cardsController.deleteCard);

export default cardsRouter;
