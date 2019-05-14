'use strict'

const Hapi = require('@hapi/hapi')
const inert = require('inert')
const handlebars = require('./lib/helpers')
const vision = require('vision')
const path = require('path')
const routes = require('./routes')
const site = require('./controllers/site')
const methods = require('./lib/methods')

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

async function init () {
  try {
    await server.register(inert)
    await server.register(vision)

    server.method('setAnswerRight', methods.setAnswerRight)

    server.state('user', {
      ttl: 1000*60*60*24*7,
      isSecure: process.env.NODE_ENV === 'prod',
      encoding: 'base64json'
    })

    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    })

    server.ext('onPreResponse', site.fileNotFound)
    server.route(routes)
    await server.start()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }

  console.log(`Server launched in: ${server.info.uri}`)
}

process.on('unhandledRejection', error => {
  console.error(`unhandledRejection ${error.message}`)
})

process.on('unhandledException', error => {
  console.error(`unhandledException ${error.message}`)
})

init()