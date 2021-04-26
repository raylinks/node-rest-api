const  {Post} = require('../models')
const fs = require('fs');
const path = require('path');
const {body} = require('express-validator');
const {validationResult} = require('express-validator');
const ars = require('arslugify')
const  multer = require('multer');


module.exports = {
    async index(req,res){
        try{
            var user = jwt.verify(req.headers.authorization.split(' ')[1], CONFIG.jwtSecret);

            const posts = await Post.findAll();
         
        res.status(200).json(card);
        }catch(err){
            console.log(err);
        }
   },

     async create(req,res, next){
         try{

            const myFile = req.file;
            console.log(myFile);
         const imageUrl = await gcsUpload(myFile)
        req.body['slug'] = ars(title);
       req.body['picture'] = myFile.originalname
           const errors = validationResult(req);
           if(!errors.isEmpty()){
             res.status(422).json({errors:errors.array()});
             return;
           }
     

            const user = await Post.create(req.body);
            
    
            return res.status(201).json({
                data:user,
            
                message:"Post created  Successfully"
               });
             
          }catch(errors){
                 res.status(400).send({
                   error:' this email address is already in use'  
            })
          }
        },

         validate(method)  {
          switch(method){
            case 'register':{
              return[
                body('title','firstname doesnot exist in our database').exists().isLength({ min: 5}) ,
                body('content','lastname doesnot exist in our database').exists().isLength({ min: 5}) ,
               // body('phone','this phone does not exist').exists().isInt(),
                body('status').isIn(['active','inactive'])
              ]
            }
          }
        },

        async show(req,res){
            try{
                const post = await Post.findOne({
                   where: {slug: req.params.slug} 
                   });
                console.log(post);
            }catch(err){
                console.log(err);
            }
       },

       async edit(req,res){
        try{
            const post = await Post.update({
               where: {slug: req.params.slug} 
               });
            console.log(post);
        }catch(err){
            console.log(err);
        }
   },

   async delete(req,res){
    try{
        const post = await Post.destroy({
           where: {slug: req.params.slug} 
           });
        console.log(post);
    }catch(err){
        console.log(err);
    }
},
    }
     
