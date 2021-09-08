const mongoose = require('mongoose')
const { Schema, model } = mongoose

const noteSchema = Schema({
  content: String,
  important: Boolean,
  date: Date
})
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', noteSchema)

module.exports = Note
