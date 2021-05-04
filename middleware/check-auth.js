import  jwt from 'jsonwebtoken';


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, CONFIG.jwtSecret);  
        req.userData = decoded;
        next(); 
    } catch (err) {
        return res.status(401).json({
            message: 'Not Allowed/ You are not autorized'
        });
    }
     
};