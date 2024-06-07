const express = require('express');
const app = express();
const postRoutes = require('./routers/postRoutes');

require('dotenv').config();
const { PORT } = process.env;
const port = PORT || 3000;

app.use(express.json());

app.use('/api', postRoutes);

app.listen(port, () => {
  console.log(`Server attivo su http://localhost:${port}`);
});
