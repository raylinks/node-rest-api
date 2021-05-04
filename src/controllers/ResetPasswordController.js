
import  {User,PasswordReset} from '../models'
//import uuidv1 from 'uuid/v1'
import jwt from 'jsonwebtoken';
import CONFIG from '../config/config';
import fs from 'fs';
import bcrypt from 'bcrypt';
import path from 'path';
import moment from 'moment';
import CheckAuth from '../../middleware/check-auth';
import  { success, created, serverError } from '../Response/index';



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
            return created(res, 'Password does not match.', user)
   
            }
                  
            res.json({status:'success', message:"Password successfully reset.",})
        }catch(err){
          console.log(err);
        }
      },

      verifyToken(token){
        const reset =  PasswordReset.findOne({
            where: {
                token: token
            }
        });
       
        reset && moment(reset.createdAt).startOf(1).fromNow() ? reset : null
      }

}