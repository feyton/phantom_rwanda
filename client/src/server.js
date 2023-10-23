import cors from 'cors';
import express from 'express';
import path, { join } from 'path';

const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 3001; // Heroku will need the PORT environment variable
app.use(cors());
app.use(express.static(join(__dirname, 'dist')));
app.use(express.static(join(__dirname, 'public')));
// Always ensure to load the react router to handle the routing
app.use('*', (_, res) => {
  return res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {});
