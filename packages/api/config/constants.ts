import { config } from 'dotenv'
config()

export const PORT = 7001
export const ELASTIC_URL = 'http://localhost:9200'
export const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
