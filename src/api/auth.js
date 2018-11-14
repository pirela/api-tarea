import express from 'express'
import jwt from 'jsonwebtoken'

import config from '../config'
import  db from '../models'
import { logger } from '../utils'

const authRoutes = express.Router()
const Model = db.usuario

authRoutes.post('/', async (req, res) => {
  const body = req.body

  try {
    const data = await Model.findOne({
      where: {
        email: body.email
      }
    })

    if (!data) {
      throw new Error('No se encontro el usuario')
    } else {
      res.status(200).json({ data, token: buildToken(data) })
    }
  } catch (error) {
    logger.error(error.message)
    res.status(500).json({ error: error.message })
  }
})

function buildToken(data) {
  return jwt.sign({ user: data }, config.secretApi, { expiresIn: '600d' })
}

export default authRoutes
