
const  {User} = require('../models')
//const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const fs = require('fs');
const path = require('path');

module.exports = {
    async resetPassword(req,res){
        try{
            var user = jwt.verify(req.headers.authorization.split(' ')[1], CONFIG.jwtSecret);
     
          if(req.body.password === req.body.confirm_password){
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                user.password = hash
                user.password_token = null
                user.save();
            })
          }else{
            res.json({status:'failed',email:req.body.email})
            }
                  
        }catch(err){
          console.log(err);
        }
      },
}