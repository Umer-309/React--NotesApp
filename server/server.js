import express from 'express';
import cors from 'cors';
import './loadenv.js';
import notes from './routes/notes/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.use('/notes', notes);

app.listen(port);
