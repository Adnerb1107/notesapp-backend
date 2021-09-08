// llamar al inicio para que este disponible
// en todos los archivos
require('dotenv').config()
// puede ser el require directamente
require('./mongoconfig.js')
const express = require('express')
// usando sentry
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')

// CORS
const cors = require('cors')
const logger = require('./middlewares/Loger')
const app = express()
// importamos los middlewares
const notFound = require('./middlewares/notFound')
const handleError = require('./middlewares/handleError')
// llamamos al modelo
const Note = require('./Model/Note')
// para tener acceso al body del request
app.use(cors())
app.use(express.json())
// servir estáticos
// lo que hace es servir los estaticos
// de esa carpeta como rutas
app.use('/images', express.static('img'))
// MIDLEWARE
// es una funcion que intercepta nuestra api
app.use(logger)

Sentry.init({
  dsn: 'https://cdc01793fc0942dc8a32f08b55f63673@o992480.ingest.sentry.io/5950004',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})
// get all notes
app.get('/api/notes', (req, res, next) => {
  Note.find({}).then(notes => {
    res.json(notes)
  }
  ).catch(error => next(error))
})
// get notes by id
app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  Note.findById(id).then(
    note => {
      if (note) {
        return res.json(note)
      }
      res.status(404).end()
    }
  ).catch(error => {
    next(error)
  })
})
// delete one note
app.delete('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  Note.findByIdAndDelete(id).then(result => {
    res.status(204).send({
      message: 'nota eliminada'
    })
  })
    .catch(error => next(error))
})
/// create one note
app.post('/api/notes', (req, res, next) => {
  const newNote = req.body
  // validando un poco
  if (!newNote || !newNote.content) {
    return res.status(400).json({ error: 'content mising' })
  }
  // const newId = Math.max(...notes.map(note => note.id))
  const newNoteToCreate = new Note({
    content: newNote.content,
    date: new Date().toISOString(),
    important: newNote.important || false
  })
  newNoteToCreate.save().then(
    savedNote => {
      res.status(201).json(savedNote)
    }
  ).catch(error => next(error))
})
app.put('/api/notes/:id', (req, res, next) => {
  const { id } = req.params
  const newNote = req.body
  const noteUpdated = {
    content: newNote.content,
    date: new Date().toISOString(),
    important: newNote.important || false
  }
  Note.findByIdAndUpdate(id, noteUpdated, { new: true })
    .then(result => {
      res.status(200).json(result)
    }).catch(error => next(error))
})

app.use(notFound)

app.use(Sentry.Handlers.errorHandler())

// el orden de los middlewares es muy importante
app.use(handleError)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`)
})

// CALLBACK: ES UNA FUNCION QUE
// EL PUERTO POR DEFECTO ES EL 80
// PUERTO 443 SI TIENE SSL
// DEPENDENCIAS DE PRODU:
// DEPENDENCIAS DE DESARROLLO: NODEMON, LINTER

/*
// SIN EXPRESS CON http

// commonjs
const http= require('http')
// ecmascript modules
// import http from 'http'

const app= http.createServer((request, response) => {
    response.writeHead(200,{
        'Conten-Type':'application/json'
    })
    response.end(JSON.stringify(notes))
})
const PORT  = 3002
app.listen(PORT)
console.log(`Server running on port ${PORT}`)

*/
// semantic versioning
// caret: se actualiza automaticamente patch y minor
// primer numero : major si sube es que rompe compatibilidad con anteriores
// segundo numero : minor si sube es que aumenta una funcionalidad
// tercer numero: es que se arregla un bug , hotfix
