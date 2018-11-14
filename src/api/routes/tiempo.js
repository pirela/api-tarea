import express from 'express'

import { logger, defValues } from '../../utils'
import db from '../../models'

import {limitScroll, defFieldUsu } from '../../utils'

const Model = db.tiempo
const tareaRoutes = express.Router()

tareaRoutes.post('/', async (req, res) => {

  const data = req.body
  const def = defValues()
  const obj = {...data, ...def}

  try {
    let data = await Model.create(obj)

    if (data) {
      res.status(200).json({ data: data })
    } else {
      throw new Error('No se creo la tarea')
    }
  } catch (error) {
    logger.error(error.message)
    res.status(500).json({ error: error.message })
  }
})

tareaRoutes.get('/', async (req, res) => {
  const data = req.body
  const def = defValues()
  const values =  {...data, ...def}

  try {
    let data = await Model.findAll({})

    if (data) {
      res.status(200).json({ data: data })
    } else {
      throw new Error('No se creo el tiempo')
    }
  } catch (error) {
    logger.error(error.message)
    res.status(500).json({ error: error.message })
  }
})

tareaRoutes.get('/more/:cant', async (req, res) => {

	const cantidad = Number.parseInt(req.params.cantidad)
	let limit = limitScroll
	if (cantidad === 0 ) limit = 10

	try {

		const data = await Model.findAll({
			attributes: {
        exclude: [...defFieldUsu]
      },
			order: [
				['createdAt', 'ASC']
			],
			offset: cantidad,
			limit: limit
		})

		if (data) {
			res.status(200).json({ data: data })
		} else {
			throw new Error('No se encontraron las tareas')
		}

	} catch (error) {
		res.status(500).json({ error: error.message })
	}

})

tareaRoutes.put('/', async (req, res) => {

	const data = req.body

	try {

		const upd = await Model.update(data, {
			where: {
				id: data.id
			}
		})

		if (upd[0]) {
			res.status(200).json({ data: data })
		} else {
			throw new Error('No se modifico la tarea especificado')
		}

	} catch (error) {
		res.status(500).json({ error: error.message })
	}

})

tareaRoutes.delete('/:id', async (req, res) => {

  try {

    const del = await Model.destroy({
      where: {
        id: req.params.id
      }
    })

    if(del) {
      res.status(200).json({ data: del })
    } else {
      throw new Error('No se elimino la tarea especficida')
    }

  } catch (error) {
    res.status(500).json({ error: error.message })
  }

})

export default tareaRoutes
