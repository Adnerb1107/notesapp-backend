const express = require('express')
// CORS
const cors = require('cors')
const logger = require('./middlewares/Loger')
const app = express()
// para tener acceso al body del request
app.use(cors())
app.use(express.json())
// MIDLEWARE
// es una funcion que intercepta nuestra api
app.use(logger)

let notes = [
  {
    id: 1,
    content: 'HTML is easy only if yor understand concepts very well',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})
// get all notes
app.get('/api/notes', (req, res) => {
  res.json(notes)
})
// get notes by id
app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(nota => nota.id === id)
  if (!note) {
    res.status(404).send({
      message: 'Nota no existente'
    })
  }
  res.send(note)
})
// delete one note
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(nota => nota.id !== id)
  res.status(204).end()
})
/// create one note
app.post('/api/notes', (req, res) => {
  const newNote = req.body
  // validando un poco
  if (!newNote || !newNote.content) {
    return res.status(400).json({ error: 'content mising' })
  }
  const newId = Math.max(...notes.map(note => note.id))
  const noteToCreate = {
    id: newId + 1,
    content: newNote.content,
    date: new Date().toISOString(),
    important: newNote.important || false
  }
  notes = [...notes, noteToCreate]
  res.status(201).json(noteToCreate)
})
app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const newNote = req.body
  // validando un poco
  if (!newNote || !newNote.content) {
    return res.status(400).json({ error: 'content mising' })
  }
  const noteToCreate = {
    id: id,
    content: newNote.content,
    date: new Date().toISOString(),
    important: newNote.important || false
  }
  notes = notes.map(nota => nota.id === id ? noteToCreate : nota)
  res.status(202).json(noteToCreate)
})
app.use((req, res) => {
  res.status(404).json({
    error: 'page not found'
  })
})
const PORT = 3001
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
