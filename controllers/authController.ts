import Express from 'express';
import { ObjectId } from 'mongoose';
const User = require('../model/User');
const Settings = require('../model/Settings');
var bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const generateAccessToken = (id: ObjectId) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, secret, { expiresIn: '48h' });
};

class authController {
  async registration(req: Express.Request, res: Express.Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error(JSON.stringify(errors));
      }

      const { username, password, dateCreation } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        throw new Error(JSON.stringify('User has been already exist'));
      }
      const hashPassword = bcrypt.hashSync(password, 5);

      const settings = new Settings();
      await settings.save();

      const user = new User({
        username,
        password: hashPassword,
        dateCreation,
        settings,
      });
      await user.save();

      await Settings.findByIdAndUpdate(settings._id, {
        user: user._id,
      });

      return res.json({ message: 'Registration successful' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: JSON.parse(error.message) });
      }
    }
  }

  async login(req: Express.Request, res: Express.Response) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User hasn't been found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Password is not correct` });
      }
      const token = generateAccessToken(user._id);
      return res.json({ token });
    } catch (error) {
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req: Express.Request, res: Express.Response) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: 'Set user error' });
    }
  }
}

module.exports = new authController();
