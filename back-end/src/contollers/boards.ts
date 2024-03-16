import { Request, Response } from 'express';
import Board from '../models/board';
import ctrlWrapper from '../decorators/ctrlWrapper';

const getAllBoards = async (req: Request, res: Response) => {
    const data = await Board.find();

    // if not needed - find({}, '-name -email etc')
    res.json({ data });
};

export default {
    getAllBoards: ctrlWrapper(getAllBoards),
};
