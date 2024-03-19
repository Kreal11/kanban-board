import { Request, Response } from 'express';
import ctrlWrapper from '../decorators/ctrlWrapper';
import HttpError from '../helpers/HttpError';
import Card from '../models/card';

const getAllCards = async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await Card.find({ owner: id });

    // if not needed - find({}, '-name -email etc')
    res.json({ data });
};

const getCardById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const card = await Card.findById(id);

    res.json(card);
};

const addCard = async (req: Request, res: Response) => {
    const body = req.body;

    const createdCard = await Card.create({ ...body });

    res.status(201).json(createdCard);
};

const deleteCard = async (req: Request, res: Response) => {
    const { id } = req.body;

    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard) {
        throw HttpError(404, `Card with ID ${id} not found`);
    }
    res.json(deletedCard);
    // res.status(204).send();
};

const updateCard = async (req: Request, res: Response) => {
    const { id } = req.body;
    const body = req.body;

    const updatedCard = await Card.findByIdAndUpdate(id, body, {
        new: true,
    });

    if (!updatedCard) {
        throw HttpError(404, `Card with ID ${id} not found`);
    }
    res.json(updatedCard);
};

export default {
    getAllCards: ctrlWrapper(getAllCards),
    getCardById: ctrlWrapper(getCardById),
    addCard: ctrlWrapper(addCard),
    deleteCard: ctrlWrapper(deleteCard),
    updateCard: ctrlWrapper(updateCard),
};
