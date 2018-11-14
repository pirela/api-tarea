import express from 'express'

import { logger, defValues } from '../../utils'
import db from '../../models'

import {limitScroll, defFieldUsu } from '../../utils'

const uuid = require('uuid/v4')

const Model = db.tarea
const tareaRoutes = express.Router()

tareaRoutes.post('/', async (req, res) => {

  const user = req.user

  const data = req.body
  const def = defValues()
  const obj = {...data, ...def, createdUsu: user.id, updatedUsu: user.id}

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

tareaRoutes.post('/masivo', async (req, res) => {

	const user = req.user
	const data = req.body

	let all = []

	data.forEach(obj => {
		const values = Object.assign(obj, {
			id: uuid(),
			createdUsu: user.id,
			updatedUsu: user.id
		})

		all.push(values)
	});

	try {

		let tarea = await Model.bulkCreate(all)

		if (tarea) {
			res.status(200).json({ data: tarea })
		} else {
			throw new Error('No se crearon las tareas especificada')
		}

	} catch (error) {
		res.status(500).json({ error: error.message })
	}

})

tareaRoutes.get('/completada/:completada', async (req, res) => {
  const completada = req.params.completada

  try {
    let data = await Model.findAll({
      where: {
        completada: completada
      }
    })

    if (data) {
      res.status(200).json({ data: data })
    } else {
      throw new Error('no se encontraron las tareas')
    }
  } catch (error) {
    logger.error(error.message)
    res.status(500).json({ error: error.message })
  }
})

tareaRoutes.get('/all', async (req, res) => {

  try {
    let data = await Model.findAll({})
    if (data) {
      res.status(200).json({ data: data })
    } else {
      throw new Error('No se encontraron las tareas')
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
