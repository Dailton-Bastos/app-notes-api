const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const PORT = process.env.NODE_PORT || 3333;

app.use(express.json());
app.use(routes);
app.use(cors());

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });

  return next();
});

app.listen(PORT);
