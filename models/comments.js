// const Sequelize = require('sequelize')
// const db = require('./index')
// const connection=db.sequelize
module.exports=function(sequelize,DataTypes){
const Comments = sequelize.define('comments', {
    comment_id:{
        type:DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    place_id: {
        allowNull: false,
        type: DataTypes.INTEGER(11)
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps:false,
    
})


// Comments.associate=function(models){
//     Comments.belongsTo(models.places,{
//         foreignKey: 'place_id'
//     })
// }
return Comments
}

