const express = require('express');
const cors = require('cors');
//const router = express.Router();
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { sequelize } = require('./models/index');
const  expressValidator = require('express-validator');
const config =require('./config/config');
const jwt = require('jsonwebtoken');
const app = express();
const server = http.createServer(app);


app.use(morgan('combined'));
//app.use(pg());
//app.use(expressValidator());
app.use(bodyParser.json());
app.use(cors());

require('./routes')(app)


sequelize.sync()
    .then(() => {
      //  console.log(config.port);
        server.listen(config.port)
        console.log(` Server started at ${config.port}`)
});
