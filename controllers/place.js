/**
 * Created by sungjin.kim on 2014-09-30.
 */
var fs = require('fs');
var connection = require('helpers/connection.js');
var charset = 'charset=utf-8';
var content_type = 'application/json; ' + charset;
var collection_name = 'hotplace';

exports.index = function (req, res) {
    if (connection.isConnected()) {
        connection.getModel(collection_name).find({}, function (err, docs) {
//            res.writeHead(200, {"Content-Type" : content_type});
//            res.end(JSON.stringify(docs));
//            console.log(docs);
            res.render('../views/index', {'places' : docs});
        });
    }
};

exports.create = function (req, res) {
    if (connection.isConnected()) {
        var model = connection.getModel(collection_name);
        var data = model({
            name : req.body.name,
            location : req.body.location,
            type : req.body.type,
            description : req.body.description,
            likeCount : req.body.likeCount,
            likePushIds : req.body.likePushIds,
            createdTime : new Date(),
            updatedTime : new Date(),
            image : {
                data : fs.readFileSync(req.body.image),
                contentType : 'image/jpg'
            }
        });

        data.save(function (err) {
            if (!err) {
                res.writeHead(200, {"Content-Type" : content_type});
                res.end(JSON.stringify({ result : 'success' }));
            } else {
                res.writeHead(200, {"Content-Type" : content_type});
                res.end(JSON.stringify({ result : 'error' }));
            }
        });
    }
};

exports.read = function (req, res) {
    if (connection.isConnected()) {
        connection.getModel(collection_name).find({ _id : req.params.id }, function (err, docs) {
            res.writeHead(200, {"Content-Type" : content_type});
            res.end(JSON.stringify(docs));
        });
    }
};

exports.update = function (req, res) {
    if (connection.isConnected()) {
        var data = null;
        if (req.params.id) {

        }
        // add update logic
        var isUpdated = false;

        if (req.body.name) {
            isUpdated = true;
        }

        if (req.body.location) {
            isUpdated = true;
        }

        if (req.body.type) {
            isUpdated = true;
        }

        if (req.body.description) {
            isUpdated = true;
        }

        if (isUpdated) {
            var date = new Date();
        }

        res.end();
    }
};

exports.delete = function (req, res) {
    if (connection.isConnected()) {
        connection.getModel(collection_name).remove({ _id : req.params.id }, function() {
            res.writeHead(200, {"Content-Type" : content_type});
            res.end(JSON.stringify({ result : 'success' }));
        });
    }
};