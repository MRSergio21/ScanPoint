import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '/../public')));

// Redirect /views and /views/index.html to /
app.get(['/views', '/views/', '/views/index.html'], (req, res) => {
    res.redirect('/');
});

// Serve the default file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/views/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});