var mysql = require('mysql');
var conn = require('../model/db');
var conn_obj = conn.db();

/* I WROTE THIS MODEL TO CREATE A CONNECTION SCRIPT TO THE DATABASE THAT COULD EASILY BE CHANGED OR EXPANDED.  EVERY CONTROLLER THAT NEEDS A DATABASE CONNECTION CAN USE THIS.*/
exports.connect = function(){
	var pool = mysql.createPool(conn_obj);
	return pool;
};
