const express = require('express');
const router = require('./router');
const cors = require( 'cors' );
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({ limit: '50mb' })); //para poder salvar string como base 64
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);
module.exports = app;