"use strict";
var validate = require('../../modules/validation'),
    queries = require('../../modules/Queries'),
    general = require('../../modules/General'),
    fs = require('fs');

module.exports = {



    addJobsForm: function (req, res) {
        if (req.session.success) {
            general.accountlist(function (list) {
                res.render('partials/jobs/addjob', {
                    title: "View Jobs Contacts",
                    heading: "View Jobs Contacts",
                    nav: true,
                    accountselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'jobs.js'
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


    deleteJobNote: function (req, res) {

        var sql, values = [],
            data;
        data = req.body.data;
        data = JSON.parse(data);
        // console.log(data);
        // return;
        values.push(data.fileid);
        sql = "DELETE FROM job_note WHERE id = ?";
        // console.log(values);
        // return;
        queries.bindedSelect(sql, values, function (err, result) {

            if (err) {
                res.send('dberror');
            } else if (result) {
                res.send('success');
            } else {
                res.send('error');
            }

        })


    },

    getJob: function (req, res) {
        var sql, values, form, result;
        sql = "SELECT * FROM account WHERE id = ?";
        values = [req.body.data];

        queries.bindedSelect(sql, values, function (err, result) {
            // console.log(`values ` + values + `result ` + result[0].name);
            if (err) {
                res.send("<p>There was an error getting that jobs</p>");
            } else {
                /* I USED THE ECMA6 TEMPLATE STRING TO DO THIS */
                form = `<div class="row">
                   <div class="col-md-6">
                       <div class="form-group">
                           <label for="name">Name</label>
                           <input type="text" class="form-control" id="name" placeholder="Enter job name" value="">
                       </div>
                   </div>
               </div>
               <div class="row">
                   <div class="col-md-6">
                       <input type="button" class="btn btn-primary" data-action="add" id="addUpdateJobs" value="Add Job">
                   </div>
               </div>`

                res.send(form);
            }
        });
    },

    viewJobContact: function (req, res) {
        if (req.session.success) {
            general.accountlist(function (list) {
                res.render('partials/jobs/viewJobContacts', {
                    title: "View Contacts",
                    heading: "View Contacts",
                    nav: true,
                    accountselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'jobs.js'
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

    addJobNote: function (req, res) {
        if (req.session.success) {
            general.accountlist(function (list) {
                res.render('partials/jobs/addJobNote', {
                    title: "Add Job Note",
                    heading: "Add Job Note",
                    nav: true,
                    accountselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'jobs.js'
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
    viewUpdateDeleteJobNote: function (req, res) {
        if (req.session.success) {
            general.accountlist(function (list) {
                res.render('partials/jobs/viewUpdateDeleteJobNote', {
                    title: "Update Delete Job Note",
                    heading: "Update Delete Job Note",
                    nav: true,
                    accountselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'jobs.js'
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

    addJobAsset: function (req, res) {
        if (req.session.success) {
            general.accountlist(function (list) {
                res.render('partials/jobs/addJobAsset', {
                    title: "Add Job Asset",
                    heading: "Add Job Asset",
                    nav: true,
                    accountselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'jobs.js'
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

    viewJobAsset: function (req, res) {
        if (req.session.success) {
            general.accountlist(function (list) {
                res.render('partials/jobs/viewDeleteJobAsset', {
                    title: "View Jobs Asset",
                    heading: "View Jobs Asset",
                    nav: true,
                    accountselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'jobs.js'
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

    addJobHours: function (req, res) {
        if (req.session.success) {
            general.accountlist(function (list) {
                res.render('partials/jobs/addJobHours', {
                    title: "Add Job Hours",
                    heading: "Add Job Hours",
                    nav: true,
                    accountselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'jobs.js'
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

    updateDeleteJobHours: function (req, res) {
        if (req.session.success) {
            general.accountlist(function (list) {
                res.render('partials/jobs/updateDeleteJobHours', {
                    title: "Update & Delete Job Hours",
                    heading: "Update & Delete Job Hours",
                    nav: true,
                    accountselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'jobs.js'
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

    printJobInvoice: function (req, res) {
        if (req.session.success) {
            general.accountlist(function (list) {
                res.render('partials/jobs/printInvoice', {
                    title: "Print Job Invoice",
                    heading: "Print Job Invoice",
                    nav: true,
                    accountselect: list,
                    scripts: [{
                        'script': 'Util.js'
                    }, {
                        'script': 'General.js'
                    }, {
                        'script': 'jobs.js'
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

    postInvoiceTable: function (req, res) {

        var data = {},
            sql, values = [],
            table, acctName, acctAddy, acctCity, acctSt, acctZip, job_name, grandTotal = [],
            GT, sum = 0;;

        data = req.body.data;
        data = JSON.parse(data);

        // console.log(data);

        // return
        table = '<table class="table col-md-12 print"><thead><tr class="thead-light"> <th class="" colspan="3"> <h2>Lombardo Co.</h2> <h3>Ann Arbor, MI</h3</th>';

        sql = 'SELECT * FROM account WHERE id=?';
        values.push(data.elements[0].acct_id);
        // values.push(data.elements[0].value);
        // console.log(values);
        queries.bindedSelect(sql, values, function (err, result) {
            if (err) {
                res.send('dberror');
            } else if (result) {
                acctName = result[0].name;
                acctAddy = result[0].address;
                acctCity = result[0].city;
                acctSt = result[0].state;
                acctZip = result[0].zip
                // console.log(result);
                // return
                table += '<th class=" text-right align-middle" colspan="3"><h3 class="">' + acctName + '</h3><h4>' +
                    acctAddy + '<br>' + acctCity + ' , ' + acctSt + ' ' + acctZip + '</h4>';

                values.pop();
                values.push(data.elements[0].value);

                sql = 'SELECT * FROM job WHERE id=?';

                // console.log(values);


                queries.bindedSelect(sql, values, function (err, result) {
                    if (err) {
                        res.send('dberror');
                    } else if (result) {
                        // console.log(result)
                        job_name = result[0].name

                        table += '<h5>Job Name:<p style="display:inline"> ' + job_name + '</p></h5></th> </tr></thead>';
                        table += '<tbody class="table-bordered"><tr><td>Date</td><td>Hours</td><td>Rate</td><td>Description</td><td>Total</td></tr>';

                        values.push(data.elements[0].beginDate);
                        values.push(data.elements[0].endDate);
                        // console.log(values);
                        // return

                        sql = 'SELECT * FROM job_hour WHERE job_id=? AND job_date >= ? AND job_date<=?';
                        // console.log(values);
                        // return;
                        queries.bindedSelect(sql, values, function (err, result) {
                            if (result.length == 0) {

                                res.send('<p>There is no job invoice for the selected dates</p>')

                            } else if (err) {
                                res.send('dberror');
                            } else if (result) {
                                // console.log(result)


                                for (var i = 0; i < result.length; i++) {

                                    table += '<tr><td>' + result[i].job_date + '</td><td>' + result[i].job_hours + '</td><td>' + result[i].hourly_rate + '</td><td>' + result[i].description + '</td>';
                                    table += '<td>' + result[i].job_hours * result[i].hourly_rate + '</td></tr>';
                                    grandTotal.push(result[i].job_hours * result[i].hourly_rate)




                                }
                                for (let j = 0; j < grandTotal.length; j++) {

                                    sum += grandTotal[j];


                                }

                                table += '<tr><td colspan="4">Grand Total</td><td>' + sum + '</td></tr>';








                                table += '</tbody></table';
                                res.send(table);


                            }



                        })




                    }


                })


            }


        })

    },


    updateJobHours: function (req, res) {

        var data = {},
            sql, results, i = 0,
            err, values = [],
            form;


        data = req.body.data;
        data = JSON.parse(data);

        values.push(data.fileid);
        sql = 'SELECT * FROM job_hour WHERE id=?';
        // console.log(values);
        // console.log(data);
        // return
        queries.bindedSelect(sql, values, function (err, result) {

            if (err) {
                res.send('dberror');
            } else if (result) {

                form = '<div id="jobHourForm" class="formModal box">';
                form += '<div class=""><div class="col-md mb-3 pt-3">';
                form += '<label for = "dateFormat"> Date </label> <input type="date"class="form-control" id="dateFormat" value="' + result[0].job_date + '"></div></div>';
                form += '<div class=""> <div class="col-md mb-3"> <label for="number">Hours</label><input type="text" class="form-control" id="number" value="' + result[0].job_hours + '"></div>';
                form += '<div class="col-md mb-3"><label for="hours">Hourly Rate</label><input type="text" class="form-control" id="hours" value="' + result[0].hourly_rate + '"></div></div>';
                form += ' <div class=""><div class="col-md mb-3 "> <label for="text">Description</label><textarea type="textarea" rows="10" class="form-control" id="text">' + result[0].description + '</textarea> </div> </div>';
                form += '<div class="row justify-content-around pb-3"><div class="col-md-4"> <button class="leftbtn btn btn-primary" type="button" id="A' + result[0].id + '" data-action="update">Update Job Hours</button> </div><div class="col-md-3"> <button class="btn btn-danger" type="button" id="rightbtn"  data-action="update">Cancel</button> </div> </div> </div>';
                form = JSON.stringify(form);
                res.send(form);

            } else {
                res.send('error')
            }

        })


    },


    deleteJobHours: function (req, res) {

        var data = {},
            sql, results, i = 0,
            err, values = [];

        data = req.body.data;

        data = JSON.parse(data);

        sql = 'DELETE FROM job_hour WHERE id=?';

        values.push(data.fileid);

        // console.log(data);
        // console.log(values);

        // return

        queries.bindedSelect(sql, values, function (err, result) {

            if (err) {
                res.send('dberror');
            } else if (result) {
                res.send('success');
            } else {
                res.send('error');
            }
        });

    },



    jobHoursTable: function (req, res) {

        var data = {},
            values = [],
            job_id, sql, err, result, table, i = 0;


        data = req.body.data;

        data = JSON.parse(data);

        job_id = data.elements[0].value;

        values = job_id;

        sql = "SELECT * FROM job_hour WHERE job_id=?"

        // console.log(job_id);

        // return;
        queries.bindedSelect(sql, values, function (err, result) {

            // console.log(result[0])
            // console.log(result)
            // return;

            if (err) {
                res.send('dberror');
            } else {
                if (result.length == 0) {
                    res.send('<p class="">There are no job hours to display</p>')
                } else {
                    table = `<table class="table table-bordered col-md-12"><thead class="thead-light"><tr><th>Date</th><th>Hours</th><th>Rate</th><th>Description</th><th>Update</th><th>Delete</th></tr><thead><tbody>`;
                    while (i < result.length) {
                        table += `<tr><td style="width:">` + result[i].job_date + `</td><td style="width:">` + result[i]['job_hours'] + `</td><td style="width:">` + result[i].hourly_rate + `</td><td style="width:">` + result[i].description + `</td>`;
                        table += `<td><input type="button" class="btn btn-primary" id="A${result[i].id}" value="Update"></td><td><input type="button" class="btn btn-danger" id="D${result[i].id}" value="Delete"></td></tr>`;
                        i++;
                    }
                    table += `</tbody></table>`;

                    res.send(table);
                }
            }
        })




    },

    updateJobHoursPost: function (req, res) {

        var data,
            values = [],
            sql, i = 0,
            error;



        data = req.body.data;


        // data.elements = data.elements
        data = JSON.parse(data);
        // console.log(data);
        // return;
        values[0] = data.jobId;
        while (i < data.elements.length) {
            if (!validate.validate(data.elements[i].value, data.elements[i].regex)) {
                data.elements[i].status = 'error';
                error = true;

                // console.log(data.elements[i].status);
            } else {
                /* VALUES AREA PUT INTO AN ARRAY SO I CAN BIND THEM TO THE SQL STATEMENT LATER */
                values.push(data.elements[i].value);
                // continue
                // console.log(values);

            }
            i++;
        }

        // console.log(values);
        // return;

        if (error) {
            data.masterstatus = "errors";
            data = JSON.stringify(data);
            res.send(data);
        }
        if (data.flag == 'update') {

            var err;

            // console.log(values);

            // return;
            values.push(data.id);
            // values.shift();
            // console.log(values);
            // return;

            // console.log(sql);
            // return;
            // values.push(data.contactId);
            // values = values;
            // console.log(values);
            // return;
            sql = "UPDATE job_hour SET job_id=?, job_date=?, job_hours=?, hourly_rate=?, description=? WHERE id=?";

            queries.bindedSelect(sql, values, function (err, result) {
                console.log(result);
                // return;
                if (err) {
                    data = {
                        masterstatus: "err",
                        msg: "There was an error updating the job hours."
                    }
                    data = JSON.stringify(data);
                    res.send(data);
                } else {
                    data = {
                        masterstatus: "success",
                        msg: "The job hours have been updated."
                    }
                    data = JSON.stringify(data);
                    res.send(data);
                }
            });
        }




    },







    addJobHoursPost: function (req, res) {

        var data,
            values = [],
            sql, jobId, i = 0,
            error, err;



        data = req.body.data


        // data.elements = data.elements
        data = JSON.parse(data);
        // console.log(data);
        // return;
        values[0] = data.jobId;
        while (i < data.elements.length) {
            if (!validate.validate(data.elements[i].value, data.elements[i].regex)) {
                data.elements[i].status = 'error';
                error = true;

                // console.log(data.elements[i].status);
            } else {
                /* VALUES AREA PUT INTO AN ARRAY SO I CAN BIND THEM TO THE SQL STATEMENT LATER */
                values.push(data.elements[i].value);
                // continue
                // console.log(values);

            }
            i++;
        }


        sql = "INSERT INTO job_hour (job_id, job_date, job_hours, hourly_rate, description) VALUES (?, ?, ?, ?, ?)";

        // console.log(values);
        // console.log(data.flag)
        // console.log(data.id);

        if (error) {
            data.masterstatus = "errors";
            data = JSON.stringify(data);
            res.send(data);
        } else {
            if (data.flag === 'add') {
                // console.log('add');
                // return
                queries.bindedSelect(sql, values, function (err, result) {

                    // console.log(values);
                    if (err) {
                        data = {
                            masterstatus: "err",
                            msg: "There was an error adding the job hours."
                        }
                        data = JSON.stringify(data);
                        res.send(data);
                    } else {
                        data = {
                            masterstatus: "success",
                            msg: "The job hours have been added."
                        }
                        data = JSON.stringify(data);
                        res.send(data);
                    }

                });
            }

        }
        // return
    },






    deleteJobAsset: function (req, res) {
        var data = {},
            values = [],
            path, sql, fileId, jobId, acctId, foldernameJob, file;

        data = req.body.data;

        data = JSON.parse(data);
        // console.log(data);
        // return
        // console.log(data);

        // return;
        // values = data.fileid;
        fileId = data.fileid;
        // console.log(fileId);
        // return

        jobId = data.elements[0]['jobId'];
        acctId = data.elements[0]['accountId'];


        // console.log(values);
        // return

        sql = "SELECT folder FROM account WHERE id=?";
        values = acctId;

        // console.log(values);
        // return

        queries.bindedSelect(sql, values, function (err, result) {
            acctId = result[0].folder;
            // accountId = result[0].account_id;
            // console.log('values ' + values);
            // console.log('result ' + result[0]);
            // console.log('foldername ' + foldername);
            // return;
            // console.log(path);
            // return


            sql = "SELECT folder FROM job WHERE id=?";
            values = jobId;

            queries.bindedSelect(sql, values, function (err, result) {

                foldernameJob = result[0].folder
                // console.log('foldername ' + path);
                // console.log('foldernameJob ' + foldernameJob);
                // return;

                sql = 'SELECT file FROM job_asset WHERE id=?';
                values = fileId;

                queries.bindedSelect(sql, values, function (err, result) {

                    file = result[0].file;

                    path = `./public/account_folders/${acctId}/${foldernameJob}/${file}`;

                    // console.log(path);
                    // return

                    fs.unlink(path, function (err) {

                        /*if (err) {

                            console.log(err)
                            res.send('fileerror')
                        } else {*/


                        sql = "DELETE FROM job_asset WHERE id=?";
                        values = fileId;
                        console.log(fileId);
                        console.log(path);
                        // return;

                        queries.bindedOther(sql, values, function (err, result) {
                            if (err) {
                                // console.log('err')
                                res.send('dberror');
                            } else if (result) {
                                // console.log('result')
                                res.send('success');
                            } else {

                                // console.log('else third statement')
                                res.send('error');
                            }
                        });


                        // }


                    })

                });

            });
        });



        /* beginning of unlink fs.unlink(path, function (err) {

            if (err) {
                console.log(err);
                res.send('fileerror')

            } else {


            }
        }) end of unlink*/


    },



    jobAssetTable: function (req, res) {

        var sql, values = [],
            i = 0,
            table, foldername, data = {},
            elements1 = [],
            elements = [],
            jobFolder, file;


        data = req.body.data;
        data = JSON.parse(data);
        elements1.push(data);
        // console.log(elements1[0]['elements'][0]['value']);
        elements.push(elements1[0]['elements'][0]['value'])
        // console.log(elements)
        // return;
        data = data.accountid;

        values.push(data);

        // elements = elements[0]['value'];
        // elements.push(elements1.elements[0]['value'])
        // console.log(elements.elements[0]['value']);
        // console.log(elements);
        // console.log(values);
        // return



        sql = "SELECT folder FROM account WHERE id=?";
        // values = [req.body.data];


        queries.bindedSelect(sql, values, function (err, result) {
            if (err) {
                res.send('dberror');
            } else {



                foldername = result[0].folder;

                // console.log(result);
                // console.log(foldername);


                // return;
                // values = elements[0]['value'];
                // console.log(elements);
                // return;

                values = elements;

                sql = "SELECT * FROM job WHERE id=?";
                // values = values;

                // console.log(values)


                queries.bindedSelect(sql, values, function (err, result) {


                    jobFolder = result[0].folder
                    // console.log(jobFolder);
                    // return;


                    if (err) {

                        res.send('dberror');


                    } else {

                        values = elements;

                        sql = "SELECT * FROM job_asset WHERE job_id=?"


                        queries.bindedSelect(sql, values, function (err, result) {

                            // console.log(result[0].file)

                            // console.log(file);
                            // return;
                            // file = result[0].file
                            // console.log(file);
                            // return;

                            if (err) {
                                res.send('dberror');
                            } else {
                                if (result.length == 0) {
                                    res.send('<p>There are no job assets to display</p>')
                                } else {
                                    table = `<table class="table table-bordered"><thead class="thead-light"><tr><th>Name</th><th>Delete</th></tr><thead><tbody>`;
                                    while (i < result.length) {
                                        table += `<tr><td style="width: 80%"><a href="/public/account_folders/${foldername}/${jobFolder}/${result[i].file}">${result[i].name}</a></td>`;
                                        table += `<td style="width: 20%"><input type="button" id="d${result[i].id}" class="btn btn-danger" value="Delete"></td>`;
                                        i++;
                                    }
                                    table += `</tbody></table>`;

                                    res.send(table);
                                }
                            }
                        })
                    }

                    // console.log(foldername);
                    // console.log(result);
                    // return;

                });
            }
        });



    },

    viewJobAssetPost: function (req, res) {

        var sql, values, i = 0,
            data, list, account_id, req;

        account_id = req.body.data;

        // account_id = JSON.parse(account_id);


        values = [account_id];
        // console.log(values);
        list = '<div class="col-md-6"><label for="jobList" class="">Select a Job</label><br><select class="custom-select" id="jobList"><option value="0">Select a Job</option></div>';
        sql = "SELECT id, name FROM job WHERE account_id = ?";

        queries.bindedSelect(sql, values, function (err, results) {
            // console.log(values, results);
            if (results.length == 0) {
                res.send('<p class="col-md">There are no jobs for that account</p>');
            } else {
                while (i < results.length) {
                    list += `<option value="${results[i].id}">${results[i].name}</option>`;
                    i++;
                }

                list += '</select>'

                res.send(list);

            }



        });

    },

    // this adds the job asset to the folder and creates teh link in the database

    addJobAssetPost: function (req, res) {

        var sql, values, foldername, foldernameJob, data, error, elements, i = 0,
            filename, jobId, acctId;

        data = req.body;
        elements = JSON.parse(data.filename);
        jobId = JSON.parse(data.jobId);
        acctId = JSON.parse(data.acctId);
        /* VALIDATE ONLY THOSE THAT HAVE SKIP SET TO FALSE */


        // data = JSON.parse(data); doesnt work
        // console.log('data ' + data); doesnt work

        // console.log(req.file);
        // console.log(req.file.mimetype);
        // console.log(data);


        while (i < elements.length) {
            if (!elements[i].skip) {
                if (!validate.validate(elements[i].value, elements[i].regex)) {
                    error = true;
                    elements[i].status = "error";

                } else {
                    filename = elements[i].value;
                    // console.log('filename ' + filename);
                }
            } else if (elements[i].id == 'file') {
                if (!req.file || req.file.mimetype !== 'application/pdf' || req.file > 100000) {
                    error = true;
                    elements[i].status = "error";
                }
            }
            i++;
        }

        // console.log('values ' + values);
        ;

        /* IF THERE ARE ANY ERRORS THEN SEND AN ERROR OBJECT BACK */
        if (error) {
            general.removeAllFiles('./tmp');
            elements = JSON.stringify(elements);
            res.send(elements);
            return;
        }

        // add function to add job asset here - left off may 14 SAL

        /* IF EVERYTHING CHECKS OUT THEN COMPLETE UPLOADING FILE. */
        /* GET THE ACCOUNT FOLDER NAME */




        sql = "SELECT folder FROM account WHERE id=?";
        values = [data.acctId];

        queries.bindedSelect(sql, values, function (err, result) {
            foldername = result[0].folder;
            // accountId = result[0].account_id;
            // console.log('values ' + values);
            // console.log('result ' + result[0]);
            // console.log('foldername ' + foldername);
            // return;


            sql = "SELECT folder FROM job WHERE id=?";
            values = [data.jobId];

            queries.bindedSelect(sql, values, function (err, result) {

                foldernameJob = result[0].folder
                // console.log('foldername ' + foldername);
                // console.log('foldernameJob ' + foldernameJob);
                // return;

                fs.rename('./tmp/' + req.file.filename, './public/account_folders/' + foldername + "/" + foldernameJob + "/" + req.file.filename + '.pdf', function (err) {
                    if (err) {
                        res.send('filemoveerror');
                    } else {

                        /* PUT INTO DATABASE */
                        sql = "INSERT INTO job_asset (job_id, name, file) VALUES (?, ?, ?)";

                        values = [data.jobId, filename, req.file.filename + '.pdf'];
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
        });

    },


    // sql = "INSERT INTO account_asset (account_id, name, file) VALUES (?, ?, ?)";


    // gets job list to display jobasset form
    getAccountJobAsset: function (req, res) {
        var sql, values, i = 0,
            data, list, account_id, req;

        account_id = req.body.data;

        // account_id = JSON.parse(account_id);


        values = [account_id];
        // console.log(values);
        list = '<div class="col-md-6"><label for="jobList" class="">Select a Job</label><br><select class="custom-select" id="jobList"><option value="0">Select a Job</option></div>';
        sql = "SELECT id, name FROM job WHERE account_id = ?";

        queries.bindedSelect(sql, values, function (err, results) {
            // console.log(values, results);
            if (results.length == 0) {
                res.send('<p class="col-md">There are no jobs for that account</p>');
            } else {
                while (i < results.length) {
                    list += `<option value="${results[i].id}">${results[i].name}</option>`;
                    i++;
                }

                list += '</select>'

                res.send(list);

            }



        });



    },

    // ${result[0].name} line 56 value when loading data from database

    updateJobNoteForm: function (req, res) {

        var data, sql, values = [],
            i = 0,
            form;

        data = req.body.data;


        data = JSON.parse(data);

        // console.log(`data ` + data.fileid);



        values.push(data.fileid);

        // console.log(values);
        // delete data.fileid;
        // return;

        sql = "SELECT * FROM job_note where id =?";

        // form = '<div class="box"><div class="heading">Heading</div><div class="body">Body text';
        var form = '<div class="form-row"><div class="col-md mb-3">';
        queries.bindedSelect(sql, values, function (err, results) {


            if (results.length == 0) {
                data = {
                    masterstatus: "err",
                    msg: "There was an error adding the job note."
                }
                data = JSON.stringify(data);
                res.send(data);
            } else {

                form = '<div class="formModal box">';

                while (i < results.length) {

                    form += '<div class="form-row"><label for="dateFormat">Date</label><input type="date" class="form-control" id="dateFormat" value="' + results[0].note_date + '"></div><div class="form-row"><div class="col-md mb-3"><label for="name">Note Title</label><input type="text" class="form-control" id="name" value="' + results[0].note_name + '"></div></div><div class="form-row"> <div class="col-md mb-3"> <label for="text">Note Text</label><textarea type="textarea" rows="10" class="form-control" id="text"> ' + results[0].note + ' </textarea></div></div><div class="form-row"><div class="btns"><input data-action="update" type="button" id="' + "A" + results[0].id + '" value="Update Note" class="leftbtn btn btn-primary mx-1"><input class="btn btn-danger mx-1"type="button" id="rightbtn" value="Cancel"></div>';
                    /*"D" + results[0].id +*/
                    // form += [results[0].note];
                    form += '</div>';
                    i++;

                }
                // data.results = results;
                // delete data.fileid;

                // data = JSON.stringify(data)
                form = JSON.stringify(form);

                // console.log(data);
                // return;

                res.send(form);

            }



        })
    },


    /*'<label for="dateFormat">Date</label><input type="date" class="form-control" id="dateFormat" value="' + formData.results[0].note_date + '"></div></div><div class="form-row"><div class="col-md mb-3"><label for="name">Note Title</label><input type="text" class="form-control" id="name" value="' + formData.results[0].note_name + '"></div></div><div class="form-row"> <div class="col-md mb-3"> <label for="text">Note Text</label><textarea type="textarea" rows="10" class="form-control" id="text" value="' + formData.results[0].note + '"></textarea> </div></div>';*/


    submitJobNote: function (req, res) {

        var data, sql, values = [],
            i = 0,
            error;

        data = [req.body.data];

        data = JSON.parse(data);

        /* console.log('data ' + data.jobId);
         console.log('data flag = ' + data.flag);
         console.log('data elements date' + data.elements[0].value);
         console.log('data elements title ' + data.elements[1].value);
         console.log('data elements note ' + data.elements[2].value);
         return*/

        /* PUT INTO DATABASE */
        // console.log(data.elements.length);

        while (i < data.elements.length) {
            if (!validate.validate(data.elements[i].value, data.elements[i].regex)) {
                data.elements[i].status = 'error';
                error = true;

                // console.log(data.elements[i].status);
            } else {
                /* VALUES AREA PUT INTO AN ARRAY SO I CAN BIND THEM TO THE SQL STATEMENT LATER */
                values.push(data.elements[i].value);
                // continue
                // console.log(values);

            }
            i++;
        }

        // return;

        if (error) {
            data.masterstatus = "errors";
            data = JSON.stringify(data);
            res.send(data);
        } else {
            // return;
            if (data.flag == 'add') {

                values.unshift(data.jobId);
                values = values;
                // console.log(values);
                // return;
                // values = [data.jobId, data.elements[0].value, data.elements[1].value, data.elements[2].value];
                sql = "INSERT INTO job_note (job_id, note_date, note_name, note) VALUES (?,?,?,?)";

                // console.log(values);
                // return;
                queries.bindedSelect(sql, values, function (err, result) {

                    // console.log(values);



                    if (err) {
                        data = {
                            masterstatus: "err",
                            msg: "There was an error adding the job note."
                        }
                        data = JSON.stringify(data);
                        res.send(data);
                    } else {
                        data = {
                            masterstatus: "success",
                            msg: "The job note has been added."
                        }
                        data = JSON.stringify(data);
                        res.send(data);
                    }

                });
            } else if (data.flag == 'update') {

            }
            // return


        }

    },

    updateJobNote: function (req, res) {

        var data, values = [],
            i = 0,
            id, error, sql;

        data = [req.body.data];

        data = JSON.parse(data);

        // console.log(data);
        // return;
        id = data.job_note_id;

        // delete data.job_note_id;

        // console.log(data);
        // console.log("values " + values);


        // return;

        // return;

        while (i < data.elements.length) {
            if (!validate.validate(data.elements[i].value, data.elements[i].regex)) {
                data.elements[i].status = 'error';
                error = true;

                // console.log(data.elements[i].status);
            } else {
                /* VALUES AREA PUT INTO AN ARRAY SO I CAN BIND THEM TO THE SQL STATEMENT LATER */
                values.push(data.elements[i].value);

                // console.log(values);

            }
            i++;
        }
        // console.log(values);
        // console.log(data.elements[0]);
        // return;
        if (error) {
            data.masterstatus = "errors";
            data = JSON.stringify(data);
            res.send(data);
        }

        if (data.flag == 'update') {

            values.unshift(data.jobId);
            values.push(id);
            /* values.push(data.elements[0].note_date);
             values.push(data.elements[0].note_name);
             values.push(data.elements[0].note);

             // console.log(job_note_id);
             // return;

             values.push(id);*/
            // console.log(values);
            // return;
            sql = "UPDATE job_note SET job_id=?, note_date=?, note_name=?, note=? WHERE id=?";

            // console.log(values);
            // return;
            queries.bindedSelect(sql, values, function (err, result) {

                // consovarle.log(values);
                var data;



                if (err) {
                    data = {
                        masterstatus: "err",
                        msg: "There was an error adding the job note."
                    }
                    data = JSON.stringify(data);
                    res.send(data);
                } else {

                    data = {
                        masterstatus: "success",
                        msg: "The job note has been added."
                    }
                    data = JSON.stringify(data);
                    res.send(data);
                }

            });
        }

    },
    /*
                                                    
                                                                if (err) {
                                                                    res.send('inserterror');
                                                                } else {
    
                                                                    res.send('success');
                                                                }
                                                           
                                                        }
                                                   
                                                });

                                            },*/

    addUpdateJobs: function (req, res) {
        var data = req.body.data,
            i = 0,
            // error = false,
            values = [],
            path, sql = "",
            foldername, sdata;
        // console.log("job 78 " + data); data arrives here
        data = JSON.parse(data);
        // sdata = JSON.stringify(data); data arrives here

        /* HERE WE ARE CHECKING THE DUPLICATES FIRST THEN WE ARE CALLING THE ADDUPDATE PROCESS ON A SUCCESSFULL CALLBACK. */
        general.checkDuplicates(data.elements, data.flag, data.acctId, function (err, result) {
            // console.log(sdata + ` + ` + result[0].name); acctId = accountid

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
                addUpdateJobsProc(res, data);
            }
        });
    },


    getAccountJob: function (req, res) {
        var sql, values, i = 0,
            data, list, account_id, req;

        account_id = req.body.data;

        // account_id = JSON.parse(account_id);


        values = [account_id];
        // console.log(values);
        // return
        // console.log(values);
        list = '<div class="col-md-6"><label for="jobList" class="">Select a Job</label><br><select class="custom-select" id="jobList"><option value="0">Select a Job</option></div>';
        sql = "SELECT id, name FROM job WHERE account_id = ?";

        queries.bindedSelect(sql, values, function (err, results) {
            // console.log(values, results);
            if (results.length == 0) {
                res.send('<p class="col-md">There are no jobs for that account</p>');
            } else {
                while (i < results.length) {
                    list += `<option value="${results[i].id}">${results[i].name}</option>`;
                    i++;
                }

                list += '</select>'

                res.send(list);

            }



        });



    },

    showUpdateJobForm: function (req, res) {
        var sql, values, i = 0,
            j = 0,
            data, list, account_id, req;

        account_id = req.body.data;

        // account_id = JSON.parse(account_id);


        values = [account_id];
        // console.log(values);
        list = '<div class="col-md-6"><label for="jobList" class="">Select a Job</label><br><select class="custom-select" id="jobList"><option value="0">Select a Job</option></div>';
        sql = "SELECT id, name FROM job WHERE account_id = ?";

        queries.bindedSelect(sql, values, function (err, results) {

            // console.log(values, results);

            if (results.length == 0) {
                res.send('<p class="col-md">There are no jobs for that account</p>');
            } else {
                while (i < results.length) {
                    list += `<option value="${results[i].id}">${results[i].name}</option>`;
                    i++;
                }

                list += '</select> <br>';
                // res.send(list);




                res.send(list);

            }
            // return;




        });



    },

    jobNoteForm: function (req, res) {

        var sql, values = [],
            data, job_id, i = 0,
            table;

        data = [req.body.data];
        data = JSON.parse(data);


        // job_id = data.elements[0].value;
        // job_id = data;
        // console.log(data);
        // console.log(data.elements[0].value);
        job_id = data.elements[0].value;
        console.log(job_id);
        // console.log(values);
        values.push(job_id);
        // values = values.push(job_id);
        console.log(values);

        // return;

        sql = "SELECT id AS jobID, note_date AS noteDate, note_name AS noteName, note AS Note FROM job_note WHERE job_id=?"

        queries.bindedSelect(sql, values, function (err, results) {



            // console.log(results);
            // return;
            if (err) {

                res.send("<p>There was an error getting the job</p>");

            } else if (results.length === 0) {

                res.send('<p>There are no jobs for that account</p>');
            } else {
                table = `<table class="table table-bordered"><thead><tr><th>Date</th><th>Note Name</th><th>Note</th><th>Update</th><th>Delete</th></tr></thead><tbody>`;

                while (i < results.length) {

                    table += `<tr><td>` + results[i][`noteDate`] + `</td><td>` + results[i][`noteName`] + `</td><td>` + results[i][`Note`] + `</td><td><input type="button" class="btn btn-primary" id="A${results[i][`jobID`]}" value="Update"></td><td><input type="button" class="btn btn-danger" id="D${results[i][`jobID`]}" value="Delete"></td></tr>`;

                    i++
                }


                res.send(table);

                // return;


            }

        })
    },






    // test innerhtml below. this is where you build form for add jobs page
    viewJobNoteForm: function (req, res) {

        var form, sql, i = 0,
            values;
        values = [req.body.data];

        // console.log("values is equal jobId " + values);
        sql = "SELECT contact.name AS name, contact.work_phone AS work_phone, contact.mobile_phone AS mobile_phone, contact.email AS email FROM contact, account_job_contact WHERE job_id = ? AND contact_id = contact.id  ORDER BY contact.name ASC";
        // values = [jobId];
        queries.bindedSelect(sql, values, function (err, result) {
            if (err) {
                res.send("<p>There was an error getting the contacts</p>");
            } else if (result.length == 0) {
                res.send("<p><br>There are no contacts to list</p>");
            } else {
                form = ` <div class="form-row">
            

        </div>
        <div class="form-row">
            <div class="col-md mb-3">
                <label for="dateFormat">Date</label>
                <input type="date" class="form-control" id="dateFormat" placeholder="Date">
            </div>
        </div>

        <div class="form-row">
            <div class="col-md mb-3">
                <label for="name">Note Title</label>
                <input type="text" class="form-control" id="name" placeholder="Fake Job Note">
            </div>
        </div>

        <div class="form-row">
            <div class="col-md mb-3">
                <label for="text">Note Text</label>
                <textarea type="textarea" rows="10" class="form-control" id="text" placeholder="Fake job note text here"
                ></textarea>
            </div>
        </div>
            <div class="form-row">
            <button class="btn btn-primary" type="button" id="addJobNoteButton" data-action="add">Add Job</button>
            </div>`;




            }

            res.send(form);





        });
    },




    jobContactTablePost: function (req, res) {

        var sql, values, i = 0,
            data, list, accountId;

        values = [req.body.data];
        values = JSON.parse(values);
        // console.log(values[0].value);
        // console.log(data);
        // return;

        // console.log(values);
        // return;

        (function jobList(acctId, cb) {


            list = '<label for="jobList">Select a Job</label><br><select class="custom-select col-md-4" id="jobList"><option value="0">Select a Job</option>';

            sql = "SELECT id, name FROM job WHERE account_id = ?";

            // values = values[0].value;


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

                    list += '</select><br><div id="contactTable"></div>'
                    res.send(list);
                }
            });
        })()


    },

    /* CREATES A VIEW ONLY CONTACT TABLE */
    jobContactTable: function (req, res) {
        var table, sql, i = 0,
            values;
        values = [req.body.data];

        // console.log("values is equal jobId " + values);
        sql = "SELECT contact.name AS name, contact.work_phone AS work_phone, contact.mobile_phone AS mobile_phone, contact.email AS email FROM contact, account_job_contact WHERE job_id = ? AND contact_id = contact.id  ORDER BY contact.name ASC";
        // values = [jobId];
        queries.bindedSelect(sql, values, function (err, result) {
            if (err) {
                res.send("<p>There was an error getting the contacts</p>");
            } else if (result.length == 0) {
                res.send("<p><br>There are no contacts to list</p>");
            } else {
                table = `<br><table class="table table-bordered"><thead><tr><th>Name</th><th>Work Phone</th><th>Mobile Phone</th><th>Email</th></tr></thead><tbody>`;
                while (i < result.length) {
                    table += `<tr><td>${result[i].name}</td><td>${result[i].work_phone}</td><td>${result[i].mobile_phone}</td><td>${result[i].email}</td></tr>`;
                    i++;
                }
                table += `</tbody></table>`;
                res.send(table);
            }
        });
    },





    addUpdateJobsProc: function (req, res) {
        var i = 0,
            error, values = [],
            path, sql = "",
            acctId,
            foldername, data = req.body.data;
        data = JSON.parse(data);
        // console.log(data);
        // console.log(`values  ,` + values + `data ` + data);
        /* LOOPS THROUGH THE ARRAY OF OBJECTS AND CHECKS THE DATA AGAINST THE REGEX.  IF ERROR CHANGES STATUS TO ERROR OTHERWISE CHANGES STATUS TO SUCCESS. */
        while (i < data.elements.length) {
            if (!validate.validate(data.elements[i].value, data.elements[i].regex)) {
                data.elements[i].status = 'error';
                error = true;
            } else {
                /* VALUES AREA PUT INTO AN ARRAY SO I CAN BIND THEM TO THE SQL STATEMENT LATER */
                values.push(data.elements[i].value);
                values.unshift(data.acctId);
                // console.log(values);
                // return;
            }
            i++;
        }
        if (error) {
            data.masterstatus = "errors";
            data = JSON.stringify(data);
            res.send(data);
        } else {
            // console.log(data);
            // return;
            // console.log(values[0]);
            // console.log(data);
            /* THIS METHOD IS USED FOR ADDING NEW ACCOUNTS.  ACCOUNT FOLDERS WILL BE STORED WITH THE ACCOUNT NAME AND A TIMESTAMP TO KEEP EVERYTHING UNIQUE */
            if (data.flag === 'add') {

                sql = "SELECT folder FROM account WHERE id=?";

                // values = data.acctId;
                // console.log(values);
                // return;
                // console.log(values);
                // return;
                //VALUE NEEDS TO BE HERE
                // console.log(values);

                queries.bindedSelect(sql, values, function (err, result) {
                    // console.log(result[0].folder);



                    // return;
                    /* CREATE FOLDER NAME FOR ACCOUNT. THE FOLDER NAME IS THE ACCOUNT NAME PLUS A TIME STAMP TO MAKE IT UNIQUE */
                    /* ANY SPACES IN A FOLDER NAME WILL BE REPLACED WITH A HYPHEN */
                    foldername = data.elements[0].value;
                    foldername = data.elements[0].value.split(" ").join("_");
                    foldername = foldername.toLowerCase();
                    foldername = foldername + Date.now();

                    // console.log(result[0].folder + '/' + foldername);
                    // console.log(values);
                    // console.log(result[0]);
                    // return;

                    // console.log(values[0]);
                    /* ONCE I CREATE THE FOLDER NAME I ADDED IT TO THE VALUES ARRAY SO THE NAME WILL BE IN THE DATABASE */
                    values.push(foldername);
                    // console.log(foldername);
                    // console.log(values);
                    // return;
                    // acctId = data.acctId;
                    // values.unshift(acctId);
                    // console.log(acctId);

                    //BEFORE YOU ADD THE FOLDER TO DATABASE YOU NEED THE ACCOUNT FOLDER THAT THE JOB FOLDER WILL GO INTO SO YOU MUST GET THAT FOLDER NAME FIRST
                    //SELECT FOLDER FROM ACCOUNT WHERE ID = ?  THE ? IS THE ID FOR THE ACCOUNT YOU SELECTED.

                    // console.log(values);
                    // sql = "INSERT INTO folder WHERE id=?";

                    /* I FIRST CREATE THE ACCOUNT FOLDER AND THEN ADD THE ACCOUNT TO THE DATABASE*/
                    path = "./public/account_folders/" + result[0].folder + '/' + foldername;
                    // console.log(path);
                    fs.mkdir(path, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            // values.push(data.elements[0].field.value);
                            // console.log(values);
                            // console.log(result[0]);
                            // return;
                            // values = values.push(data.elements[0])
                            /* THIS ADDS THE VALUES TO THE DATABASE */
                            // sql = "INSERT INTO account WHERE id=?";
                            sql = "INSERT INTO job (account_id, name, folder) VALUES (?, ?, ?)";
                            queries.bindedOther(sql, values, function (err, result) {
                                // console.log(values)
                                // return;
                                // console.log(`result ` + result);
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
                    }); /*end mk dir */
                });
            }

            /* THIS METHOD IS BEING USED TO UPDATE THE ACCOUNT INFORMATION.  THE FOLDER IS NOT UPDATED OR ALLOWED TO BE UPDATED */
            else if (data.flag === 'update') {
                values.push(data.acctId);
                sql = "UPDATE job SET name=?  WHERE id=?";
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
}





/*THIS PROVIDES THE CONTENT FOR THE JOBS PAGE*/
/*getJob: function (req, res) {
        res.render('partials/jobs/addJob', {
            title: 'Add Job',
            heading: 'Add job',
            nav: true,
            addJob: true,
            scripts: [{
                'script': 'addJobs.js'
            }]
        });
    },

    addJA: function (req, res) {
        res.render('partials/jobs/addJobAsset', {
            title: 'Add Job Asset',
            heading: 'Add Job Asset',
            nav: true,
            addJobAsset: true,
            scripts: [{
                'script': 'addJobAsset.js'
            }]
        });
    },

    addJH: function (req, res) {
        res.render('partials/jobs/addJobHours', {
            title: 'Add Job Hours',
            heading: 'Add Job Hours',
            nav: true,
            addJobHours: true,
            scripts: [{
                'script': 'addJobHours.js'
            }]
        });
    },

    addJN: function (req, res) {
        res.render('partials/jobs/addJobNote', {
            title: 'Add Job Note',
            heading: 'Add Job Note',
            nav: true,
            addJobNote: true,
            scripts: [{
                'script': 'addJobNote.js'
            }]
        });
    },


    vdJA: function (req, res) {
        res.render('partials/jobs/viewDeleteJobAsset', {
            title: 'View Delete job Asset',
            heading: 'View Delete Job Asset',
            nav: true,
            viewDeleteJobAsset: true
        });
    },

    vJC: function (req, res) {
        res.render('partials/jobs/viewJobContacts', {
            title: 'View Job Contacts',
            heading: 'View Job Contacts',
            nav: true,
            viewJobContacts: true
        });
    },

    vudJN: function (req, res) {
        res.render('partials/jobs/viewUpdateDeleteJobNote', {
            title: 'View Update Delete Job Notes',
            heading: 'View Update Delete Job Notes',
            nav: true,
            viewUpdateDeleteJobNote: true
        });
    },

    udjHours: function (req, res) {
        res.render('partials/jobs/updateDeleteJobHours', {
            title: 'Update Delete Job Hours',
            heading: 'Update Delete Job Hours',
            nav: true,
            updateDeleteJobHours: true
        });
    },

    pI: function (req, res) {
        res.render('partials/jobs/printInvoice', {
            title: 'Print Invoice',
            heading: 'Print Invoice',
            nav: true,
            printInvoice: true
        });
    }
*/




/*function addUpdateJobsProc(res, data) {
    var sql, values = [],
        foldername, data, error, elements, i = 0,
        j = 0,
        path, filename;

    console.log(res);

    /* VALIDATE ONLY THOSE THAT HAVE SKIP SET TO FALSE */
/*while (i < elements.length) {
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
}*/
/*
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

    /* IF THERE ARPpE ANY ERRORS THEN SEND AN ERROR OBJECT BACK */
/* if (error) {
     general.removeAllFiles('./tmp');
     elements = JSON.stringify(elements);
     res.send(elements);
     return;
 }*/
/* IF EVERYTHING CHECKS OUT THEN COMPLETE UPLOADING FILE. */
/* GET THE ACCOUNT FOLDER NAME */
/*if (error) {
    data.masterstatus = "errors";
    data = JSON.stringify(data);
    res.send(data);
} else if (data.flag === 'add') {
    // console.log(values[0]);
    /* CREATE FOLDER NAME FOR ACCOUNT. THE FOLDER NAME IS THE ACCOUNT NAME PLUS A TIME STAMP TO MAKE IT UNIQUE */
/* ANY SPACES IN A FOLDER NAME WILL BE REPLACED WITH A HYPHEN */
/*     foldername = values[0].split(" ").join("_");
     foldername = foldername.toLowerCase();
     foldername = foldername + Date.now();



     /* ONCE I CREATE THE FOLDER NAME I ADDED IT TO THE VALUES ARRAY SO THE NAME WILL BE IN THE DATABASE */
/*     values.push(foldername);

     // sdata = JSON.stringify(data);
     // console.log(sdata);
     /* THIS ADDS THE VALUES TO THE DATABASE */
// values.push(foldername);
/*    while (j < values.length) {
        console.log(values[j])
        j++;
    }

    path = "./public/account_folders/" + foldername;
    fs.mkdir(path, function (err) {

        if (err) {
            console.log(err);
        } else {

            sql = "SELECT contact FROM account WHERE id=?"
            // values = [req.body.acctId]
            queries.bindedSelect(sql, values, function (err, result) {



                foldername = result[0].folder;
                fs.rename('./tmp/' + req.file.filename, './public/account_folders/' + foldername + "/" + req.file.filename + '.pdf', function (err) {
                    if (err) {
                        res.send('filemoveerror');
                    } else {
                        /* PUT INTO DATABASE */
/*                          sql = "INSERT INTO job (account_id, name, folder) VALUES (?, ?, ?)";

                            values = [req.body.acctId, filename, req.file.filename + '.pdf'];
                            console.log(values);
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

            }
        });

    }

}*/