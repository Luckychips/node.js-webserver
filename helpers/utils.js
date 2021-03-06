/**
 * Created by sungjin.kim on 2014-10-06.
 */
Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString();
    var dd  = this.getDate().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]);
};

exports.dateToYyyymmdd = function() {
    var date = new Date();
    return date.yyyymmdd();
};