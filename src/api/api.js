import express from 'express'
import jwt from 'jsonwebtoken'
import mercadopago from 'mercadopago'

import tareaRoutes from './routes/tarea'
import tiempoRoutes from './routes/tiempo'
import usuarioRoutes from './routes/usuario'


import { logger } from '../utils'
import config from '../config'
import db from '../models'

const apiRoutes = express.Router()
const Usuario = db.usuario

apiRoutes.get('/', (req, res) => {
  res.status(200).json({
    data: {
      title: 'API ROOT',
      message: 'this is the root of the API you need to login to access the API!'
    }
  })
})

apiRoutes.use('/', async (req, res, next) => {
  const token = req.headers.authorization

  if(token) {
    jwt.verify(token, config.secretApi, async (err, decoded) => {
      if(err) {
        return res.status(403).json({ error: 'Authentication failed.' })
      }

      const user = await Usuario.findOne({

        where: {
          email: decoded.user.email
        }
      })

      if(!user) {
        return res.status(500).json({ error: 'Could not validate this user.' })
      }

      req.user = user
      next()
    })
  } else {
    logger.error('No token provided.')

    return res.status(403).json({
      error: 'No token provided.'
    })
  }
})

apiRoutes.use('/tarea', tareaRoutes)
apiRoutes.use('/tiempo', tiempoRoutes)
apiRoutes.use('/usuario', usuarioRoutes)

apiRoutes.use((req, res, next) => {

  if (!req.route) {
    return res.status(404).json({
      error: 'Oooops! 404'
    })
  }
  next()
})

export default apiRoutes
