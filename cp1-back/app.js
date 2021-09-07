const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.listen(process.env.PORT||3001)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Cors
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//Rotas
const index = require('./src/routes');
app.use('/', index);

module.exports = app;