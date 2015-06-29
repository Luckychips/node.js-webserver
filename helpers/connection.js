/**
 * Created by sungjin.kim on 2014-09-30.
 */
var mongoose = require('mongoose');
var properties = require('./properties.js');
mongoose.connect('mongodb://' + properties.dbuser + ':' + properties.dbpwd + '@' + properties.dbpath + ':27017/' + properties.dbname);
var db = mongoose.connection;

exports.isConnected = function () {
    if (db.readyState  == 1)
        return true;
    else
        return false;
};

exports.close = function () {
    db.close();
};

var Schema = mongoose.Schema;
mongoose.model('hotplace', new Schema({
    name : { type : String, required : true },
    location : { type : String, required : true },
    type : { type : String, required : true },
    description : { type : String, required : false },
//    image : { type : String, required : false },
    image : { data : Buffer, contentType: String },
    likeCount : { type : Number, required : false },
    likePushIds : { type : Array, required : false },
    createdTime : { type : Date, required : true },
    updatedTime : { type : Date, required : true }
}));

mongoose.model('reply', new Schema({
    parentPlaceId : { type : String, required : true },
    authorId : { type : String, required : true },
    author : { type : String, required : true },
    content : { type : String, required : true },
    createdTime : { type : Date, required : true },
    updatedTime : { type : Date, required : true }
}));

mongoose.model('image', new Schema({
    parentPlaceId : { type : String, required : true },
    binaryData : { data: Buffer, contentType: String },
    authorId : { type : String, required : true },
    author : { type : String, required : true },
    createdTime : { type : Date, required : true }
}));

exports.getModel = function (name) {
    return db.model(name);
};