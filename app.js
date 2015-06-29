/**
 * Created by sungjin.kim on 2014-09-21.
 */
//add express & external modules
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var morgan = require('morgan');

//add custom modules
require('app-module-path').addPath(__dirname + '/');
var place_route = require('controllers/place.js');
var reply_route = require('controllers/reply.js');
var utils = require('helpers/utils.js');

var app = express();
var stream = fs.createWriteStream(__dirname + '/logs/' + utils.dateToYyyymmdd() + '.log', {flags: 'a'});
var logger = morgan('combined', {
    stream : stream,
    skip : function (req, res) { return res.statusCode < 400; }
});

//setting config
app.set('port', process.env.PORT || 3030);
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(logger);

//mapping url's
app.get('/', place_route.index);
app.post('/place/create', place_route.create);

app.route('/place/:id')
    .get(place_route.read)
    .put(place_route.update)
    .delete(place_route.delete);

app.get('/reply', reply_route.index);
app.post('/reply/create', reply_route.create);

app.route('/reply/:id')
    .get(reply_route.read)
    .delete(reply_route.delete);

app.listen(app.get('port'));