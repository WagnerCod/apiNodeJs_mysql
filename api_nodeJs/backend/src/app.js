const express = require('express');
const router = require('./router');
const cors = require( 'cors' );
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(router);
module.exports = app;