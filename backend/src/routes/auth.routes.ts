import { Request, Response } from 'express';
import express from 'express';
import userModel from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyUser from '../middlewares/verifyUser';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password)
    return res
      .status(400)
      .json({ error: 'Username and password are required' });

  const { username, password } = req.body;

  if (username.length < 3)
    return res
      .status(400)
      .json({ error: 'Username must be at least 3 charecters' });

  if (password.length < 4)
    return res
      .status(400)
      .json({ error: 'Password must be at least 4 characters' });

  try {
    let user = await userModel.findOne({ username });
    if (user) return res.status(400).json({ error: 'Username already exists' });
    user = new userModel({
      username,
      password,
    });
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
          username: user.username,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
      res.json({ token: token, user: payload.user });
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Internal server error. Please ty again later.' });
    }
  } catch {
    return res
      .status(500)
      .json({ error: 'Internal server error. Please ty again later.' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).json({ error: 'Missing some Data' });
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username });
    console.log('login backend user:', user);
    if (!user) return res.status(400).json({ error: 'User Not Found.' });
    try {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck)
        return res.status(400).json({ error: 'User Not Found' });
      const payload = {
        user: {
          id: user.id,
          username: user.username,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
      res.json({ token: token, user: payload.user });
    } catch (error) {
      return res
        .status(500)
        .json({ error: 'Internal server error. Please ty again later.' });
    }
  } catch {
    return res
      .status(500)
      .json({ error: 'Internal server error. Please ty again later.' });
  }
});

router.get('/getuserdata', verifyUser, async (req: Request, res: Response) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (error) {
    res.status(500).send('Internal Server Error. Please Try again later.');
  }
});

export default router;
