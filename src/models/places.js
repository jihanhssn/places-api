const Sequelize=require('sequelize')
const connection=require('../db/sequelize')

const Places=connection.define('places',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    image:{
        type:Sequelize.BLOB('long')
    }
})

Places.prototype.toJSON= function(){                                   //every time that a JSON operation happen,like sending user back to client
    const place=this 
    const placeObject=place                                  
    placeObject.image=undefined                               //to reduce the json data size
    return placeObject.dataValues 
}


module.exports=Places