import Express from 'express';
const { JwtPayload } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

export interface CustomRequest extends Express.Request {
  user: string | typeof JwtPayload;
}

module.exports = function (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  if (req.method === 'OPTIONS') next();

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'User is not authorized ' });
    }
    const decodedPayload = jwt.verify(token, secret);
    (req as CustomRequest).user = decodedPayload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'User is not authorized' });
  }
};
