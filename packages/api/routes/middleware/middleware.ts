import { RequestHandler } from 'express'
import elasticClient from '../../elastic/elastic-client'

export const verifyElasticRunning: RequestHandler = async (req, res, next) => {
  try {
    await elasticClient.cat.health()
  } catch {
    return res
      .status(500)
      .send('Internal Server Error: could not connect to elastic')
  }

  next()
}
