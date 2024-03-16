import express from 'express';

import boardsController from '../../contollers/boards';

const boardsRouter = express.Router();

boardsRouter.get('/', boardsController.getAllBoards);

export default boardsRouter;