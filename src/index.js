const express = require('express');

const PORT = 3000;

const app = express();

app.get('/', (req, res) => res.send('Minimal express server'));
app.get('*', (req, res) => res.status(404).send('Route was not found'))
app.use((err, req, res, next) => res.status(500).send('Internal error'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
