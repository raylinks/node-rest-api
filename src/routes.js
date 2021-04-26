
const  RegisterController = require('./controllers/RegisterController');
const  LoginController = require('./controllers/LoginController');
const  ForgotPasswordController = require('./controllers/ForgotPasswordController');
const  ResetPasswordController = require('./controllers/ResetPasswordController');
const  PostController = require('./controllers/PostController');


module.exports = (app) => {
// Authentication routes
app.post('/register/create', RegisterController.validate('register'),
RegisterController.register)

app.post('/auth/login', 
LoginController.login)

app.post('/auth/forgot-password', 
ForgotPasswordController.forgetPassword)

app.post('/auth/reset-password', 
ResetPasswordController.resetPassword)

app.post('/auth/posts', 
PostController.index)

app.post('/auth/posts/create', 
PostController.create)


}
