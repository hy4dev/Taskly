import express from 'express';
import 'dotenv/config';
import { db } from './libs/dbConnect.js';

const app = express();
const PORT = 8000;

// Create a new '/' route.
app.use('/', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
});

// Older version of Express using '*'.
app.use('', (req, res) => {
    res.status(404).json({message: 'Not Found'});
});

// Start the Express server.
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});