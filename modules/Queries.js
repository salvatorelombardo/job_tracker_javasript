"use strict";
/* THIS MODULE ALLOWS ONE TO RUN QUERIES USING THE FUNCTIONS AND AVOID WRITING ALL THE CODE EACH TIME A QUERY IS NEEDED.  BINDED OTHER DOES UPDATE, DELETE, AND INSERT QUERIES THAT BIND INPUT BECAUSE A USER MAY BE ENTERING IT.  BINDED SELECT DOES SELECT QUERIES ONLY THAT ARE BINDED.  THE NOTBINDED ONES DO NOT NEED TO BE BINDED AS THE QUERY IS NOT DEPENDENT ON USER INPUT */
var db = require('./Conn'),
    mysql = require('mysql'),
    pool = db.connect();

module.exports = {
    bindedOther: function (sql, inserts, cb) {
        pool.getConnection(function (err, connection) {
            sql = mysql.format(sql, inserts);
            connection.query(sql, function (error, results, fields) {
                if (err) {
                    cb(err, null)
                } else {
                    cb(null, true);
                }
                connection.release();
            });
        });
    },
    notBindedOther: function (sql, cb) {
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (error, results, fields) {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, true);
                }
                connection.release();
            });
        });
    },
    bindedSelect: function (sql, inserts, cb) {
        // console.log(sql);
        // console.log(inserts);
        pool.getConnection(function (err, connection) {
            sql = mysql.format(sql, inserts);
            connection.query(sql, function (error, results, fields) {

                // console.log(sql);
                // console.log(results);

                if (err) {
                    cb(err, null);
                } else {
                    cb(null, results);
                }
                connection.release();
            });
        });

    },
    notBindedSelect: function (sql, cb) {
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (error, results, fields) {
                if (err) {
                    cb(err, null);
                } else {
                    cb(null, results);
                }
                connection.release();
            });
        });
    }
}