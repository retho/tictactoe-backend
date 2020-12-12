import express from 'express';
import {Request, Response, NextFunction} from 'utils/express';
import authMiddleware from 'middlewares/auth';
import {CommonErrorKinds, isCommonError} from 'utils/errors';
import {assertNever} from 'utils/common';
import { useUserInfo } from 'utils/auth';
import auth from 'routes/auth'
import bodyParser from 'body-parser'

const PORT = 3000;
const app = express();

app.use(bodyParser.json())

app.use('/auth', auth)
app.use(authMiddleware);
app.get('/hello', (req, res) => {
  const {username} = useUserInfo(req);
  res.send(`Hello, ${username}!`)
});

app.get('*', (req, res) => res.status(404).send('Route was not found'))
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (isCommonError(err)) {
    switch(err.kind) {
      case CommonErrorKinds.unauthorized: {
        return res.status(401).send('Unauthorized');
      }
      default: {
        assertNever(err.kind)
      }
    }
  }
  console.log('[Internal]', err);
  return res.status(500).send('Internal error')
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
