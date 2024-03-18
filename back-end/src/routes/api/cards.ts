import express from 'express';

import cardsController from '../../contollers/cards';

const cardsRouter = express.Router();

cardsRouter.get('/', cardsController.getAllCards);

cardsRouter.post('/', cardsController.addCard);

cardsRouter.patch('/', cardsController.updateCard);

cardsRouter.delete('/:id', cardsController.deleteCard);

export default cardsRouter;
