"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
// Serve static files from the "public" directory
app.use(express_1.default.static(path_1.default.join(__dirname, '/../public')));
// Redirect /views and /views/index.html to /
app.get(['/views', '/views/', '/views/index.html'], (req, res) => {
    res.redirect('/');
});
// Serve the default file
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/../public/views/index.html'));
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
