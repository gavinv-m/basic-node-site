import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// For ES modules
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, './about.html'));
});

app.get('/contact-me', (req, res) => {
  res.sendFile(path.join(__dirname, './contact-me.html'));
});

//For unmatched routes, has to be at the bottom of thr file
app.use((req, res) => {
  console.log('Middleware called');
  res.status(404).sendFile(path.join(__dirname, './404.html'));
});

app.listen(PORT);
