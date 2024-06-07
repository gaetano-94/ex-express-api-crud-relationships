const express = require('express');
const postRoutes = require('./routers/postRoutes');
const categoryRoutes = require('./routers/categoryRoutes');
const tagRoutes = require('./routers/tagRoutes');
const app = express();

require('dotenv').config();
const { PORT } = process.env;
const port = PORT || 3000;

app.use(express.json());

app.use('/api', postRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);

app.listen(port, () => {
  console.log(`Server attivo su http://localhost:${port}`);
});
