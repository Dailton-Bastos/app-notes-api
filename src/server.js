require('dotenv/config');

const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const PORT = process.env.NODE_PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((req, res, next) => {
  const error = new Error('Not found!');
  error.status = 404;
  return next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });

  return next();
});

app.listen(PORT);
