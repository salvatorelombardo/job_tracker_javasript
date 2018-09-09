"use strict";
var bcrypt = require('bcrypt'),
    queries = require('../../modules/Queries'),
    validate = require('../../modules/Validation');

module.exports = {
    index: function (req, res) {
        res.render('admin/login', {
            title: "login",
            heading: "Login",
            scripts: [{
                'script': 'Util.js'
            }, {
                'script': 'login.js'
            }]
        });
    },

    /* THE LOGIN OPERATIONS RETURN A MASTERSTATUS AND MESSAGE FOR EACH POSSIBLE RESPONSE.  THIS ALLOWS US TO CUSTOMIZE WHAT MESSAGE GET RETURNED TO THE CLIENT.  EVERYTHING IS DONE USING JSON. */
    login: function (req, res) {
        var data = JSON.parse(req.body.data);

        /* VALIDATES THE EMAIL AND PASSWORD TO MAKE SURE THEY ARE CORRECT FORMAT */
        if (!validate.validate(data.email, "email") || !validate.validate(data.password, "password")) {
            data.masterstatus = "badlogin";
            data.msg = "Incorrect format for username and/or password."
            res.send(JSON.stringify(data));
            /* IF THE ENTRIES DO NOT VALIDATE THEN TERMINATE THE FUNCTION USING THE RESULT SO NO OTHER ACTIONS ARE PERFORMED */
            return;
        }

        /* IF YOU WANTED TO CREATE A HASHED PASSWORD YOU COULD USE THIS BCRYPT METHOD TO CREATE THE HASH.  JUST ENTER THE PASSWORD IN THE FIRST PARAMETER AND IT WILL OUTPUT A HASH.  I USED THIS TO CREATE THE HASH FOR THE WORD "PASSWORD"
        bcrypt.hash("password", 10, function(err, hash) {
            console.log(hash);
        });*/

        /* FIRST CHECK TO SEE IF PASSWORD IS THERE, THEN CHECK TO SEE IF THE CORRECT PASSWORD WAS ENTERED.  DEPENDING ON CIRCUMSTANCE RETURN APPROPRIATE MESSAGE. */
        var sql = "SELECT password FROM admin WHERE email=?";
        var inserts = [data.email];
        queries.bindedSelect(sql, inserts, function (err, result) {
            if (err) {
                data.masterstatus = "err";
                /* YOU COULD ALSO HAVE THE ERROR MESSAGE RETURNED IN THE CALLBACK STORED TO FILE OR EMAILED TO TECHINICAL SUPPORT */
                data.msg = "There is an error with the login process.";
                res.send(JSON.stringify(data));
            } else {
                if (result.length === 0) {
                    data.masterstatus = "notfound";
                    data.msg = "There is no record with that username and password"
                    res.send(JSON.stringify(data));
                } else {
                    bcrypt.compare(data.password, result[0].password, function (err, ret) {
                        if (ret) {
                            req.session.regenerate(function (err) {
                                if (err) {
                                    data.masterstatus = "err";
                                    data.msg = "There is an error with the login process.";
                                    res.send(JSON.stringify(data));
                                }
                                /* IF SUCCESSFUL LOGIN CREATE SESSION SUCCESS PROPERTY */
                                else {
                                    req.session.success = 'access approved';
                                    data.masterstatus = "success";
                                    res.send(JSON.stringify(data));
                                }
                            });
                        } else {
                            data.masterstatus = "notfound";
                            data.msg = "There is no record with that username and password.";
                            res.send(JSON.stringify(data));
                        }

                    });
                }
            }
        });
    }
}