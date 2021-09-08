const mongoose = require('mongoose')
const connectionString = process.env.MONGO_DB_URI

mongoose.connect(connectionString)
  .then(res => {
    console.log('Database connected')
  })
  .catch(err => {
    console.log('error happend', err)
  })

process.on('uncaughtException', () => {
  mongoose.connection.close()
})

/*
// VIendo como funciona mongodb
  Note.find({}).then(result => {
  console.log(result)
  mongoose.connection.close()
}).catch(err => {
  console.log('error happend', err)
}

)
const nota1 = new Note({
  content: 'HOla brenda Nahomi',
  important: true,
  date: new Date()
})
nota1.save()
  // se tiene que devolver promesa para verificar
  // que no exista error
  .then(result => {
    console.log(result)
    // buena practica cerrar la conexion
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  })
 */
