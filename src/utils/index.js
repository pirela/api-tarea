import bunyan from 'bunyan'
import uuid from 'uuid/v4'

export const defValues = isUpdate => {
  const date = new Date()
  return !isUpdate ? {
    id: uuid(),
    createdAt: date,
    updatedAt: date
  } : {
    updatedAt: date
  }
}

export const logger = bunyan.createLogger({
  name: 'logger',
  src: true,
  serializers: {
    err: bunyan.stdSerializers.err,
  },
  streams: [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'error',
      path: 'error.log'
    }
  ]
})
