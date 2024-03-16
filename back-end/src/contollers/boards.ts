import { Request, Response } from 'express';
import Board from '../models/board';
import ctrlWrapper from '../decorators/ctrlWrapper';
import HttpError from '../helpers/HttpError';

const getAllBoards = async (req: Request, res: Response) => {
    const data = await Board.find();

    // if not needed - find({}, '-name -email etc')
    res.json({ data });
};

const getBoardById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const board = await Board.findById(id);
    // if search by title - await Contact.findOne({title: title})
    if (!board) {
        throw HttpError(404, `Contact with ID ${id} not found`);
    }
    res.json(board);
};

export default {
    getAllBoards: ctrlWrapper(getAllBoards),
    getBoardById: ctrlWrapper(getBoardById),
};
