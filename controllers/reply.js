/**
 * Created by yong.kim on 2014-09-30.
 */
var connection = require('helpers/connection.js');
var charset = 'charset=utf-8';
var content_type = 'application/json; ' + charset;

exports.index = function (req, res) {
    if (connection.isConnected()) {
        getCollection().find({}, function (error, docs) {
            res.writeHead(200, {'Content-Type' : content_type});
            res.end(JSON.stringify(docs));
        });
    }
};

exports.create = function (req, res) {
    if (connection.isConnected()) {
        var model = getCollection();
        var doc = new model({
            parentPlaceId : req.body.parentPlaceId,
            authorId : req.body.authorId,
            author : req.body.author,
            content : req.body.content,
            createdTime : new Date(),
            updatedTime : new Date()
        });
        doc.save(function (error) {
            if (!error) {
                res.writeHead(200, {'Content-Type' : content_type});
                res.end(JSON.stringify({ result : 'success' }));
            } else {
                res.writeHead(200, {'Content-Type' : content_type});
                res.end(JSON.stringify({ result : 'error' }));
            }
        });
    }
};

exports.read = function (req, res) {
    if (connection.isConnected()) {
        getCollection().find({ _id : req.params.id }, function (error, docs) {
            if (error) return console.error(error);
            res.writeHead(200, {'Content-Type' : content_type});
            res.end(JSON.stringify(docs));
        });
    }
};

exports.delete = function (req, res) {
    if (connection.isConnected()) {
        getCollection().remove({ _id : req.params.id }, function (error){
            if (error) return console.error(error);
            res.writeHead(200, {'Content-Type' : content_type});
            res.end(JSON.stringify({ result : 'success' }));
        });
    }
};

function getCollection() {
    return connection.getModel('reply');
};