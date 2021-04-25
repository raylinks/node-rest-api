module.exports = (sequelize, DataTypes)=>{
    var token  = sequelize.define('Token',{
        userToken: DataTypes.STRING
    });


    token.associate = function(models){
        token.belongsTo(models.User)
      

    };
    
   
    return token;
}

