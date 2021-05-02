
const  {User,PasswordReset} = require('../models')
//const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const moment = require('moment');
const CheckAuth = require('../../middleware/check-auth');


module.exports = {
    async resetPassword(req,res,next){
        try{
            var user = jwt.verify(req.headers.authorization.split(' ')[1], CONFIG.jwtSecret);
            const reset = await PasswordReset.findOne({
                where: {
                    token: req.body.token
                }
            });
            var time = moment().startOf(1).fromNow(); 
           if(!reset.created_at.time ? reset : null){

            res.status(400).send({
                error:'Invalid token or expired token'  
         })
           }

           $user = User.findOne({where: {email: reset.email} });
           console.log(user);

         bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            console.log(isMatch);
        
        });
      
        
     
          if(req.body.password === req.body.confirm_password){
              //update
             

            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                const update =  User.update({
                    where: {password: hash} 
                    });

                  const deleteToken =   PasswordReset.update({
                        where: {email: reset.email} 
                    },{token: null})
                    deleteToken.token = null;
        
            })
         

          }else{
            res.json({status:'failed', message:"Password does not match.",})
            }
                  
            res.json({status:'success', message:"Password successfully reset.",})
        }catch(err){
          console.log(err);
        }
      },

      verifyToken(token){
        const reset = await PasswordReset.findOne({
            where: {
                token: token
            }
        });
       
        reset && moment(reset.createdAt).startOf(1).fromNow() ? reset : null
      }

}