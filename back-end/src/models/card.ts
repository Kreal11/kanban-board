import { Schema, model } from 'mongoose';
import handleMongooseError from '../helpers/handleMongooseError';

interface Card {
    title: string;
    description: string;
    owner: Schema.Types.ObjectId;
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
        owner: { type: Schema.Types.ObjectId, ref: 'boards' },
    },
    { versionKey: false, timestamps: true }
);

cardSchema.post('save', handleMongooseError);

const Card = model('card', cardSchema);

export default Card;
