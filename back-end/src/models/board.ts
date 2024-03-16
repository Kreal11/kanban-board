import { Schema, model } from 'mongoose';
import handleMongooseError from '../helpers/handleMongooseError';

interface Board {
    title: string;
    theme: string;
}

const boardSchema = new Schema<Board>(
    {
        title: {
            type: String,
            required: [true, 'Set title for contact'],
            unique: true,
        },
        theme: {
            type: String,
            required: [true, 'Set title for contact'],
        },
    },
    { versionKey: false, timestamps: true }
);

boardSchema.post('save', handleMongooseError);

const Board = model('board', boardSchema);

export default Board;
