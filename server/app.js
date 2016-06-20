var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/node_sql_assessment';

var number = require('../modules/random.js');

app.listen( 3000, 'localhost', function(req, res){
    console.log('server listening on port 3000');
});

app.use(express.static('public'));

app.get('/', function(req, res){
  console.log('base url');
  res.sendFile(path.resolve( 'views/index.html'));
});

app.post('/addAnimal', urlencodedParser, function(req, res){
  console.log(req.body.animal);
  console.log(number(1, 100));
  pg.connect(connectionString, function(err, client, done){
    client.query('INSERT INTO users (animal, number, created) VALUES ($1, $2, $3)', [req.body.animal, number(1, 100), 'now()']);
    done();
  });
  res.end();
});

app.get('/getAnimal', function(req, res){
  console.log('in get');
  var results = [];
  pg.connect(connectionString, function(err, client, done){
    // selects list items
    var animal = client.query('SELECT * FROM users');
    var rows = 0;
    animal.on('row', function(row){
      results.push(row);
    });
    animal.on('end', function(){
      return res.json(results);
    });
  });
});
