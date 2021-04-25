
const  RegisterController = require('./controllers/RegisterController');
const  LoginController = require('./controllers/LoginController');


module.exports = (app) => {
// Authentication routes
app.post('/api/register/create', RegisterController.validate('register'),
RegisterController.register)

app.post('/api/auth/login', 
LoginController.login)


}
