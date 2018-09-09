"use strict"
/* THIS GENERAL ONE DOES SOME COMMON OPERATION FOR THIS APPLICATION ONLY */
var db = require('./Conn'),
    queries = require('./Queries'),
    validate = require('./Validation'),
    mysql = require('mysql'),
    pool = db.connect(),
    fs = require('fs'),
    path = require('path');

module.exports = {
    /* CREATES A SELECT LIST OF ALL ACCOUNTS */
    accountlist: function (cb) {
        var list = '<label for="accountList">Select an Account</label><br><select class="custom-select" id="accountList"><option value="0">Select an Account</option>',
            i = 0,
            sql;

        sql = "SELECT id, name FROM account";
        queries.notBindedSelect(sql, function (err, results) {
            if (results.length === 0) {
                cb("<p>There are no accounts listed</p>");
            } else {

                while (i < results.length) {
                    list += '<option value="' + results[i].id + '">' + results[i].name + '</option>';
                    i++;
                }

                list += '</select>'
                cb(list);
            }
        });

    },
    /* CREATES A SELECT LIST OF ALL CONTACTS */
    contactlist: function (cb) {
        var list = '<label for="contactList">Select a Contact</label><br><select class="custom-select" id="contactList"><option value="0">Select a Contact</option>',
            i = 0,
            sql;

        sql = "SELECT id, name, email FROM contact";
        queries.notBindedSelect(sql, function (err, results) {
            if (results.length === 0) {
                cb("<p>There are no contacts listed</p>");
            } else {

                while (i < results.length) {
                    list += `<option value="${results[i].id}">${results[i].name} - ${results[i].email}</option>`;
                    i++;
                }

                list += '</select>'
                cb(list);
            }
        });
    },
    /* CREATES A SELECT LIST OF ALL JOBS */
    joblist: function (acctId, cb) {
        var sql, values, i = 0,
            list = '<label for="jobList">Select a Job</label><br><select class="custom-select" id="jobList"><option value="0">Select a Job</option>';
        sql = "SELECT id, name FROM job WHERE account_id = ?";
        values = [acctId];
        queries.bindedSelect(sql, values, function (err, results) {
            if (results.length == 0) {
                cb('<p>There are no jobs for that account</p>');
            } else {
                while (i < results.length) {
                    list += `<option value="${results[i].id}">${results[i].name}</option>`;
                    i++;
                }

                list += '</select>'
                cb(list);
            }
        });
    },

    /* CREATES A TABLE OF ALL CONTACTS */
    contactTable: function (cb) {
        var table, sql, i = 0;
        sql = "SELECT * FROM contact ORDER BY name ASC";
        queries.notBindedSelect(sql, function (err, result) {
            if (err) {
                cb("<p>There was an error getting the contacts</p>");
            }
            if (result.length == 0) {
                cb("<p>There are no contacts to list</p>");
            } else {
                table = `<table class="table table-bordered"><thead><tr><th>Name</th><th>Work Phone</th><th>Mobile Phone</th><th>Email</th><th>Delete</th></tr></thead><tbody>`;
                while (i < result.length) {
                    table += `<tr><td>${result[i].name}</td><td>${result[i].work_phone}</td><td>${result[i].mobile_phone}</td><td>${result[i].email}</td><td><input type="button" class="btn btn-danger" id="${result[i].id}" value="Delete"></tr>`;
                    i++;
                }
                table += `</tbody></table>`;
                cb(table);
            }
        });
    },

    /* CREATES A VIEW ONLY CONTACT TABLE */
    contactTableView: function (jobId, cb) {
        var table, sql, i = 0,
            values;
        sql = "SELECT contact.name AS name, contact.work_phone AS work_phone, contact.mobile_phone AS mobile_phone, contact.email AS email FROM contact, account_job_contact WHERE job_id = ? AND contact_id = contact.id  ORDER BY contact.name ASC";
        values = [jobId];
        queries.bindedSelect(sql, values, function (err, result) {
            if (err) {
                cb("<p>There was an error getting the contacts</p>");
            } else if (result.length == 0) {
                cb("<p>There are no contacts to list</p>");
            } else {
                table = `<table class="table table-bordered"><thead><tr><th>Name</th><th>Work Phone</th><th>Mobile Phone</th><th>Email</th></tr></thead><tbody>`;
                while (i < result.length) {
                    table += `<tr><td>${result[i].name}</td><td>${result[i].work_phone}</td><td>${result[i].mobile_phone}</td><td>${result[i].email}</td></tr>`;
                    i++;
                }
                table += `</tbody></table>`;
                cb(table);
            }
        });
    },
    /* REMOVES ALL FILES FROM A FOLDER */
    removeAllFiles: function (dir) {
        var file

        fs.readdir(dir, (err, files) => {
            if (err) throw err;

            for (file of files) {
                fs.unlink(path.join(dir, file), err => {
                    if (err) throw err;
                });
            }
        });
    },
    /* CHECKS FOR DUPLICATES */
    checkDuplicates: function (elements, flag, acctId, cb) {
        var i = 0,
            res, sql, values, returnedValue;
        while (i < elements.length) {

            if (elements[i].duplicates != undefined) {
                /* VALIDATE FIRST */
                if (validate.validate(elements[i].value, elements[i].regex)) {

                    /* IF THE ENTRY IS VALID THEN CHECK THE FLAG AND SEE WHAT TO DO.  IF THE FLAG IS AN ADD THEN JUST CHECK FOR A DUPLICATE NAME IN THE DATABASE */
                    if (flag === 'add') {
                        duplicates(elements[i], function (err, result) {
                            if (err) {
                                cb(err, null);
                            } else if (result === 'match') {
                                cb(null, 'match');
                            } else if (result === 'nomatch') {
                                cb(null, 'nomatch');
                            }
                        });
                    }
                    /* IF THE FLAG IS AN UPDATE THEN FIRST CHECK IF THE NAME IS THE SAME AS THE ORIGINAL NAME.  IF SO THEN GO NO FURTHER.  IF NOT THEN CHECK FOR DUPLICATE NAME IN DATABASE */
                    else if (flag === 'update') {
                        switch (elements[i].duplicates) {
                            case 'account':
                                sql = "SELECT ?? FROM ?? WHERE id = ?";
                                break;
                            case 'contact':
                                sql = "SELECT ?? FROM ?? WHERE id = ?";
                                break;
                            case 'job':
                                sql = "SELECT ?? FROM ?? WHERE id = ?";
                                break;
                        }

                        values = [elements[i].field, elements[i].duplicates, acctId];

                        queries.bindedSelect(sql, values, function (err, results) {

                            if (elements[i].duplicates === 'account') {
                                returnedValue = results[0].name;
                            } else {
                                returnedValue = results[0].email;
                            }
                            console.log(returnedValue + "  " + elements[i].value);
                            if (returnedValue !== elements[i].value) {
                                duplicates(elements[i], function (err, result) {
                                    if (err) {
                                        cb(err, null);
                                    } else if (result === 'match') {
                                        cb(null, 'match')
                                    } else if (result === 'nomatch') {
                                        cb(null, 'nomatch')
                                    }
                                })
                            } else {
                                cb(null, 'equal');
                            }
                        });
                    }
                } else {
                    /* IF THERE IS A VALIDATION ERROR THEN JUST MOVE ON THE LATER CODE WILL CATCH THE VALIDATION ERRORS */
                    cb(null, 'validationerror');
                }
                break;
            }
            i++;
        }
        /* AT THIS POINT ADD THE VALUES FOR THE RETURN  */

    }
}

function duplicates(element, cb) {
    /* CHECK FOR DUPLICATES */
    var sql, values;
    switch (element.duplicates) {
        case 'account':
            sql = "SELECT ?? FROM ?? WHERE name = ?";
            break;
        case 'contact':
            sql = "SELECT ?? FROM ?? WHERE email = ?";
            break;
        case 'job':
            sql = "SELECT ?? FROM ?? WHERE name = ?";
            break;
    }

    /* BELOW IS A LIST OF VALUES FOR THE ABOVE SQL STATEMENTS
    element.field = field, element.duplicates = table, element.value = value,  */
    values = [element.field, element.duplicates, element.value, ];

    queries.bindedSelect(sql, values, function (err, results) {
        if (err) {

            cb(err, null);
        } else {
            if (results.length === 0) {
                /* IF THERE IS NO MATCH FOUND THEN MOVE ONE */

                cb(null, 'nomatch');
            } else {
                /* IF THERE IS A MATCH THEN RETURN STRING MATCH */

                cb(null, 'match');
            }
        }
    });
}