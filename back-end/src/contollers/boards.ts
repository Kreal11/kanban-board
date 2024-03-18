import { Request, Response } from 'express';
import Board from '../models/board';
import ctrlWrapper from '../decorators/ctrlWrapper';
import HttpError from '../helpers/HttpError';
import mongoose from 'mongoose';

const getAllBoards = async (req: Request, res: Response) => {
    const data = await Board.find();

    // if not needed - find({}, '-name -email etc')
    res.json({ data });
};

const getBoardById = async (req: Request, res: Response) => {
    const { id } = req.params;
    // if search by title - await Contact.findOne({title: title})

    const pipeline = [
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id),
            },
        },
        // {
        //     $addFields: {
        //         boardStringId: { $toString: '$_id' },
        //     },
        // },
        {
            $lookup: {
                from: 'cards',
                localField: '_id',
                foreignField: 'owner',
                as: 'cards',
            },
        },
    ];

    const result = await Board.aggregate(pipeline);

    if (!result) {
        throw HttpError(404, `Board with ID ${id} not found`);
    }
    res.json(...result);
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
