"use strict";
module.exports = {
    index: function (req, res) {
        /*  CHECKS IF THE SESSION WITH SUCCESS IT PRESENT IF SO THEN PROCEED TO HOME PAGE OTHERWISE REDIRECT BACK TO LOGIN.  THIS WAY YOU CANNOT ACCESS ANY PAGES IN THE APPLICATION WITHOUT FIRST SUCCESSFULLY LOGINING IN*/
        if (req.session.success) {
            res.render('admin/home', {
                title: "home",
                heading: "Home",
                nav: true
            });
        } else {
            res.render('admin/login', {
                title: "login",
                heading: "Login",
                scripts: [{
                    'script': 'Util.js'
                }, {
                    'script': 'login.js'
                }]
            });
        }

    },
};