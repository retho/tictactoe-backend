import express from 'express';
import { createUserName, decodeAuthToken, login, logout } from 'db/auth';

const router = express.Router()

router.post('/login', (req, res) => {
  const raw_username: string = req.body.username;
  const username = createUserName(raw_username);
  if (!username) return res.status(400).send('Invalid username');
  const token = login(username);
  if (!token) return res.status(409).send('This username is already taken')
  return res.json({token});
})

router.delete('/logout', (req, res) => {
  const token = req.headers['authorization'];
  const tokenPayload = decodeAuthToken(token || '');
  if (!tokenPayload) return res.status(401).send('Invalid token');
  const success = logout(tokenPayload);
  if (success) return res.status(401).send('Invalid token');
  return res.send();
})

export default router
