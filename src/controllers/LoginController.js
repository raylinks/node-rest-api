const  {User} = require('../models')
//const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const fs = require('fs');
const path = require('path');

module.exports = {
     async login(req,res){
         try{
        if(!req.body.email){
          res.status(422).json({success: false, msg: ' email Field  required'});
         }else if(!req.body.password){ 
          res.status(422).json({success: false, msg: 'your password Field required'})
         } 
       // console.log(config.authentication.jwtSecret);
        const {email, password}=  req.body;

          const user = await User.findOne({
            where: {
              email: email
            }
          })
  
          if (user){
           
          
            const isPasswordValid = await user.comparePassword(password)
           // console.log( isPasswordValid);
            if (!isPasswordValid){
            
              return res.status(403).send({
                error:' password is incorrect'
              })
            }
          }else{
            return res.status(403).send({
              error:' the login information was incorrect'
            })
          }
            const userJson = user.toJSON()
             const token2 =  "Bearer: "+ jwt.sign(user.toJSON(), CONFIG.jwtSecret,{
              expiresIn:"1h"
          });
        
        res.send({
          user: user ,
         token1:  token2
         });
     
     res.end({
          message: 'Auth Successful',
          token: token2,
          user: user
      });

      }catch(err){
        console.log(err);
             res.status(500).send({
               error:'An error has occured trying to login'   
             })
      }
   
    },
      }