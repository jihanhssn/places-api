const express = require('express')
const db=require('./models/index')
const connection = db.sequelize
const placesRouter = require('./routes/places')
const commentsRouter = require('./routes/comments')
const dotenv  = require('dotenv');
dotenv.config();
const app = express()
const port = process.env.SERVER_PORT

app.use(express.json())
app.use(placesRouter)
app.use(commentsRouter)

// connection.sync().then(() => {
//   // console.log("Drop and re-sync db.");
// }).catch((e) => {
//   // console.log(e)
// });


app.listen(port, () => {
  console.log('server is up on port ' + port)
})
 module.exports=app