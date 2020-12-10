import express from 'express';
import {Request, Response, NextFunction} from 'utils/express';

const PORT = 3000;

const app = express();

app.get('/', (req, res) => res.send('Minimal express server'));
app.get('*', (req, res) => res.status(404).send('Route was not found'))
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => res.status(500).send('Internal error'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
