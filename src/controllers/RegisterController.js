const  {User} = require('../models')
const fs = require('fs');
const path = require('path');
const {body} = require('express-validator');
const {validationResult} = require('express-validator');
//const { check, validationResult } = require('express-validator');


module.exports = {
     async register(req,res, next){
         try{
           const errors = validationResult(req);
           if(!errors.isEmpty()){
             res.status(422).json({errors:errors.array()});
             return;
           }

            const user = await User.create(req.body);
            
    
            return res.status(201).json({
                data:user,
            
                message:"Registration is Successful"
               });
             
          }catch(errors){
            console.log(errors);
                 //res.status(400).send({
                   //error:' this email address is already in use'  
           //  })
          }
        },

         validate(method)  {
          switch(method){
            case 'register':{
              return[
                body('firstname','firstname doesnot exist in our database').exists().isLength({ min: 5}) ,
                body('lastname','lastname doesnot exist in our database').exists().isLength({ min: 5}) ,
                body('email','this email does not exist').exists().isEmail(),
               // body('phone','this phone does not exist').exists().isInt(),
                body('status').isIn(['active','inactive'])
              ]
            }
          }
        }


    }
     
