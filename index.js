//starting point of our app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB setup
mongoose.connect('mongodb://localhost:auth/auth');

//App setup
app.use(morgan('combined')); //login incoming request
app.use(bodyParser.json({ type:'*/*' }));
router(app);

//Server Setup
const port = process.env.PORT || 8888;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on:', port);
