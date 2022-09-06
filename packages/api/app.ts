import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import errors from './routes/errors'
import cors from 'cors'

// used for setting local environment variables (namely NODE_ENV)
dotenv.config();

import testRouter from './routes/test';

const app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:8080', 'http://localhost:3000'],
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
    maxAge: 86400,
    allowedHeaders: ['content-type', 'authorization', 'accept'],
    preflightContinue: false,
  }),
);
app.use(express.static(path.join(__dirname, 'public')));

//register endpoint route controllers
app.use('/test', testRouter);

// 404 handling
app.use(errors.unknownEndpoint);
// error handling
app.use(errors.errorHandler);

export default app;