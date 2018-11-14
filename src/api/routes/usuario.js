import express from 'express'

import { logger, defValues } from '../../utils'
import db from '../../models'

const Model = db.usuario
const usuarioRoutes = express.Router()

usuarioRoutes.post('/', async (req, res) => {

  const data = req.body
  const def = defValues()
  const obj = {...data, ...def}

  try {
    let data = await Model.create(obj)

    if (data) {
      res.status(200).json({ data: data })
    } else {
      throw new Error('No se creo el usuario')
    }
  } catch (error) {
    logger.error(error.message)
    res.status(500).json({ error: error.message })
  }
})

usuarioRoutes.get('/', async (req, res) => {

  try {
    let data = await Model.findAll({})

    if (data) {
      res.status(200).json({ data: data })
    } else {
      throw new Error('No se encontraron los usuario')
    }
  } catch (error) {
    logger.error(error.message)
    res.status(500).json({ error: error.message })
  }
})

// en caso de tener un listado de usuario y querer taerlos fraccionados

// usuarioRoutes.get('/more/:cant', async (req, res) => {

// 	const cantidad = Number.parseInt(req.params.cantidad)
// 	let limit = limitScroll
// 	if (cantidad === 0 ) limit = 10

// 	try {

// 		const data = await Model.findAll({
// 			attributes: {
//         exclude: [...defFieldUsu]
//       },
// 			order: [
// 				['createdAt', 'ASC']
// 			],
// 			offset: cantidad,
// 			limit: limit
// 		})

// 		if (data) {
// 			res.status(200).json({ data: data })
// 		} else {
// 			throw new Error('No se encontraron las tareas')
// 		}

// 	} catch (error) {
// 		res.status(500).json({ error: error.message })
// 	}

// })

usuarioRoutes.put('/', async (req, res) => {

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

usuarioRoutes.delete('/:id', async (req, res) => {

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

export default usuarioRoutes
