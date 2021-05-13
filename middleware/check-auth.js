import  jwt from 'jsonwebtoken';
import  { notFound }  from '../Response/index'


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, CONFIG.jwtSecret);  
        req.userData = decoded;
        next(); 
    } catch (err) {
        return notFound(res, 'Token expired.', user)
    }
     
};