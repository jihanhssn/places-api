const app=require('index')
const port = process.env.PORT | 7000

app.listen(port, () => {
  console.log('server is up on port ' + port)
})