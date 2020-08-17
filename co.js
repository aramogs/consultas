const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mailer = require('express-mailer');


app.set('views',__dirname + '/views');
app.set('view_engine', 'ejs');


app.use(express.static('public'));
app.use(express.static('node_modules'));
//Requiriendo rutas
const routes = require('./routes/routes');
const { log } = require('console');



app.use(bodyParser.urlencoded({ extended: true}));

//Declarando y adquiriendo nodesspi e informacion de usuario
app.use(function (req, res, next) {
  var nodeSSPI = require('node-sspi')
  var nodeSSPIObj = new nodeSSPI({
    retrieveGroups: true
  })
  nodeSSPIObj.authenticate(req, res, function(err){
    res.finished || next()
  })
})

app.use(routes);

app.set('port', process.env.PORT || 3010);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});
  module.exports= mailer;