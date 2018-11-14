import express from 'express'
import cors from 'cors'

import config from './config'
import { logger } from './utils'

import apiRoutes from './api/api'
import authRoutes from './api/auth'

import bodyParser from 'body-parser'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/auth', authRoutes)
app.use('/api/v1', apiRoutes)

app.get('/', (req, res) => {
  res.send('API')
})

app.listen({ port: config.port }, () => {
  logger.info(`\n\n🚀 Server ready at http://localhost:${config.port}\n\n`)
})
