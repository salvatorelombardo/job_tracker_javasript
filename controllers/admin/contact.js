"use strict";
var validate = require('../../modules/validation'),
    queries = require('../../modules/Queries'),
    general = require('../../modules/General'),
    fs = require('fs');
module.exports = {
    addContactForm: function (req, res) {
        /*  CHECKS IF THE SESSION WITH SUCCESS IT PRESENT IF SO THEN PROCEED TO HOME PAGE OTHERWISE REDIRECT BACK TO LOGIN.  THIS WAY YOU CANNOT ACCESS ANY PAGES IN THE APPLICATION WITHOUT FIRST SUCCESSFULLY LOGINING IN*/

        /* ALL THIS FUNCTION DOES IS LOAD THE ADDACCOUNT FORM AND THE REQUIRED JAVASCRIPT FILES */
        if (req.session.success) {
            res.render('partials/contacts/addcontact', {
                title: "Add Contact",
                heading: "Add Contact",
                nav: true,
                scripts: [{
                    'script': 'Util.js'
                }, {
                    'script': 'General.js'
                }, {
                    'script': 'contacts.js'
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

    updateContactForm: function (req, res) {
        if (req.session.success) {
            general.contactlist(function (list) {
                res.render('partials/contacts/updatecontact', {
                    title: "Add Contact",
                    heading: "Add Contact",
                    nav: true,
                    contactselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'contacts.js'
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

    manageContactsForm: function (req, res) {
        if (req.session.success) {
            general.contactlist(function (list) {
                res.render('partials/contacts/manageContact', {
                    title: "Manage Contact",
                    heading: "Mange Contact",
                    nav: true,
                    contactselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'contacts.js'
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

    viewDeleteContact: function (req, res) {
        if (req.session.success) {
            general.contactTable(function (list) {
                res.render('partials/contacts/deleteContact', {
                    title: "Delete Contact",
                    heading: "Delete Contact",
                    nav: true,
                    // contactselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'contacts.js'
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

    deleteJobContact: function (req, res) {
        var sql, values, data;
        data = JSON.parse(req.body.data);

        /* REMOVE FILE FROM FOLDER, THEN REMOVE FILE FROM DATABASE. */


        sql = "DELETE FROM account_job_contact WHERE id=?";
        values = [data.fileid];

        console.log(values);

        // return

        queries.bindedOther(sql, values, function (err, result) {
            if (err) {
                res.send('dberror');
            } else if (result) {
                res.send('success');
            } else {
                res.send('error');
            }
        });
    },





    addUpdateContact: function (req, res) {
        var data = req.body.data,
            i = 0,
            error = false,
            values = [],
            path, sql = "",
            foldername;
        data = JSON.parse(data);
        // console.log(values + ` delimiter ` + data);
        /* HERE WE ARE CHECKING THE DUPLICATES FIRST THEN WE ARE CALLING THE ADDUPDATE PROCESS ON A SUCCESSFULL CALLBACK. */
        general.checkDuplicates(data.elements, data.flag, data.contactId, function (err, result) {
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
                addUpdateContactProc(res, data);
            }
        });
    },

    getContact: function (req, res) {
        var sql, values, form;
        sql = "SELECT * FROM contact WHERE id = ?";
        values = [req.body.data];

        queries.bindedSelect(sql, values, function (err, result) {
            console.log(values + `+` + result[0].name);
            if (err) {
                res.send("<p>There was an error getting that contact</p>");
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
                            <label for="address">Phone</label>
                            <input type="text" class="form-control" id="phone" placeholder="Enter work phone" value="${result[0].work_phone}">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="city">Mobile phone</label>
                            <input type="text" class="form-control" id="phoneOpt" placeholder="Enter mobile phone" value="${result[0].mobile_phone}">
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="state">Email</label>
                            <input type="text" class="form-control" id="email" placeholder="email" value="${result[0].email}">
                        </div>
                    </div>
                    
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <input type="button" class="btn btn-primary" data-action="update" id="addUpdateContact" value="Update Contact">
                    </div>
                </div>`
                res.send(form);
            }
        });
    },



    getContactTableTable: function (req, res) {
        var table, sql, i = 0;
        sql = "SELECT * FROM contact ORDER BY name ASC";
        queries.notBindedSelect(sql, function (err, result) {
            // console.log(result[0]);
            if (err) {
                res.send("<p>There was an error getting the contacts</p>");
            }
            if (result.length == 0) {
                res.send("<p>There are no contacts to list</p>");
            } else {
                table = `<table class="table table-bordered"><thead><tr><th>Name</th><th>Work Phone</th><th>Mobile Phone</th><th>Email</th><th>Delete</th></tr></thead><tbody>`;
                while (i < result.length) {
                    table += `<tr><td>${result[i].name}</td><td>${result[i].work_phone}</td><td>${result[i].mobile_phone}</td><td>${result[i].email}</td><td><input type="button" class="btn btn-danger" id="${result[i].id}" value="Delete"></tr>`;
                    i++;
                }
                table += `</tbody></table>`;
                res.send(table);
            }
        });
    },

    addContactToJob: function (req, res) {


        var sql, values = [],
            form, table, result, i = 0,
            elements, data, list;

        data = req.body.data;
        data = JSON.parse(data);

        // console.log(data);
        // return;
        values.push(data.elements[0].job_value);
        values.push(data.elements[0].con_value);

        // console.log(values)
        // return
        sql = "INSERT INTO account_job_contact (job_id, contact_id) VALUES (?, ?)";

        queries.bindedOther(sql, values, function (err, result) {
            console.log('values = ' + values + `+` + " result =" + result);
            // return
            /* TECHNICALLY HERE I SHOULD ALSO REMOVE THE FOLDER I JUST CREATED */
            if (err) {
                data = {
                    masterstatus: "err",
                    msg: "There was an error adding the contact."
                }
                data = JSON.stringify(data);
                res.send(data);
            } else {



                values.shift();

                console.log(values);

                // return
                sql = "SELECT account.name AS accountName, job.name AS jobName, account_job_contact.id AS id FROM account, job, account_job_contact WHERE account_job_contact.job_id = job.id AND job.account_id = account.id AND contact_id = ?";

                queries.bindedSelect(sql, values, function (err, result) {

                    console.log(result);
                    // return
                    table = `<table class="table table-bordered"><thead><tr><th>Account</th><th>Job</th><th>Delete</th></tr></thead><tbody>`;
                    while (i < result.length) {
                        table += `<tr><td>${result[i]["accountName"]}</td><td>${result[i]["jobName"]}</td><td><input type="button" class="btn btn-danger" id="${result[i]["id"]}" value="Delete"></tr>`;
                        i++;
                    }
                    table += `</tbody></table>`;
                    /* I USED THE ECMA6 TEMPLATE STRING TO DO THIS */
                    res.send(table);
                })

                // table = JSON.stringify(table);

            }
        })


    },



    getManageContactTable: function (req, res) {

        var sql, values, form, table, result, i = 0,
            elements, data, list;


        // sql = "SELECT * FROM contact WHERE id = ?";
        data = req.body.data;
        data = JSON.parse(data);

        sql = "SELECT account.name AS accountName, job.name AS jobName, account_job_contact.id AS id FROM account, job, account_job_contact WHERE account_job_contact.job_id = job.id AND job.account_id = account.id AND contact_id = ?";
        // console.log("data from client " + data) /*data sent from client*/
        values = [req.body.data];

        // data = JSON.parse(data);
        // return
        queries.bindedSelect(sql, values, function (err, result) {
            // console.log(`result ` + result.length);
            // console.log(`values ` + values);
            // return;
            // return;

            if (err) {

                res.send("<p>There was an error getting that contact</p>");

            } else if (result.length == 0) {


                (function accountlist(cb) {
                    list = '<label for="accountList">Select an Account</label><br><select class="custom-select col-md-4" id="accountList"><option value="0">Select an Account</option>';

                    // /*    i = 0,


                    sql = "SELECT id, name FROM account";
                    queries.notBindedSelect(sql, function (err, results) {
                        if (results.length === 0) {
                            res.send("<p>There are no accounts listed</p>");
                        } else {

                            while (i < results.length) {
                                list += '<option value="' + results[i].id + '">' + results[i].name + '</option>';
                                i++;
                            }

                            list += '</select>'
                            res.send("<p> There are no jobs associated with this contact </p> <br>" + list + "<br>");
                        }
                    });

                })()






            } else {
                // console.log(result.length);
                table = `<table class="table table-bordered"><thead><tr><th>Account</th><th>Job</th><th>Delete</th></tr></thead><tbody>`;
                while (i < result.length) {
                    table += `<tr><td>${result[i]["accountName"]}</td><td>${result[i]["jobName"]}</td><td><input type="button" class="btn btn-danger" id="${result[i]["id"]}" value="Delete"></tr>`;
                    i++;
                }
                table += `</tbody></table>`;
                /* I USED THE ECMA6 TEMPLATE STRING TO DO THIS */


                res.send(table);
            }
        });


    },



    getJobList: function (req, res) {

        var sql, values, i = 0,
            data, list, accountId;

        values = [req.body.data];
        values = JSON.parse(values);
        // console.log(values[0].value);
        // console.log(data);
        // return;
        (function jobList(acctId, cb) {


            list = '<label for="jobList">Select a Job</label><br><select class="custom-select col-md-4" id="jobList"><option value="0">Select a Job</option>';

            sql = "SELECT id, name FROM job WHERE account_id = ?";

            values = values[0].value;


            // return;

            queries.bindedSelect(sql, values, function (err, results) {

                // console.log(values);
                // console.log(results);

                if (results.length == 0) {

                    res.send('<p>There are no jobs for that account</p>');

                } else {

                    while (i < results.length) {

                        list += `<option value="${results[i].id}">${results[i].name}</option>`;
                        i++;
                    }

                    list += '</select><br/>';
                    list += ' <div class="row mt-3" id="addConToJob" style="display:none">';
                    list += '<div class="col-md-6">';
                    list += '<input type="button" class="btn btn-primary" data-action="add" id="addContactToJob" value="Add Contact To Job"> </div> </div>'
                    res.send(list);
                }
            });
        })()
        // })
    },














    /* getContactTableTable: function (req, res) {
         var sql, values, form, i = 0;
         sql = "SELECT * FROM contact ORDER BY name ASC ";
         values = [req.body.data];

         queries.bindedSelect(sql, values, function (err, result) {


             if (err) {
                 res.send('dberror');
             } else {
                 /* I USED THE ECMA6 TEMPLATE STRING TO DO THIS */
    // sql = "SELECT * FROM contact WHERE id=?";
    /*values = [req.body.data];
                queries.bindedSelect(sql, values, function (err, result) {
                    sql = "SELECT * FROM contact WHERE id = ?";
                    values = [req.body.data];
                    console.log(values + `+` + result);

                    if (err) {
                        res.send('dberror');
                    } else {
                        if (result.length == 0) {
                            // console.log(values + `+` + result);
                            res.send('<p>There are no contacts to display</p>')
                        } else {

                            form = `<table class="table table-bordered"><thead class="thead-light"><tr><th>Name</th><th>Work phone</th><th>Mobile phone</th><th>Email</th><th>Delete</th></tr><thead><tbody>`;
                            while (i < result.length) {
                                form += `<tr><td>${result[i].name}</td>`;
                                form += `<td>${result[i].work_phone}</td>`;
                                form += `<td>${result[i].mobile_phone}</td>`;
                                form += `<td>${result[i].email}</td>`;
                                form += `<td></td><input type="button" class="btn btn-danger" id="${result[i].id}" value="Delete"></td></tr>`;
                                i++;

                            }
                            form += `</tbody></table>`;


                        }
                        res.send(form)
                    }
                });


            }
        });
    },
*/




    getContactTable: function (req, res) {
        var sql, values, i = 0,
            table, foldername;
        sql = "SELECT * FROM contact WHERE id=?";
        values = [req.body.data];
        queries.bindedSelect(sql, values, function (err, result) {
            if (err) {
                res.send('dberror');
            } else {
                foldername = result[0].folder;
                sql = "SELECT * FROM contact WHERE id=?";
                values = [req.body.data];
                queries.bindedSelect(sql, values, function (err, result) {
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




    deleteContactTable: function (req, res) {
        var sql, values, data, path;
        values = [req.body.data];
        // data = JSON.parse(req.body.data);
        // path = `./public/account_folders/${data.foldername}/${data.filename}`;
        /* REMOVE FILE FROM FOLDER, THEN REMOVE FILE FROM DATABASE. */
        // fs.unlink(path, function (err) {
        /* if (err) {
             console.log(err);
             res.send('fileerror');
         } else {*/
        values = JSON.parse(values);
        sql = "DELETE FROM contact WHERE id = ?";
        // console.log(values + `+` + result);
        // values = [data.fileid];
        queries.bindedSelect(sql, values, function (err, result) {
            console.log(values + `+` + result);
            if (err) {
                res.send('dberror');
            } else if (result) {
                // data = JSON.stringify(data);
                res.send('success');
            } else {
                res.send('error');
            }
        });
    }
    // });

}









/* THIS FUNCTION IS OUTSIDE OF MODULE EXPORTS*/
function addUpdateContactProc(res, data) {
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
            //  VALUES AREA PUT INTO AN ARRAY SO I CAN BIND THEM TO THE SQL emailMENT LATER 
            values.push(data.elements[i].value);
        }
        i++;
    }
    if (error) {
        data.masterstatus = "errors";
        data = JSON.stringify(data);
        res.send(data);
    } else if (data.flag === 'add') {


        /* THIS ADDS THE VALUES TO THE DATABASE */

        sql = "INSERT INTO contact (name, work_phone, mobile_phone, email) VALUES (?, ?, ?, ?)";
        queries.bindedOther(sql, values, function (err, result) {
            // console.log('values = ' + values + `+` + " result =" + result);
            // return
            /* TECHNICALLY HERE I SHOULD ALSO REMOVE THE FOLDER I JUST CREATED */
            if (err) {
                data = {
                    masterstatus: "err",
                    msg: "There was an error adding the contact."
                }
                data = JSON.stringify(data);
                res.send(data);
            } else {
                data = {
                    masterstatus: "success",
                    msg: "The contact has been added."
                }
                data = JSON.stringify(data);
                res.send(data);
            }
        })
    }




    /* THIS METHOD IS BEING USED TO UPDATE THE contact INFORMATION.  THE FOLDER IS NOT UPDATED OR ALLOWED TO BE UPDATED */
    else if (data.flag === 'update') {
        values.push(data.contactId);

        // console.log(values);
        // return;
        sql = "UPDATE contact SET name=?, work_phone=?, mobile_phone=?, email=? WHERE id=?";
        queries.bindedOther(sql, values, function (err, result) {
            // console.log(result);
            // return;
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

/* THIS FUNCTION IS OUTSIDE OF MODULE EXPORTS*/
/*function addUpdateContactProc(res, data) {
    var i = 0,
        error, values = [],
        path, sql = "",
        foldername;
    /* LOOPS THROUGH THE ARRAY OF OBJECTS AND CHECKS THE DATA AGAINST THE REGEX.  IF ERROR CHANGES STATUS TO ERROR OTHERWISE CHANGES STATUS TO SUCCESS. */
/* while (i < data.elements.length) {
     if (!validate.validate(data.elements[i].value, data.elements[i].regex)) {
         data.elements[i].status = 'error';
         error = true;
     } else {
         /* VALUES AREA PUT INTO AN ARRAY SO I CAN BIND THEM TO THE SQL STATEMENT LATER */
/*  values.push(data.elements[i].value);
        }
        i++;
    }
    if (error) {
        data.masterstatus = "errors";
        data = JSON.stringify(data);
        res.send(data);
    } else {

        /* THIS METHOD IS USED FOR ADDING NEW ACCOUNTS.  ACCOUNT FOLDERS WILL BE STORED WITH THE ACCOUNT NAME AND A TIMESTAMP TO KEEP EVERYTHING UNIQUE */
/*  if (data.flag === 'add') {
      /* CREATE FOLDER NAME FOR ACCOUNT. THE FOLDER NAME IS THE ACCOUNT NAME PLUS A TIME STAMP TO MAKE IT UNIQUE */
/* ANY SPACES IN A FOLDER NAME WILL BE REPLACED WITH A HYPHEN */
/*foldername = values[0].split(" ").join("_");
foldername = foldername.toLowerCase();
foldername = foldername + Date.now();

/* ONCE I CREATE THE FOLDER NAME I ADDED IT TO THE VALUES ARRAY SO THE NAME WILL BE IN THE DATABASE */
/*  values.push(foldername);

  /* I FIRST CREATE THE ACCOUNT FOLDER AND THEN ADD THE ACCOUNT TO THE DATABASE*/
/*  path = "./public/contact_folders/" + foldername;
  fs.mkdir(path, function (err) {
      if (err) {
          console.log(err);
      } else {

          /* THIS ADDS THE VALUES TO THE DATABASE */
/*  sql = "INSERT INTO contact (name, work_phone, mobile_phone, email) VALUES (?, ?, ?, ?)";
  queries.bindedOther(sql, values, function (err, result) {

      /* TECHNICALLY HERE I SHOULD ALSO REMOVE THE FOLDER I JUST CREATED */
/*      if (err) {
                            data = {
                                masterstatus: "err",
                                msg: "There was an error adding the contact."
                            }
                            data = JSON.stringify(data);
                            res.send(data);
                        } else {
                            data = {
                                masterstatus: "success",
                                msg: "The contact has been added."
                            }
                            data = JSON.stringify(data);
                            res.send(data);
                        }
                    });
                }
            });
        }

        /* THIS METHOD IS BEING USED TO UPDATE THE ACCOUNT INFORMATION.  THE FOLDER IS NOT UPDATED OR ALLOWED TO BE UPDATED */
/*   else if (data.flag === 'update') {
            values.push(data.contactId);
            sql = "UPDATE contact SET name=?, work_phone=?, mobile_phone=?, email=? WHERE id=?";
            queries.bindedOther(sql, values, function (err, result) {
                if (err) {
                    data = {
                        masterstatus: "err",
                        msg: "There was an error updating the contact."
                    }
                    data = JSON.stringify(data);
                    res.send(data);
                } else {
                    data = {
                        masterstatus: "success",
                        msg: "The contact has been updated."
                    }
                    data = JSON.stringify(data);
                    res.send(data);
                }
            });
        }
    }
}*/