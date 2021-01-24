const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
var swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
require('./routes/index')(app);

// habilitar todos los metodos para el CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});
//Endpoint para el swagger
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
module.exports = server
// wrap express app instance with serverless http function
module.exports.handler = serverless(app)
