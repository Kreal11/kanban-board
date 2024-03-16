import express from 'express';

import boardsController from '../../contollers/boards';

const boardsRouter = express.Router();

boardsRouter.get('/', boardsController.getAllBoards);
boardsRouter.get('/:id', boardsController.getBoardById);

export default boardsRouter;
