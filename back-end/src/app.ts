import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import boardsRouter from './routes/api/boards';

interface CustomError extends Error {
    status?: number;
    message: string;
}

const app = express();

const formatsLogger: string =
    app.get('env') === 'development' ? 'dev' : 'short';

app.use((req, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/boards', boardsRouter);

app.use((req, res: Response) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((err: CustomError, req: Request, res: Response) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message, err });
});

export default app;
