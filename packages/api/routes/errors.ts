import { ErrorRequestHandler, RequestHandler } from 'express';

export const unknownEndpoint: RequestHandler = (req, res) => {
  res.status(404).send({ error: 'Endpoint Not Found' });
};

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  // eslint-disable-next-line no-unused-vars
  _next,
) => {
  res.status(500).json({ error: 'Server Error' });
};

export default {
  unknownEndpoint,
  errorHandler,
};
