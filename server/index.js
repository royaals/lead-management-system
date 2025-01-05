// index.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import leadRoutes from './routes/leadRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import interactionRoutes from './routes/interactionRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/leads', leadRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/interactions', interactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});