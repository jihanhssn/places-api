const express = require('express')

const connection = require('./db/sequelize')
const placesRouter = require('./routes/places')
const commentsRouter = require('./routes/comments')

const app = express()
const port = process.env.PORT | 7000


app.use(express.json())
app.use(placesRouter)
app.use(commentsRouter)

connection.sync().then(() => {
  console.log("Drop and re-sync db.");
}).catch((e) => {
  console.log(e)
});


app.listen(port, () => {
  console.log('server is up on port ' + port)
})
