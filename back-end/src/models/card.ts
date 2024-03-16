import { Schema, model } from 'mongoose';
import handleMongooseError from '../helpers/handleMongooseError';

interface Card {
    title: string;
    description: string;
    owner: string;
}

const cardSchema = new Schema<Card>(
    {
        title: {
            type: String,
            required: [true, 'Set title for card'],
        },
        description: {
            type: String,
            required: [true, 'Set description for card'],
        },
        owner: {
            type: String,
            required: [true, 'Set ownerId for card'],
        },
    },
    { versionKey: false, timestamps: true }
);

cardSchema.post('save', handleMongooseError);

const Card = model('card', cardSchema);

export default Card;
