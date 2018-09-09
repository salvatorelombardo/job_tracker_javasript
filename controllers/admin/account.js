"use strict";
var validate = require('../../modules/validation'),
    queries = require('../../modules/Queries'),
    general = require('../../modules/General'),
    fs = require('fs');
module.exports = {
    addAccountForm: function (req, res) {
        /*  CHECKS IF THE SESSION WITH SUCCESS IT PRESENT IF SO THEN PROCEED TO HOME PAGE OTHERWISE REDIRECT BACK TO LOGIN.  THIS WAY YOU CANNOT ACCESS ANY PAGES IN THE APPLICATION WITHOUT FIRST SUCCESSFULLY LOGINING IN*/

        /* ALL THIS FUNCTION DOES IS LOAD THE ADDACCOUNT FORM AND THE REQUIRED JAVASCRIPT FILES */
        if (req.session.success) {
            res.render('partials/accounts/addaccount', {
                title: "Add Account",
                heading: "Add Account",
                nav: true,
                scripts: [{
                    'script': 'Util.js'
                }, {
                    'script': 'General.js'
                }, {
                    'script': 'account1.js'
                }]
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

    /* ALL THIS FUNCTION DOES IS LOAD THE DROPDOWN BOX FOR THE UPDATE ACCOUNT FORM.  IT CALLS THE ACCOUNTLIST METHOD FROM THE 
    GENERAL MODULE.  THE ACCOUNT LIST METHOD RETURNS A LIST OF ALL ACCOUNTS AND IDS IN A SELECT BOX (DROP DOWN BOX) FORMAT.
    NOTICE HOW I RENDER THE FROM AFTER I GET THE DATA RETURNED FROM THE GENERAL.ACCOUNTLIST METHOD.  THE DATA IS A STRING RETURNED
    AS LIST AND ADDED AS THE VALUE OF THE ACCOUNTSELECT PROPERTY.
    */
    updateAccountForm: function (req, res) {
        if (req.session.success) {
            general.accountlist(function (list) {
                res.render('partials/accounts/updateaccount', {
                    title: "Add Account",
                    heading: "Add Account",
                    nav: true,
                    accountselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'account1.js'
                    }]
                });
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


    addUpdateAccount: function (req, res) {
        var data = req.body.data,
            i = 0,
            error = false,
            values = [],
            path, sql = "",
            foldername;
        data = JSON.parse(data);


        /* HERE WE ARE CHECKING THE DUPLICATES FIRST THEN WE ARE CALLING THE ADDUPDATE PROCESS ON A SUCCESSFULL CALLBACK. */
        general.checkDuplicates(data.elements, data.flag, data.acctId, function (err, result) {
            if (err) {
                data = {
                    masterstatus: "err",
                    msg: "There is an error processing this request."
                }
                JSON.stringify(data);
                res.send(data);
            } else if (result === 'match') {
                data.masterstatus = 'duplicate';
                data = JSON.stringify(data);
                res.send(data);
            } else {
                console.log(" account 81 " + ` + ` + values + ` + ` + result);
                addUpdateAccountProc(res, data);
            }
        });
    },


    getAccount: function (req, res) {
        var sql, values, form;
        sql = "SELECT * FROM account WHERE id = ?";
        values = [req.body.data];
        // console.log(values);
        // return

        queries.bindedSelect(sql, values, function (err, result) {

            if (err) {
                res.send("<p>There was an error getting that account</p>");
            } else {
                /* I USED THE ECMA6 TEMPLATE STRING TO DO THIS */
                form = `<div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" placeholder="Enter account name" value="${result[0].name}">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="address">Address</label>
                            <input type="text" class="form-control" id="address" placeholder="Enter account address" value="${result[0].address}">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="city">City</label>
                            <input type="text" class="form-control" id="city" placeholder="Enter account city" value="${result[0].city}">
                        </div>
                    </div>
                    <div class="col-md-1">
                        <div class="form-group">
                            <label for="state">State</label>
                            <input type="text" class="form-control" id="state" placeholder="State" value="${result[0].state}">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="zip">Zip</label>
                            <input type="text" class="form-control" id="zip" placeholder="Enter zipcode" value="${result[0].zip}">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <input type="button" class="btn btn-primary" data-action="update" id="addUpdateAccount" value="Update Account">
                    </div>
                </div>`
                res.send(form);
            }
        });
    },


    addAccountAssetsForm: function (req, res) {
        if (req.session.success) {
            general.accountlist(function (list) {
                res.render('partials/accounts/addassets', {
                    title: "Add Account Assets",
                    heading: "Add Account Assets",
                    nav: true,
                    accountselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'accounts.js'
                    }]
                });
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
    addAccountAsset: function (req, res) {
        var sql, values, foldername, data, error, elements, i = 0,
            filename;

        data = req.body;
        elements = JSON.parse(data.filename);

        // console.log(req.file);
        // console.log(req.file.mimetype);
        // return;
        // console.log(data);
        /* VALIDATE ONLY THOSE THAT HAVE SKIP SET TO FALSE */
        while (i < elements.length) {
            if (!elements[i].skip) {
                if (!validate.validate(elements[i].value, elements[i].regex)) {
                    error = true;
                    elements[i].status = "error";
                } else {
                    filename = elements[i].value;
                }
            } else if (elements[i].id == 'file') {
                if (!req.file || req.file.mimetype !== 'application/pdf' || req.file > 100000) {
                    error = true;
                    elements[i].status = "error";
                }
            }
            i++;
        }

        // return;

        /* IF THERE ARE ANY ERRORS THEN SEND AN ERROR OBJECT BACK */
        if (error) {
            general.removeAllFiles('./tmp');
            elements = JSON.stringify(elements);
            res.send(elements);
            return;
        }
        /* IF EVERYTHING CHECKS OUT THEN COMPLETE UPLOADING FILE. */
        /* GET THE ACCOUNT FOLDER NAME */
        sql = "SELECT folder FROM account  WHERE id=?"
        values = [req.body.acctId];

        // console.log(values);
        // return;
        queries.bindedSelect(sql, values, function (err, result) {
            foldername = result[0].folder;
            fs.rename('./tmp/' + req.file.filename, './public/account_folders/' + foldername + "/" + req.file.filename + '.pdf', function (err) {
                if (err) {
                    res.send('filemoveerror');
                } else {
                    /* PUT INTO DATABASE */
                    sql = "INSERT INTO account_asset (account_id, name, file) VALUES (?, ?, ?)";

                    values = [req.body.acctId, filename, req.file.filename + '.pdf'];
                    // console.log(values);
                    queries.bindedOther(sql, values, function (err, result) {
                        if (err) {
                            res.send('inserterror');
                        } else {
                            general.removeAllFiles('./tmp');
                            res.send('success');
                        }
                    });
                }
            });
        });


    },
    viewDeleteAccountAssetsForm: function (req, res) {
        if (req.session.success) {
            general.accountlist(function (list) {
                res.render('partials/accounts/viewdeleteacctassets', {
                    title: "View Delete Account Assets",
                    heading: "View Delete Account Assets",
                    nav: true,
                    accountselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'account1.js'
                    }]
                });
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
    getAssetTable: function (req, res) {
        var sql, values, i = 0,
            table, foldername;
        sql = "SELECT folder FROM account WHERE id=?";
        values = [req.body.data];
        queries.bindedSelect(sql, values, function (err, result) {
            if (err) {
                res.send('dberror');
            } else {
                foldername = result[0].folder;
                sql = "SELECT * FROM account_asset WHERE account_id=?";
                values = [req.body.data];
                queries.bindedSelect(sql, values, function (err, result) {
                    console.log(result);
                    if (err) {
                        res.send('dberror');
                    } else {
                        if (result.length == 0) {
                            res.send('<p>There are no account assets to display</p>')
                        } else {
                            table = `<table class="table table-bordered"><thead class="thead-light"><tr><th>Name</th><th>Delete</th></tr><thead><tbody>`;
                            while (i < result.length) {
                                table += `<tr><td style="width: 80%"><a href="/public/account_folders/${foldername}/${result[i].file}">${result[i].name}</a></td>`;
                                table += `<td style="width: 20%"><input type="button" id="d${result[i].id}" class="btn btn-danger" value="Delete"></td>`;
                                i++;
                            }
                            table += `</tbody></table>`;

                            res.send(table);
                        }
                    }
                });
            }
        });
    },

    
    deleteAsset: function (req, res) {
        var sql, values, data, path;
        data = JSON.parse(req.body.data);
        path = `./public/account_folders/${data.foldername}/${data.filename}`;
        /* REMOVE FILE FROM FOLDER, THEN REMOVE FILE FROM DATABASE. */
        fs.unlink(path, function (err) {
            if (err) {
                console.log(err);
                res.send('fileerror');
            } else {
                sql = "DELETE FROM account_asset WHERE id=?";
                values = [data.fileid];
                queries.bindedOther(sql, values, function (err, result) {
                    if (err) {
                        res.send('dberror');
                    } else if (result) {
                        res.send('success');
                    } else {
                        res.send('error');
                    }
                });
            }
        });

    }
} //END MODULE.EXPORTS


/* THIS FUNCTION IS OUTSIDE OF MODULE EXPORTS*/
function addUpdateAccountProc(res, data) {
    var i = 0,
        error, values = [],
        path, sql = "",
        foldername;
    /* LOOPS THROUGH THE ARRAY OF OBJECTS AND CHECKS THE DATA AGAINST THE REGEX.  IF ERROR CHANGES STATUS TO ERROR OTHERWISE CHANGES STATUS TO SUCCESS. */
    while (i < data.elements.length) {
        if (!validate.validate(data.elements[i].value, data.elements[i].regex)) {
            data.elements[i].status = 'error';
            error = true;
        } else {
            /* VALUES AREA PUT INTO AN ARRAY SO I CAN BIND THEM TO THE SQL STATEMENT LATER */
            values.push(data.elements[i].value);
        }
        i++;
    }
    if (error) {
        data.masterstatus = "errors";
        data = JSON.stringify(data);
        res.send(data);
    } else {

        /* THIS METHOD IS USED FOR ADDING NEW ACCOUNTS.  ACCOUNT FOLDERS WILL BE STORED WITH THE ACCOUNT NAME AND A TIMESTAMP TO KEEP EVERYTHING UNIQUE */
        if (data.flag === 'add') {
            /* CREATE FOLDER NAME FOR ACCOUNT. THE FOLDER NAME IS THE ACCOUNT NAME PLUS A TIME STAMP TO MAKE IT UNIQUE */
            /* ANY SPACES IN A FOLDER NAME WILL BE REPLACED WITH A HYPHEN */
            foldername = values[0].split(" ").join("_");
            foldername = foldername.toLowerCase();
            foldername = foldername + Date.now();

            /* ONCE I CREATE THE FOLDER NAME I ADDED IT TO THE VALUES ARRAY SO THE NAME WILL BE IN THE DATABASE */
            values.push(foldername);

            /* I FIRST CREATE THE ACCOUNT FOLDER AND THEN ADD THE ACCOUNT TO THE DATABASE*/
            path = "./public/account_folders/" + foldername;
            fs.mkdir(path, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("values = " + values);
                    /* THIS ADDS THE VALUES TO THE DATABASE */
                    sql = "INSERT INTO account (name, address, city, state, zip, folder) VALUES (?, ?, ?, ?, ?, ?)";
                    queries.bindedOther(sql, values, function (err, result) {

                        // console.log("result = " + result);
                        // return;

                        /* TECHNICALLY HERE I SHOULD ALSO REMOVE THE FOLDER I JUST CREATED */
                        if (err) {
                            data = {
                                masterstatus: "err",
                                msg: "There was an error adding the account."
                            }
                            data = JSON.stringify(data);
                            res.send(data);
                        } else {
                            data = {
                                masterstatus: "success",
                                msg: "The account has been added."
                            }
                            data = JSON.stringify(data);
                            res.send(data);
                        }
                    });
                }
            });
        }

        /* THIS METHOD IS BEING USED TO UPDATE THE ACCOUNT INFORMATION.  THE FOLDER IS NOT UPDATED OR ALLOWED TO BE UPDATED */
        else if (data.flag === 'update') {
            values.push(data.acctId);
            sql = "UPDATE account SET name=?, address=?, city=?, state=?, zip=? WHERE id=?";
            queries.bindedOther(sql, values, function (err, result) {
                if (err) {
                    data = {
                        masterstatus: "err",
                        msg: "There was an error updating the account."
                    }
                    data = JSON.stringify(data);
                    res.send(data);
                } else {
                    data = {
                        masterstatus: "success",
                        msg: "The account has been updated."
                    }
                    data = JSON.stringify(data);
                    res.send(data);
                }
            });
        }
    }
}