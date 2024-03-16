"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const boards_1 = __importDefault(require("./routes/api/boards"));
const cards_1 = __importDefault(require("./routes/api/cards"));
const app = (0, express_1.default)();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use((0, morgan_1.default)(formatsLogger));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use('/api/boards', boards_1.default);
app.use('/api/boards', cards_1.default);
app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});
app.use((err, req, res) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message, err });
});
exports.default = app;
