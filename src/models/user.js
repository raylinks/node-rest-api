'use strict';
import  {TE, to} from '../../services/util.service';
import bcrypt 	from 'bcrypt';
import bcrypt_p from 'bcrypt-promise';
import {  Model} from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post),
      User.hasOne(models.Token);
    }
  };
  User.init({
    firstname     : {
      type: DataTypes.STRING,
      required: [true, 'firstname is required'],
      },
  lastname      :{
      type: DataTypes.STRING,
      required: [true, 'lastname is required'],
  },
  password  : {
    type:DataTypes.STRING,
    required: [true, 'password is required'],
    minLength:8,
},
role:{
  type: DataTypes.STRING,
  enum:['user','guide','lead-guide','admin'],
  default: 'user'
},
    email: {
      type: DataTypes.STRING,
       allowNull: true,
       unique: true, 
          validate: { 
              isEmail: {msg: "Email is  invalid."} }
          }
  }, 
  {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave(async (user, options) => {
    let err;
    if (user.changed('password')){
        let salt, hash
        [err, salt] = await to(bcrypt.genSalt(10));
        if(err) TE(err.message, true);

        [err, hash] = await to(bcrypt.hash(user.password, salt));
        if(err) TE(err.message, true);

        user.password = hash;
    }
});

User.prototype.comparePassword = function(password){
    return bcrypt.compareAsync(password, this.password)
}

User.prototype.comparePassword = async function (pw) {
    let err, pass
    if(!this.password) TE('password not set');

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if(err) TE(err);

    if(!pass) TE('invalid password');

    return this;
}

User.prototype.getJWT = function () {
  try{
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return "Bearer "+jwt.sign(user.toJSON(), CONFIG.jwtSecret, {expiresIn: expiration_time});
  }catch(err){
     console.log(err);
  }
};


User.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
};

  return User;
};