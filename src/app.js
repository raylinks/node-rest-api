import express from 'express';
import cors from 'cors';
//const router = express.Router();
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { sequelize } from './models/index';
import  expressValidator from 'express-validator';
import config from './config/config';
import jwt from  'jsonwebtoken';

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
