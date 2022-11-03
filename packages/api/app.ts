import express from 'express'
import logger from 'morgan'
import dotenv from 'dotenv'
import path from 'path'
import errors from './routes/errors'
import cors from 'cors'
import { verifyElasticRunning } from './routes/middleware/middleware'

import workoutRouter from './routes/workouts'
import recipeRouter from './routes/recipes'

// used for setting local environment variables (namely NODE_ENV)
dotenv.config()

const app = express()

// view engine setup
app.use(logger('dev'))
app.use(express.json())
app.use(
  cors({
    origin: ['http://localhost:8080', 'http://localhost:3000'],
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'],
    maxAge: 86400,
    allowedHeaders: ['content-type', 'authorization', 'accept'],
    preflightContinue: false
  })
)
app.use(express.static(path.join(__dirname, 'public')))

app.use(verifyElasticRunning)

// register endpoint route controllers
app.use('/workouts', workoutRouter)
app.use('/recipes', recipeRouter)
// 404 handling
app.use(errors.unknownEndpoint)
// error handling
app.use(errors.errorHandler)

export default app
