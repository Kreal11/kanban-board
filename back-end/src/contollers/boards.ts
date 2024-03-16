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
        throw HttpError(404, `Board with ID ${id} not found`);
    }
    res.json(board);
};

const addBoard = async (req: Request, res: Response) => {
    const body = req.body;

    const createdBoard = await Board.create({ ...body });

    res.status(201).json(createdBoard);
};

const deleteBoard = async (req: Request, res: Response) => {
    const { id } = req.params;

    const deletedBoard = await Board.findByIdAndDelete(id);
    if (!deletedBoard) {
        throw HttpError(404, `Board with ID ${id} not found`);
    }
    res.json(deletedBoard);
    // res.status(204).send();
};

const updateBoard = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    const updatedBoard = await Board.findByIdAndUpdate(id, body, {
        new: true,
    });

    if (!updatedBoard) {
        throw HttpError(404, `Board with ID ${id} not found`);
    }
    res.json(updatedBoard);
};

export default {
    getAllBoards: ctrlWrapper(getAllBoards),
    getBoardById: ctrlWrapper(getBoardById),
    addBoard: ctrlWrapper(addBoard),
    deleteBoard: ctrlWrapper(deleteBoard),
    updateBoard: ctrlWrapper(updateBoard),
};
