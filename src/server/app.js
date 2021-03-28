const express = require('express')
require('./db/mongoose')
var cors = require('cors')


var createError = require('http-errors');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');

const userRouters = require('./routers/userRouters')
const roomsRouters =  require('./routers/roomsRouters')



const app = express()
const expressSwagger = require('express-swagger-generator')(app);

// Define CORS features in App
app.use(cors())

/*app.use((req, res, next) => {
    console.log('Do something !!' + req.method + req.path)

    next()
})*/
//console.log("Dir Val" + __dirname)
//console.log(path.join(__dirname, '../../dist/auth-complete'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../dist/public')));



//Router
app.use('/api/v1',userRouters)
app.use('/api/v1',roomsRouters)

//Swagger config
let options = {
  swaggerDefinition: {
    info: {
      description: 'The Food Store End Point Service',
      title: 'Swagger',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/v1',
    produces: [
      "application/json",
      "application/xml"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./routers/*.js', './models/*.js'] //Path to the API handle folder
};
expressSwagger(options)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

module.exports = app
