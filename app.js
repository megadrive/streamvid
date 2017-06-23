'use strict'

const Hapi = require('hapi')
const jsonfile = require('jsonfile')

const server = new Hapi.Server()
server.connection({port: 3000, host: 'localhost'})

let nextToSend = []
let lastFired = {
  time: Date.now(),
  remaining: 0
}

let getMedia = function () {
  return jsonfile.readFileSync('./media.json')
}

server.register(require('inert'), function (err) {
  if (err) throw new Error(err)

  server.route({
    method: 'GET',
    path: '/',
    handler: function (req, reply) {
      reply.file('./www/index.html')
    }
  })

  server.route({
    method: 'GET',
    path: '/media/{filename}',
    handler: function (req, reply) {
      reply.file(`./media/${req.params.filename}`)
    }
  })

  server.route({
    method: 'GET',
    path: '/poll',
    handler: function (req, reply) {
      // check for pending videos, then push next
      if (nextToSend && (Date.now() - lastFired.time) >= 3000) {
        let el = nextToSend.splice(0, 1)
        lastFired.time = Date.now()
        lastFired.element = el[0]
        lastFired.remaining = nextToSend.length
        reply(lastFired)
      } else {
        reply(lastFired)
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/add/{id}',
    handler: function (req, reply) {
      let result = {time: Date.now(), result: ''}
      let media = getMedia()
      if (req.params.id && media[req.params.id]) {
        nextToSend.push(media[req.params.id])
        result.result = 'success'
      } else {
        result.result = 'failure'
        result.reason = 'file doesnt exist or was not set'
      }
      reply(JSON.stringify(result))
    }
  })
})

server.start(function (err) {
  if (err) throw new Error(err)

  console.info(`Server running at ${server.info.uri}`)
})
