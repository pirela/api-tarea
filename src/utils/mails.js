import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'

import config from '../config'

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(
  smtpTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // secure:true for port 465, secure:false for port 587
    auth: {
      user: config.emailUser,
      pass: config.emailPass
    }
  })
)

function sendMail(mailOptions) {
  return new Promise(resolve => {
    transporter.sendMail(mailOptions, error => {
      if (error) {
        resolve(error)
      }
      resolve(1)
    })
  })
}

const emailDefTo = {
  name: 'SolucionesDeCobros',
  address: config.emailDefTo
}

function deftOption(opts={}) {
  return {
    ...opts,
    from: `${config.emailAlias} <${config.emailUser}>`,
    bcc: opts.bcc ? Array.isArray(opts.bcc) ? [emailDefTo, ...opts.bcc] : [emailDefTo, opts.bcc] : [emailDefTo],
  }
}

export const sendMails = {
  newUser(user={}, opts={}) {
    const mailOptions = {
      ...deftOption(opts),
      subject: '📝 Nuevo usuario registrado',
      text: `Hay un nuevo usuario en la plataforma
        \n DNI: ${user.dni}
        \n Nombre: ${user.nombre}
        \n Email: ${user.email}
        \n Telefono: ${user.telefono}
        \n Direccion: ${user.direccion}
      `
    }

    return sendMail(mailOptions).then(msg => msg)
  },
  payment(pay={}, opts={}) {
    const mailOptions = {
      ...deftOption(opts),
      subject: '💲 Nuevo pago aprobado',
      text: `Codigo del pago: ${pay.id}
        \n Nombre: ${pay.nombre}
        \n DNI: ${pay.payerDni}
        \n Celular: ${pay.celular}
        \n Email: ${pay.email}
        \n Producto o servicio: ${pay.producto}
        \n Importe de venta: ${pay.impVen}
        \n Cantidad de cuotas: ${pay.cantCuota}
        \n Vendedor: ${pay.vendedor}
        \n Vendedor recibe: ${pay.venRec}
        \n Importe de cuotas: ${pay.impCuo}
        \n Total Financiado: ${pay.totFin}
      `
    }

    return sendMail(mailOptions).then(msg => msg)
  }
}
