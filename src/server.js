const express = require('express');

const app = express();

const PORT = process.env.NODE_PORT || 3333;

app.get('/', (req, res) => res.json({ ok: true }));

app.listen(PORT);
