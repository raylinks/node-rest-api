import  {  forbidden } from '../Response/index';

// GRANT ACCESS TO  PROTECTED ROUTES
req.user =  currentUser;
next();

//roles and permission 
exports.restrictTo =  (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){

             return forbidden(res, 'you do not have permision to  perform this action')
        };
        next();
    }

} 