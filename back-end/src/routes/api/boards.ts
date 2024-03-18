import express from 'express';

import boardsController from '../../contollers/boards';

const boardsRouter = express.Router();

boardsRouter.get('/', boardsController.getAllBoards);
boardsRouter.get('/:id', boardsController.getBoardById);

boardsRouter.post('/', boardsController.addBoard);

boardsRouter.patch('/', boardsController.updateBoard);

boardsRouter.delete('/:id', boardsController.deleteBoard);

export default boardsRouter;
