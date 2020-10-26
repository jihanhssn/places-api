const Sequelize=require('sequelize')
const connection=new Sequelize('places_api','root','jihanabadi@1996',{
    dialect:'mysql'
})

connection
    .authenticate()
    .then(()=>{
        console.log('connection has been established successfully!')
    })
    .catch((err)=>{
        console.log('unable to connect to database',err)
    })

module.exports=connection