import express from 'express';
import 'dotenv/config';
import { db } from './libs/dbConnect.js';

import userRouter from './routes/user.route.js';

const app = express();
const PORT = 8000;

app.use(express.json());

app.use('/api/v1/users', userRouter);

/*
// Create a new '/' route.
app.use('/', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
});

// Older version of Express using '*'.
app.use('', (req, res) => {
    res.status(404).json({message: 'Not Found'});
});
*/

// Start the Express server.
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});