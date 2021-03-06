import  {User}  from '../models'
import  {Token}  from '../models'
import {body}  from 'express-validator';
import {validationResult}  from 'express-validator';
import  { created } from '../Response/index';
import nodemailer from 'nodemailer';

const sendConfirmMail = async function(req,res,user,tok){
  try{
    console.log(data.email);
  var transporter = nodemailer.createTransport({ 
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: { 
      user: "c33fa1ba195c5b", 
      pass: "be63060ae9251a"
               } 
    });
    const mailOptions = { 
  from: 'no-reply@yourwebapplication.com', 
  to: user.email, 
  subject: 'Account Verification Token', 
text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user' + '\/confirmation\/' + tok.tok + '.\n' };
transporter.sendMail(mailOptions, function (err) { 
    if(err){
        return res.status(500).json({ 
            msg: err.message 
        });
    }else{
        return created(res, 'A verification email has been sent to ' + user.email + '.');
    }
    }); 
    // transporter.sendMail ends

  }catch(err){
    console.log(err);
  }
}

module.exports = {
     async register(req,res, next){
         try{
           const errors = validationResult(req);
           if(!errors.isEmpty()){
             res.status(422).json({errors:errors.array()});
             return;
           }

            const user = await User.create(req.body);
            //create token
            const tok = Math.random().toString(36).substr(0,20);
             req.body['userToken'] = tok;
             req.body['UserId'] = user.id;
      
             var createToken = await Token.create(req.body,);
            //send eamil
            var transporter = nodemailer.createTransport({ 
              host: "smtp.mailtrap.io",
              port: 2525,
              auth: { 
                  user: "c33fa1ba195c5b", 
                  pass: "be63060ae9251a"
                         } 
              });
              const mailOptions = { 
            from: 'no-reply@yourwebapplication.com', 
            to: user.email, 
            subject: 'Account Verification Token', 
          text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/verify-email'  + '?' + createToken.userToken + '.\n' };
          transporter.sendMail(mailOptions, function (err) { 
              if(err){
                  return res.status(500).json({ 
                      msg: err.message 
                  });
              }else{
                 return res.status(201).json({
                data:user,
          
                message:'A verification email has been sent to ' + user.email + '.'
              });
                 
              }
               });
          
    
             
          }catch(errors){
            console.log(errors);
          }
        },

         validate(method)  {
          switch(method){
            case 'register':{
              return[
                body('firstname','firstname cannot be null').isLength({ min: 3}) ,
                body('lastname','lastname cannot be null').isLength({ min: 3}) ,
                body('email','this email cannot be null ').exists().isEmail(),
               
              ]
            }
          }
        }


    }
     
