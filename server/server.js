import express from 'express';

const app = express();
const PORT = 8000;

app.use('', (req, res) => {
    res.status(404).json({message: 'not found'});
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});