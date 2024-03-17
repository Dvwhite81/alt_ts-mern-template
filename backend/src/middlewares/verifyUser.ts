import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any, data: any) => {
        console.log('verifyUser data:', data);
        if (err && !data) return res.status(403).json({ error: 'Forbidden' });
        if (!data) return res.status(403).json({ error: 'Forbidden' });
        if (!data.user) return;

        req.user = data.user;
        next();
      }
    );
  } else {
    res.status(403).json({ error: 'No Token' });
  }
};

export default verifyUser;
