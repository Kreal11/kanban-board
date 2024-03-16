import express from 'express';

import cardsController from '../../contollers/cards';

const cardsRouter = express.Router();

cardsRouter.get('/:id/cards', cardsController.getAllCards);

cardsRouter.post('/:id/cards', cardsController.addCard);

cardsRouter.patch('/:id/cards', cardsController.updateCard);

cardsRouter.delete('/:id/cards', cardsController.deleteCard);

export default cardsRouter;
