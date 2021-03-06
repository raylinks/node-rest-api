
import  {User, PasswordReset} from '../models'
import CONFIG from '../config/config'
import nodemailer from 'nodemailer'
import  { success, created, serverError }  from '../Response/index'

module.exports = {
    
async forgetPassword(req,res){
    try{
     

      const token = Math.random().toString(36).substr(0,20);
          
      const {email} = req.body
      let user = await User.findOne({
          where:{
            email:email
          }
      });
      if(!user){
        res.status(400).json({
          message:"Your account could not be found.",
        });
        
      }else{
        req.body.email = user.email;
        req.body.token = token;
       const token_data = PasswordReset.create(req.body)


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
  
      })
      return created(res, 'An email has been sent to the provided email address. Please check and follow the instructions', user)
  }
    }catch(error){
      return serverError(res, 'Server Error', error.message)
    
    }

  },


}