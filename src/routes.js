
const  RegisterController = require('./controllers/RegisterController');
const  LoginController = require('./controllers/LoginController');
const  ForgotPasswordController = require('./controllers/ForgotPasswordController');


module.exports = (app) => {
// Authentication routes
app.post('/register/create', RegisterController.validate('register'),
RegisterController.register)

app.post('/auth/login', 
LoginController.login)

app.post('/auth/forgot-password', 
ForgotPasswordController.forgetPassword)


}
