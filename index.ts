const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const appRouter = require('./Router.ts');
import Express from 'express';

const app = express();

app.use(express.json());
app.use('/', appRouter);
app.use(
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.header({ 'Access-Control-Allow-Origin': '*' });
    next();
  }
);

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://Oleg:123@cluster0.wai4nbr.mongodb.net/?retryWrites=true&w=majority'
    );
    app.listen(PORT, () => console.log('Lala'));
  } catch (error) {}
};

start();
