/**
 * Created by dongs on 2017. 5. 1..
 */
var mongoose = require("mongoose");

module.exports = function() {
    var db = mongoose.connect("mongodb://csets.xyz/vote");

    require('../models/solutions.js');
    require('../models/candidate.js');

    return db;
}
