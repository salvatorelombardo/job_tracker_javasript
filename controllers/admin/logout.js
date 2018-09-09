"use strict";
var bcrypt = require('bcrypt'),
    queries = require('../../modules/Queries'),
    validate = require('../../modules/Validation');

module.exports = {


    logout: function (req, res) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {

                res.redirect('/');
            }
        });
    }

}