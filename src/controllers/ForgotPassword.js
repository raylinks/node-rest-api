
const  {User} = require('../models')
//const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');
const CONFIG = require('../config/config');
const fs = require('fs');
const path = require('path');

module.exports = {
    
async forgetPassword(req,res){
    try{
      const token = Math.random().toString(36).substr(0,20);
              console.log(token);
      const {email} = req.body
      let user = await User.findOne({
          where:{
            email:email
          }
      })


      user.password_token = token;
      user.save();

      if(!user){
        res.status(400).json({
          message:" this  email does not exist",

        });
      }else{
        const transporter = nodemailer.createTransport({
          service: "raybaba.org",
          auth:{
              user: 'support@raybaba.org',
              pass: "history99"
          }
      })
      const mailOptions = {
          from: 'raymond@gmail.com',
          to: user.email,
          subject: 'forget password token',
          html:'Click this link to reset your password <a href="http://localhost:8081 /resetpassword?token='+token+'">LINK</a>'
      }
      transporter.sendMail(mailOptions,(err,info)=>{
          console.log(err);
          console.log(info);
      })
      res.json({status:'updated',email:req.body.email})
  }
    }catch(err){
        console.log(err);
    }

  },
}