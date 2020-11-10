// const Sequelize = require('sequelize')
// const connection = require('../db/sequelize')
// const Comments = require('./comments')

module.exports=function(sequelize,DataTypes){
const Places = sequelize.define('places', {
    place_id:{
        type:DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    image: {
        type:DataTypes.STRING,
    }
},{
    timestamps:false,
    
})

Places.associate = function (models) {
    Places.hasMany(models.comments, {
      foreignKey: 'place_id',
      onDelete:'cascade',
      foreignKeyConstraint: true
    });
  }

// Places.prototype.toJSON = function () {                                   //every time that a JSON operation happen,like sending user back to client
//     const place = this
//     const placeObject = place
//     // placeObject.image = undefined                               //to reduce the json data size
//     return placeObject.dataValues
// }

return Places
}

