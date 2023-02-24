const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const appRouter = require('./Router.ts');
import Express from 'express';

const app = express();

app.use(
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.header({ 'Access-Control-Allow-Origin': '*' });
    res.header({ 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH' });
    res.header({
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    next();
  }
);
app.use(express.json());
app.use('/', appRouter);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Oleg:123@cluster0.wai4nbr.mongodb.net/?retryWrites=true&w=majority'
    );
    app.listen(PORT, () => console.log('Lala'));
  } catch (error) {}
};

start();
