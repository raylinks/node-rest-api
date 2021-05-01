
const  {User,PasswordReset} = require('../models')
//const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');
const CheckAuth = require('../../middleware/check-auth');


    const verifyToken = async function(token){
    var reset = PasswordReset.findOne({
        where: {token: token} 
        });
        console.log(reset);
        if(!reset){
            return ("jjd");
            
        }
    }
  
module.exports = {
    async resetPassword(req,res,next){
        try{
            var user = jwt.verify(req.headers.authorization.split(' ')[1], CONFIG.jwtSecret);
            const reset = await PasswordReset.findOne({
                where: {
                    token: req.body.token
                }
            });

           if(!reset){
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

                    PasswordReset.destroy({
                        where: {email: reset.email} 
                    })
            })
         

          }else{
            res.json({status:'failed', message:"Password does not match.",})
            }
                  
            res.json({status:'success', message:"Password successfully reset.",})
        }catch(err){
          console.log(err);
        }
      },

    
}