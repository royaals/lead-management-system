const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const leadRoutes = require('./routes/leadRoutes');
const contactRoutes = require('./routes/contactRoutes');
const interactionRoutes = require('./routes/interactionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use('/api/leads', leadRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/interactions', interactionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });