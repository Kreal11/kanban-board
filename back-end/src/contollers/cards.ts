import { Request, Response } from 'express';
import ctrlWrapper from '../decorators/ctrlWrapper';
import HttpError from '../helpers/HttpError';
import Card from '../models/card';

const getAllCards = async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await Card.find({ owner: id });
    if (!data) {
        throw HttpError(404, `Something went wrong`);
    }

    res.json({ data });
};

const getCardById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const card = await Card.findById(id);

    if (!card) {
        throw HttpError(404, `Card with ID ${id} not found`);
    }

    res.json(card);
};

const addCard = async (req: Request, res: Response) => {
    const body = req.body;

    const createdCard = await Card.create({ ...body });

    if (!createdCard) {
        throw HttpError(404, `Card was not created`);
    }

    res.status(201).json(createdCard);
};

const deleteCard = async (req: Request, res: Response) => {
    const { id } = req.query;

    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard) {
        throw HttpError(404, `Card with ID ${id} not found`);
    }
    res.json(deletedCard);
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

const updateCardWorkStatus = async (req: Request, res: Response) => {
    const { id } = req.body;
    const body = req.body;

    const updatedCardWorkStatus = await Card.findByIdAndUpdate(id, body, {
        new: true,
    });
    if (!updatedCardWorkStatus) {
        throw HttpError(404, `Card with ID ${id} not found`);
    }
    res.json(updatedCardWorkStatus);
};

const updateCardOrder = async (req: Request, res: Response) => {
    const { id } = req.body;
    const body = req.body;

    const updatedCardOrder = await Card.findByIdAndUpdate(id, body, {
        new: true,
    });
    if (!updatedCardOrder) {
        throw HttpError(404, `Card with ID ${id} not found`);
    }
    res.json(updatedCardOrder);
};

export default {
    getAllCards: ctrlWrapper(getAllCards),
    getCardById: ctrlWrapper(getCardById),
    addCard: ctrlWrapper(addCard),
    deleteCard: ctrlWrapper(deleteCard),
    updateCard: ctrlWrapper(updateCard),
    updateCardWorkStatus: ctrlWrapper(updateCardWorkStatus),
    updateCardOrder: ctrlWrapper(updateCardOrder),
};
