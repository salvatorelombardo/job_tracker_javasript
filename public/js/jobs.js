"use strict";

var jobs = {}

jobs.init = function () {

    if (Util.getEl('#addUpdateJobs').length != 0) {
        Util.addLis(Util.getEl('#addUpdateJobs')[0], 'click', jobs.addUpdateJobs);
    }

    if (Util.getEl('#addJob').length != 0) {
        Util.addLis(Util.getEl('#accountList')[0], 'change', jobs.showJob);
    }
    if (Util.getEl('#addUpdateJobs').length != 0) {
        Util.addLis(Util.getEl('#addUpdateJobs')[0], 'click', jobs.addUpdateJobs);
    }

    if (Util.getEl('#viewJobContacts').length != 0) {
        Util.addLis(Util.getEl('#accountList')[0], 'change', jobs.viewJobsContact);
    }

    if (Util.getEl('#viewJobContacts').length != 0) {
        Util.addLis(Util.getEl('#jobList')[0], 'change', jobs.displayJobTable)
    }
    // addd job note // shows account list
    if (Util.getEl('#addJobNote').length != 0) {
        Util.addLis(Util.getEl('#accountList')[0], 'change', jobs.addJobNoteList)
    }

    if (Util.getEl('#addJobNoteButton').length != 0) {
        Util.addLis(Util.getEl('#addJobNoteButton')[0], 'click', jobs.showJobNoteForm)

    }

    if (Util.getEl('#addUpdateJobNote').length != 0) {
        Util.addLis(Util.getEl('#accountList')[0], 'change', jobs.updateJobNoteList)
    }

    if (Util.getEl('.jobnotemodal').length != 0) {
        Util.addLis(Util.getEl('.jobnotemodal')[0], 'click', jobs.jobnotemodal)
    }

    //accesses account list for value - used to retireve jobs associated with account
    if (Util.getEl('#addJobAsset').length != 0) {
        Util.addLis(Util.getEl('#accountList')[0], 'change', jobs.addJobAssetList)
    }

    if (Util.getEl('#addJobAsset').length != 0) {
        Util.addLis(Util.getEl('#addJobAssetButton')[0], 'click', jobs.addJobAsset)
    }

    if (Util.getEl('#viewJobAsset').length != 0) {
        Util.addLis(Util.getEl('#accountList')[0], 'change', jobs.showJobForAsset);
    }

    if (Util.getEl('#assetTable').length != 0) {
        Util.addLis(Util.getEl('#assetTable')[0], 'click', jobs.deleteJobAsset)
    }

    // if page loaded is add job hours - get page id - check it exists.
    // if esists get account list 
    // add listener
    // on change run function to access account
    // list select menu
    if (Util.getEl('#addJobHours').length != 0) {
        Util.addLis(Util.getEl('#accountList')[0], 'change', jobs.addJobHours)
    }

    if (Util.getEl('#addJobHoursButton').length != 0) {
        Util.addLis(Util.getEl('#addJobHoursButton')[0], 'click', jobs.addJobHoursPost)
    }


    if (Util.getEl('#viewUpdateDeleteJobHours').length != 0) {
        Util.addLis(Util.getEl('#accountList')[0], 'change', jobs.updateDeleteJobHours)
    }

    if (Util.getEl('#hoursTable').length != 0) {
        Util.addLis(Util.getEl('#hoursTable')[0], 'click', jobs.jobHoursModal)


    }

    if (Util.getEl('#printJobInvoice').length != 0) {
        Util.addLis(Util.getEl('#accountList')[0], 'change', jobs.printInvoice)
    }

    if (Util.getEl('#displayInvoice').length != 0) {
        Util.addLis(Util.getEl('#displayInvoice')[0], 'click', jobs.sendInvoice)
    }

    if (Util.getEl('#printInvoice').length != 0) {
        Util.addLis(Util.getEl('#printInvoice')[0], 'click', jobs.sendToPrinter)
    }

}


jobs.sendToPrinter = function () {

    window.print();
}

jobs.sendInvoice = function () {

    var elements, data = {};

    elements = [{

        id: 'jobList',
        value: Util.getEl('#jobList')[0].value,
        msg: "Please select a job",
        status: "checking",
        beginDate: Util.getEl('#beginningDate')[0].value,
        endDate: Util.getEl('#endingDate')[0].value,
        acct_id: Util.getEl('#accountList')[0].value

    }]




    // console.log(elements[0]);


    data.elements = elements;


    data = JSON.stringify(data);

    Util.sendRequest('/postInvoiceTable', function (res) {

        // return

        Util.getEl('#result2')[0].innerHTML = res.responseText


    }, data)


}

jobs.printInvoice = function () {

    var accountid, elements;
    accountid = Util.getEl('#accountList')[0].value;

    /* NEED TO DO A QUICK FRONT END CHECK TO MAKE SURE THE USER SELECTS AN ACCOUNT */
    elements = [{
        id: 'accountList',
        value: accountid,
        msg: 'You must select an account',
        status: 'checking'
    }]

    /* THIS CHECKS TO SEE IF THE USER SELECTED AN ACCOUNT OR NOT. IF THEY DID NOT THEN THE GENERAL.SELECTCHECK
    METHOD DISPLAYS A MESSAGE AND RETURNS TRUE.  IF TRUE IS RETURNED THEN DIV WITH ID OF RESULT IS CLEARED AND
    RETURN TERMINATES ANY FURTHER EXECUTION OF THE SCRIPT*/
    if (General.selectCheck(elements)) {
        Util.getEl('#result')[0].innerHTML = "";
        return;
    }

    /* IF AN ACCOUNT IS SELECTED THEN GET DISPLAY A FORM WITH THE ACCOUNT DETAILS AND ASSIGN AN EVENT LISTENER TO THE
    FORM BUTTON */
    Util.sendRequest('/printJobInvoice', function (res) {
        Util.getEl('#result')[0].innerHTML = res.responseText;


        if (Util.getEl('#result')[0] != undefined) {
            Util.addLis(Util.getEl('#jobList')[0], 'change',
                jobs.showPrintJobInvoice
            )
        }

    }, accountid);





}


jobs.showPrintJobInvoice = function () {



    var job_id, elements;

    if (Util.getEl('#jobList')[0].value === 'undefined') {

        return

    } else {


        job_id = Util.getEl('#jobList')[0].value;

    }


    elements = [{

        id: 'jobList',
        value: Util.getEl('#jobList')[0].value,
        msg: "Please select a job",
        status: "checking",

    }]


    if (General.selectCheck(elements)) {

        Util.getEl('.addassetform')[0].style.display = 'none';

    } else {

        Util.getEl('.addassetform')[0].style.display = 'block';
    }





}

jobs.jobHoursModal = function (e) {

    var data = {},
        e, rownumber;

    if (e.target.value == 'Delete') {
        General.okayCancelMsg();
        Util.addLis(Util.getEl('#rightbtn')[0], 'click', function () {
            Util.closeMsgBox();
            console.log(e.target.id.substring(1))
        });
        Util.addLis(Util.getEl('#leftbtn')[0], 'click', function () {
            Util.closeMsgBox();
            data.fileid = e.target.id.substring(1);
            rownumber = e.target.parentNode.parentNode.rowIndex;
            data = JSON.stringify(data);
            Util.sendRequest('/deleteJobHours', function (res) {
                switch (res.responseText) {
                    case "success":
                        if (Util.getEl('.table')[0].rows.length > 0) {
                            Util.getEl('.table')[0].deleteRow(rownumber);
                            if (Util.getEl('.table')[0].rows.length == 1) {
                                Util.getEl('#result')[0].innerHTML = "<p>There are no job notes to list</p>";
                            }
                        } else {
                            Util.getEl('#result')[0].innerHTML = "<p>There are no job notes to list</p>";
                        }
                        break;
                    case "dberror":
                        Util.msgBox({
                            heading: {
                                text: 'ERROR',
                                background: '#FF1493',
                                color: 'white'
                            },
                            body: {
                                text: "There was a problem deleting the job note record."
                            }
                        });
                        setTimeout(Util.closeMsgBox, 2500);
                        break;
                }
            }, data);

        })

    }

    if (e.target.value == 'Update') {

        var data = {};

        data.fileid = e.target.id.substring(1);

        data = JSON.stringify(data);

        console.log('barff');
        Util.sendRequest('/updateJobHoursForm', function (res) {
            // var formData;



            var form, textArea;

            form = res.responseText;
            form = JSON.parse(form);


            Util.getEl('#msgbox')[0].style.display = 'block';
            Util.getEl('#msgbox')[0].innerHTML = form;


            General.formModal();

            Util.addLis(Util.getEl('#rightbtn')[0], 'click', function () {
                Util.closeMsgBox();
            })




            Util.addLis(Util.getEl('.leftbtn')[0], 'click', function () {
                Util.closeMsgBox();
                jobs.updateJobHoursPost();

            })




        }, data);




    }

}

jobs.updateJobHoursPost = function () {

    var data = {},
        elements, job_id, jobHourId = {},
        i,

        job_id = Util.getEl('#jobList')[0].value;

    elements = [{

            id: 'dateFormat',
            value: Util.getEl('#dateFormat')[0].value,
            regex: 'dateFormat',
            msg: 'Date must be mm/dd/yyyy',
            status: 'checking',

        }, {
            id: 'number',
            value: Util.getEl('#number')[0].value,
            regex: 'number',
            msg: 'Note name cannot be blank and must be alpha/numeric characters only',
            status: 'checking'
        },
        {
            id: 'hours',
            value: Util.getEl('#hours')[0].value,
            regex: 'alphaNum',
            msg: 'Note cannot be blank and must be alpha/numeric characters only',
            status: 'checking'

        },
        {
            id: 'text',
            value: Util.getEl('#text')[0].value,
            regex: 'text',
            msg: 'Note cannot be blank and must be alpha/numeric characters only',
            status: 'checking'



        }
    ]




    jobHourId = document.getElementsByTagName('input');

    for (i = 0; i < jobHourId.length; i++) {

        if (jobHourId[i].value == 'Update') {
            jobHourId.id = jobHourId[i].id

        }

    }








    data = {
        flag: 'update',
        masterstatus: "checking",
        jobId: job_id,
        id: jobHourId.id.substring(1),
    }

    // console.log(data);
    // return;

    data.elements = elements;

    // console.log('elements ' + elements[0].value + ' ,' + elements[1].value + ', ' + elements[2].value + ' ,' + elements[3].value);
    // console.log('data ' + data.jobId);
    // return

    data = JSON.stringify(data);

    Util.sendRequest('/updateJobHoursPost', function (res) {
        // return     
        var obj;

        obj = JSON.parse(res.responseText);

        switch (obj.masterstatus) {

            case 'errors':
                General.displayErrors(obj.elements);
                break;
            case 'err':
                Util.msgBox({
                    heading: {
                        text: 'ERROR',
                        background: '#FF1493',
                        color: 'white'
                    },
                    body: {
                        text: obj.msg
                    }
                });
                setTimeout(Util.closeMsgBox, 2500);
                break;
            case 'success':
                Util.msgBox({
                    heading: {
                        text: 'SUCCESS',
                        background: '#48E5C2',
                        color: 'white'
                    },
                    body: {
                        text: obj.msg
                    }
                });
                // General.clearJobForm();
                setTimeout(function () {
                    Util.closeMsgBox();
                    location.reload()
                }, 2500);
                break;
        }


    }, data)

}





jobs.updateDeleteJobHours = function () {

    var accountid, elements;
    accountid = Util.getEl('#accountList')[0].value;

    // console.log(accountid);
    // return;


    elements = [{
        id: 'accountList',
        value: accountid,
        msg: 'you must select an account',
        status: 'checking'
    }];

    if (General.selectCheck(elements)) {
        if (Util.getEl('#hoursTable')[0].value === undefined) {
            Util.getEl('#hoursTable')[0].innerHTML = ''
        }

        if (Util.getEl('#result')[0].firstElementChild.firstChild.nodeValue == "There are no jobs for that account") {
            Util.getEl('#hoursTable')[0].innerHTML = ''
        }
        return
    }

    Util.sendRequest('/updateDeleteJobHours', function (res) {

        Util.getEl('#result')[0].innerHTML = res.responseText;
        if (Util.getEl('#result')[0] != undefined) {
            Util.addLis(Util.getEl('#jobList')[0], 'change', jobs.showJobHoursTable)
        }


    }, accountid)



}

jobs.showJobHoursTable = function () {



    var data = {},
        elements, job_id;

    job_id = Util.getEl('#jobList')[0].value;

    elements = [{
        id: 'jobList',
        value: job_id,
        msg: 'you must select a job',
        status: 'checking'
    }];

    if (General.selectCheck(elements)) {
        return
    }

    data.elements = elements;

    data = JSON.stringify(data);


    Util.sendRequest('/updateDeleteJobHoursTable', function (res) {

        Util.getEl('#hoursTable')[0].innerHTML = res.responseText;


    }, data)




}

jobs.addJobHoursPost = function () {

    var data, elements, job_id;

    job_id = Util.getEl('#jobList')[0].value;

    elements = [{

            id: 'dateFormat',
            value: Util.getEl('#dateFormat')[0].value,
            regex: 'dateFormat',
            msg: 'Date must be mm/dd/yyyy',
            status: 'checking',

        }, {
            id: 'number',
            value: Util.getEl('#number')[0].value,
            regex: 'number',
            msg: 'Note name cannot be blank and must be alpha/numeric characters only',
            status: 'checking'
        },
        {
            id: 'hours',
            value: Util.getEl('#hours')[0].value,
            regex: 'alphaNum',
            msg: 'Note cannot be blank and must be alpha/numeric characters only',
            status: 'checking'

        },
        {
            id: 'text',
            value: Util.getEl('#text')[0].value,
            regex: 'text',
            msg: 'Note cannot be blank and must be alpha/numeric characters only',
            status: 'checking'



        }
    ]






    data = {
        flag: Util.getEl('#addJobHoursButton')[0].getAttribute('data-action'),
        masterstatus: "checking",
        jobId: job_id
    };

    data.elements = elements;

    // console.log('elements ' + elements[0].value + ' ,' + elements[1].value + ', ' + elements[2].value + ' ,' + elements[3].value);
    // console.log('data ' + data.jobId);
    // return

    data = JSON.stringify(data);

    Util.sendRequest('/addJobHoursPost', function (res) {
        // return     
        var obj;

        obj = JSON.parse(res.responseText);

        switch (obj.masterstatus) {

            case 'errors':
                General.displayErrors(obj.elements);
                break;
            case 'err':
                Util.msgBox({
                    heading: {
                        text: 'ERROR',
                        background: '#FF1493',
                        color: 'white'
                    },
                    body: {
                        text: obj.msg
                    }
                });
                setTimeout(Util.closeMsgBox, 2500);
                break;
            case 'success':
                Util.msgBox({
                    heading: {
                        text: 'SUCCESS',
                        background: '#48E5C2',
                        color: 'white'
                    },
                    body: {
                        text: obj.msg
                    }
                });
                // General.clearJobForm();
                setTimeout(function () {
                    Util.closeMsgBox();
                    location.reload()
                }, 2500);
                break;
        }


    }, data)



}


jobs.addJobHours = function () {

    var accountid, elements;
    accountid = Util.getEl('#accountList')[0].value;

    // console.log(accountid);
    // return;


    elements = [{
        id: 'accountList',
        value: accountid,
        msg: 'you must select an account',
        status: 'checking'
    }];

    if (General.selectCheck(elements)) {
        Util.getEl('#result')[0].innerHTML = "";
        Util.getEl('.addassetform')[0].style.display = 'none';
        return;
    }

    Util.sendRequest('/getJobHoursJob', function (res) {

        Util.getEl('#result')[0].innerHTML = res.responseText;
        if (Util.getEl('#result')[0] != undefined) {
            Util.addLis(Util.getEl('#jobList')[0], 'change', jobs.showJobHourForm)
        }


    }, accountid)


}


jobs.showJobHourForm = function () {


    var job_id, elements;

    if (Util.getEl('#jobList')[0].value === 'undefined') {

        return

    } else {

        job_id = Util.getEl('#jobList')[0].value;

    }


    elements = [{

        id: 'jobList',
        value: Util.getEl('#jobList')[0].value,
        msg: "Please select a job",
        status: "checking"
    }]


    if (General.selectCheck(elements)) {

        Util.getEl('.addassetform')[0].style.display = 'none';

    } else {

        Util.getEl('.addassetform')[0].style.display = 'block';
    }



    // console.log('barf');
    // return



}




jobs.showJobForAsset = function () {

    var accountid, elements;
    accountid = Util.getEl('#accountList')[0].value;

    /* NEED TO DO A QUICK FRONT END CHECK TO MAKE SURE THE USER SELECTS AN ACCOUNT */
    elements = [{
        id: 'accountList',
        value: accountid,
        msg: 'You must select an account',
        status: 'checking'
    }]

    /* THIS CHECKS TO SEE IF THE USER SELECTED AN ACCOUNT OR NOT. IF THEY DID NOT THEN THE GENERAL.SELECTCHECK
    METHOD DISPLAYS A MESSAGE AND RETURNS TRUE.  IF TRUE IS RETURNED THEN DIV WITH ID OF RESULT IS CLEARED AND
    RETURN TERMINATES ANY FURTHER EXECUTION OF THE SCRIPT*/
    /*if (General.selectCheck(elements)) {
        Util.getEl('#result')[0].innerHTML = "";

        return;
    }*/

    if (General.selectCheck(elements)) {
        Util.getEl('#result')[0].innerHTML = "";
        Util.getEl('#assetTable')[0].innerHTML = "";

        return;
    }



    // accountid = JSON.stringify(accountid);

    Util.sendRequest('/getAccountJobAsset', function (res) {

        Util.getEl('#result')[0].innerHTML = res.responseText;
        if (Util.getEl('#result')[0] != undefined) {
            Util.addLis(Util.getEl('#jobList')[0], 'change', jobs.showJobAsset)
        }


    }, accountid)

}

jobs.showJobAsset = function () {

    var elements, data = {},
        accountid;

    // accountid = Util.getEl('#accountList')[0].value;

    if (Util.getEl('#accountList')[0].value == 'undefined') {
        return
    } else {
        accountid = Util.getEl('#accountList')[0].value;
    }

    elements = [{

        id: 'jobList',
        value: Util.getEl('#jobList')[0].value,
        msg: "Please select a job",
        status: "checking"
    }]


    if (General.selectCheck(elements)) {
        Util.getEl('#result')[0].innerHTML = "";
        Util.getEl('#assetTable')[0].innerHTML = "";
        return;
    }


    data.elements = elements;
    data.accountid = accountid;

    // data.jobId = elements[0]['value'];
    console.log(data.accountid);

    // return
    data = JSON.stringify(data);

    Util.sendRequest('/jobAssetTable', function (res) {

        Util.getEl('#assetTable')[0].innerHTML = res.responseText;

        if (General.selectCheck(elements)) {
            Util.getEl('#assetTable')[0].innerHTML = "";

            return

        }






    }, data)



}


jobs.deleteJobAsset = function (e) {

    var data = {},
        rownumber, elements = [];
    if (e.target.value === 'Delete') {
        General.okayCancelMsg();
        Util.addLis(Util.getEl('#rightbtn')[0], 'click', function () {
            Util.closeMsgBox();
            console.log(e.target.id.substring(1))
        });

        Util.addLis(Util.getEl('#leftbtn')[0], 'click', function () {
            Util.closeMsgBox();
            data.fileid = e.target.id.substring(1);
            rownumber = e.target.parentNode.parentNode.rowIndex;


            // need to send over account info and job info - file id already accessed
            elements = [{
                accountId: Util.getEl('#accountList')[0].value,
                jobId: Util.getEl('#jobList')[0].value

            }]


            // console.log(elements[0]['accountId']);
            // console.log(elements[0]['jobId']);
            // return;

            data.elements = elements;
            data = JSON.stringify(data);


            Util.sendRequest('/deleteJobAsset', function (res) {
                switch (res.responseText) {
                    case "success":
                        if (Util.getEl('.table')[0].rows.length > 0) {
                            Util.getEl('.table')[0].deleteRow(rownumber);
                            if (Util.getEl('.table')[0].rows.length == 1) {
                                Util.getEl('#result')[0].innerHTML = "<p>There are no job notes to list</p>";
                            }
                        } else {
                            Util.getEl('#result')[0].innerHTML = "<p>There are no job notes to list</p>";
                        }
                        break;
                    case "dberror":
                        Util.msgBox({
                            heading: {
                                text: 'ERROR',
                                background: '#FF1493',
                                color: 'white'
                            },
                            body: {
                                text: "There was a problem deleting the job note record."
                            }
                        });
                        setTimeout(Util.closeMsgBox, 2500);
                        break;
                }
            }, data);



        });
    }
}



jobs.addJobAsset = function () {

    var data = {},
        json,
        formData,
        elements,
        error = false,
        blank;


    // clear all elements
    General.clearErrors();

    // create my elements array of error messages
    elements = [{
            id: 'name',
            value: Util.getEl('#name')[0].value,
            regex: 'alphaNum',
            msg: "File name cannot be blank and can only be alpha numeric characters no spaces or other punctuation",
            status: "checking",
            skip: false
        },
        {
            id: 'file',
            msg: "File cannot be blank, must be a pdf less than 100000 bytes",
            status: "checking",
            skip: true
        }
    ]

    /* CREATE A NEW FORMDATA OBJECT*/
    formData = new FormData();
    elements = JSON.stringify(elements);


    /* APPEND THE FILE NAME AND FILE*/
    formData.append('file', Util.getEl('#file')[0].files[0])
    formData.append('filename', elements);
    formData.append('jobId', Util.getEl('#jobList')[0].value);
    formData.append('acctId', Util.getEl('#accountList')[0].value);


    // console.log(formData);
    // console.log(elements);

    // return;

    /* SEND AJAX REQUEST AND DISPLAY APPROPRIATE MESSAGE BASED UPON RESULT */
    Util.sendRequest('/addJobAssetPost', function (res) {

        data = res.responseText;
        if (!General.isJSON(data)) {
            switch (data) {
                case "filemoveerror":
                    Util.msgBox({
                        heading: {
                            text: 'ERROR',
                            background: '#FF1493',
                            color: 'white'
                        },
                        body: {
                            text: "There was a problem moving the file."
                        }
                    });
                    setTimeout(Util.closeMsgBox, 2500);
                    break;
                case "inserterror":
                    Util.msgBox({
                        heading: {
                            text: 'ERROR',
                            background: '#FF1493',
                            color: 'white'
                        },
                        body: {
                            text: "There was a problem inserting data into the database."
                        }
                    });
                    setTimeout(Util.closeMsgBox, 2500);
                    break;
                case "wrongfile":
                    Util.msgBox({
                        heading: {
                            text: 'ERROR',
                            background: '#FF1493',
                            color: 'white'
                        },
                        body: {
                            text: "File cannot be blank, must be a pdf file and no bigger than 10000 bytes."
                        }
                    });
                    setTimeout(Util.closeMsgBox, 2500);
                    break;
                case "success":
                    Util.msgBox({
                        heading: {
                            text: 'SUCCESS',
                            background: '#48E5C2',
                            color: 'white'
                        },
                        body: {
                            text: "Account asset was successfully added."
                        }
                    });
                    setTimeout(Util.closeMsgBox, 2500);
                    General.clearAccountAssetForm();
                    break;
            }
        } else {
            data = JSON.parse(data);
            General.displayErrors(data);
        }
    }, formData, true);



}

// access job list - next function loads job asset input
jobs.addJobAssetList = function (accountId) {

    var accountid, elements;
    accountid = Util.getEl('#accountList')[0].value;

    /* NEED TO DO A QUICK FRONT END CHECK TO MAKE SURE THE USER SELECTS AN ACCOUNT */
    elements = [{
        id: 'accountList',
        value: accountid,
        msg: 'You must select an account',
        status: 'checking'
    }]

    /* THIS CHECKS TO SEE IF THE USER SELECTED AN ACCOUNT OR NOT. IF THEY DID NOT THEN THE GENERAL.SELECTCHECK
    METHOD DISPLAYS A MESSAGE AND RETURNS TRUE.  IF TRUE IS RETURNED THEN DIV WITH ID OF RESULT IS CLEARED AND
    RETURN TERMINATES ANY FURTHER EXECUTION OF THE SCRIPT*/
    if (General.selectCheck(elements)) {
        Util.getEl('#result')[0].innerHTML = "";

        return;
    }

    // accountid = JSON.stringify(accountid);

    Util.sendRequest('/getAccountJobAsset', function (res) {

        Util.getEl('#result')[0].innerHTML = res.responseText;
        if (Util.getEl('#result')[0] != undefined) {
            Util.addLis(Util.getEl('#jobList')[0], 'change', jobs.showJobAssetForm)
        }


    }, accountid)

}



jobs.showJobAssetForm = function () {

    var elements;

    elements = [{

        id: 'jobList',
        value: Util.getEl('#jobList')[0].value,
        msg: "Please select a job",
        status: "checking"
    }, ]


    if (General.selectCheck(elements)) {
        Util.getEl('.addassetform')[0].style.display = "none";
    } else {
        Util.getEl('.addassetform')[0].style.display = "block";
    }

}

jobs.jobnotemodal = function (e) {

    var data = {},
        rownumber;
    if (e.target.value === 'Delete') {
        General.okayCancelMsg();
        Util.addLis(Util.getEl('#rightbtn')[0], 'click', function () {
            Util.closeMsgBox();
        });

        Util.addLis(Util.getEl('#leftbtn')[0], 'click', function () {
            Util.closeMsgBox();
            data.fileid = e.target.id.substring(1);
            rownumber = e.target.parentNode.parentNode.rowIndex;
            data = JSON.stringify(data);
            Util.sendRequest('/deleteJobNote', function (res) {
                switch (res.responseText) {
                    case "success":
                        if (Util.getEl('.table')[0].rows.length > 0) {
                            Util.getEl('.table')[0].deleteRow(rownumber);
                            if (Util.getEl('.table')[0].rows.length == 1) {
                                Util.getEl('#result')[0].innerHTML = "<p>There are no job notes to list</p>";
                            }
                        } else {
                            Util.getEl('#result')[0].innerHTML = "<p>There are no job notes to list</p>";
                        }
                        break;
                    case "dberror":
                        Util.msgBox({
                            heading: {
                                text: 'ERROR',
                                background: '#FF1493',
                                color: 'white'
                            },
                            body: {
                                text: "There was a problem deleting the job note record."
                            }
                        });
                        setTimeout(Util.closeMsgBox, 2500);
                        break;
                }
            }, data);



        });
    }



    if (e.target.value === 'Update') {

        data.fileid = e.target.id.substring(1);

        data = JSON.stringify(data);

        Util.sendRequest('/updateJobNoteForm', function (res) {
            // var formData;



            var form, textArea;

            form = res.responseText;
            form = JSON.parse(form);

            // console.log(form);

            // formData = res.responseText;
            // formData = JSON.parse(formData);
            // console.log(formData);
            // console.log(form);
            // Util.getEl('#result')[0].innerHTML = data.results[0].id;
            Util.getEl('#msgbox')[0].style.display = 'block';
            Util.getEl('#msgbox')[0].innerHTML = form;

            // Util.msgBoxStyle();
            General.formModal();
            // textArea = Util.getEl('#dateFormat')[0].value;
            // Util.jobNoteForm(formData);
            // return;
            // console.log(textArea);
            // Util.getEl('#text')[0].innerHTML = textArea;

            // General.okayCancelMsg();
            Util.addLis(Util.getEl('#rightbtn')[0], 'click', function () {
                Util.closeMsgBox();
            })


            // change to general. jobnoteupdate

            Util.addLis(Util.getEl('.leftbtn')[0], 'click', function () {

                jobs.updateJobNoteForm();

            })


            // (jobs.updateJobNoteForm())();

            // return;
            // Util.getEl('#msgbox')[0].innerHTML = res.responseText;

            // Util.msgBox();

        }, data);



    }
}




jobs.updateJobNoteForm = function () {


    var elements, data = {},
        job_id, job_note_id = [];
    // job_id;
    job_note_id = Util.getEl('.leftbtn')[0].id;

    job_note_id = job_note_id.substring(1);






    job_id = Util.getEl('#jobList')[0].value;



    elements = [{

        id: 'dateFormat',
        value: Util.getEl('#dateFormat')[0].value,
        regex: 'dateFormat',
        msg: 'Date must be mm/dd/yyyy',
        status: 'checking',

    }, {
        id: 'name',
        value: Util.getEl('#name')[0].value,
        regex: 'name',
        msg: 'Note name cannot be blank and must be alpha/numeric characters only',
        status: 'checking'
    }, {
        id: 'text',
        value: Util.getEl('#text')[0].value,
        regex: 'name',
        msg: 'Note cannot be blank and must be alpha/numeric characters only',
        status: 'checking'
    }]




    data.elements = elements;
    data.job_id = job_id;

    /* console.log(data.elements);
     console.log(data.job_id);
     console.log(data.job_note_id);*/

    // return

    data = {
        flag: Util.getEl('.leftbtn')[0].getAttribute('data-action'),
        masterstatus: "checking",
        jobId: job_id,
        job_note_id: ""
    };


    data.elements = elements;


    data.job_note_id = job_note_id;



    data = JSON.stringify(data);


    Util.sendRequest('/updateJobNote', function (res) {

        var obj;

        obj = JSON.parse(res.responseText);

        switch (obj.masterstatus) {

            case 'errors':
                General.displayErrors(obj.elements);
                break;
            case 'err':
                Util.msgBox({
                    heading: {
                        text: 'ERROR',
                        background: '#FF1493',
                        color: 'white'
                    },
                    body: {
                        text: obj.msg
                    }
                });
                setTimeout(Util.closeMsgBox, 2500);
                break;
            case 'success':
                Util.msgBox({
                    heading: {
                        text: 'SUCCESS',
                        background: '#48E5C2',
                        color: 'white'
                    },
                    body: {
                        text: obj.msg
                    }
                });
                // General.clearJobForm();
                setTimeout(function () {
                    Util.closeMsgBox();
                    location.reload()
                }, 2500);
                break;
        }



    }, data)




}


jobs.addJobNoteList = function (accountId) {

    var accountid, elements;
    accountid = Util.getEl('#accountList')[0].value;

    /* NEED TO DO A QUICK FRONT END CHECK TO MAKE SURE THE USER SELECTS AN ACCOUNT */
    elements = [{
        id: 'accountList',
        value: accountid,
        msg: 'You must select an account',
        status: 'checking'
    }]

    /* THIS CHECKS TO SEE IF THE USER SELECTED AN ACCOUNT OR NOT. IF THEY DID NOT THEN THE GENERAL.SELECTCHECK
    METHOD DISPLAYS A MESSAGE AND RETURNS TRUE.  IF TRUE IS RETURNED THEN DIV WITH ID OF RESULT IS CLEARED AND
    RETURN TERMINATES ANY FURTHER EXECUTION OF THE SCRIPT*/
    if (General.selectCheck(elements)) {
        Util.getEl('#result')[0].innerHTML = "";

        return;
    }

    // accountid = JSON.stringify(accountid);

    Util.sendRequest('/getAccountJob', function (res) {

        Util.getEl('#result')[0].innerHTML = res.responseText;
        if (Util.getEl('#result')[0] != undefined) {
            Util.addLis(Util.getEl('#jobList')[0], 'change', jobs.showJobForm)
        }


    }, accountid)

}

jobs.updateJobNoteList = function (accountId) {

    var accountid, elements;
    accountid = Util.getEl('#accountList')[0].value;

    /* NEED TO DO A QUICK FRONT END CHECK TO MAKE SURE THE USER SELECTS AN ACCOUNT */
    elements = [{
        id: 'accountList',
        value: accountid,
        msg: 'You must select an account',
        status: 'checking'
    }]

    /* THIS CHECKS TO SEE IF THE USER SELECTED AN ACCOUNT OR NOT. IF THEY DID NOT THEN THE GENERAL.SELECTCHECK
    METHOD DISPLAYS A MESSAGE AND RETURNS TRUE.  IF TRUE IS RETURNED THEN DIV WITH ID OF RESULT IS CLEARED AND
    RETURN TERMINATES ANY FURTHER EXECUTION OF THE SCRIPT*/
    if (General.selectCheck(elements)) {
        Util.getEl('#result')[0].innerHTML = "";
        Util.getEl('#jobNoteTable')[0].innerHTML = "";

        return;
    }

    // accountid = JSON.stringify(accountid);

    Util.sendRequest('/showUpdateJobForm', function (res) {

        Util.getEl('#result')[0].innerHTML = res.responseText;
        if (Util.getEl('#result')[0] != undefined) {
            Util.addLis(Util.getEl('#jobList')[0], 'change', jobs.showUpdateJobForm)
        }


    }, accountid)

}

jobs.showUpdateJobForm = function () {

    var elements, data = {},
        accountid, accountElement, jobNote;

    accountid = Util.getEl('#accountList')[0].value;




    // return;







    elements = [{

        id: 'jobList',
        value: Util.getEl('#jobList')[0].value,
        msg: "Please select a job",
        status: "checking"
    }, ]

    data.elements = elements;


    data = JSON.stringify(data);


    Util.sendRequest('/JobNoteForm', function (res) {

        Util.getEl('#jobNoteTable')[0].innerHTML = res.responseText;

        var elements;


        elements = [{
            id: 'jobList',
            value: Util.getEl('#jobList')[0].value,
            msg: "Please select a job",
            status: "checking"
        }]

        if (General.selectCheck(elements)) {

        }

        /* if (Util.getEl('#jobList').value == 0) {
             Util.getEl('#jobNoteTable').style.display = "none";
         }*/

        if (General.selectCheck(elements)) {
            Util.getEl('#jobNoteTable')[0].style.display = "none";
        } else {
            Util.getEl('#jobNoteTable')[0].style.display = "block";
        }



    }, data)


}






jobs.showJobForm = function () {

    var elements;

    elements = [{

        id: 'jobList',
        value: Util.getEl('#jobList')[0].value,
        msg: "Please select a job",
        status: "checking"
    }, ]


    if (General.selectCheck(elements)) {
        Util.getEl('.addassetform')[0].style.display = "none";
    } else {
        Util.getEl('.addassetform')[0].style.display = "block";
    }

}




jobs.showJobNoteForm = function (job_id) {

    var elements, data = {},
        job_id;
    // job_id;

    job_id = Util.getEl('#jobList')[0].value;



    elements = [{

        id: 'dateFormat',
        value: Util.getEl('#dateFormat')[0].value,
        regex: 'dateFormat',
        msg: 'Date must be mm/dd/yyyy',
        status: 'checking',

    }, {
        id: 'name',
        value: Util.getEl('#name')[0].value,
        regex: 'name',
        msg: 'Note name cannot be blank and must be alpha/numeric characters only',
        status: 'checking'
    }, {
        id: 'text',
        value: Util.getEl('#text')[0].value,
        regex: 'name',
        msg: 'Note cannot be blank and must be alpha/numeric characters only',
        status: 'checking'



    }]

    data = {
        flag: Util.getEl('#addJobNoteButton')[0].getAttribute('data-action'),
        masterstatus: "checking",
        jobId: job_id
    };





    // job_id = elementsCheck[0].value;
    // data.elementsCheck = elementsCheck;
    data.elements = elements;


    console.log(data.elements);
    console.log(data.jobId)
    // return;









    data = JSON.stringify(data);


    Util.sendRequest('/submitJobNote', function (res) {

        var obj = JSON.parse(res.responseText);





        switch (obj.masterstatus) {

            case 'errors':
                General.displayErrors(obj.elements);
                break;
            case 'err':
                Util.msgBox({
                    heading: {
                        text: 'ERROR',
                        background: '#FF1493',
                        color: 'white'
                    },
                    body: {
                        text: obj.msg
                    }
                });
                setTimeout(Util.closeMsgBox, 2500);
                break;
            case 'success':
                Util.msgBox({
                    heading: {
                        text: 'SUCCESS',
                        background: '#48E5C2',
                        color: 'white'
                    },
                    body: {
                        text: obj.msg
                    }
                });
                General.clearJobForm();
                setTimeout(function () {
                    Util.closeMsgBox();
                    location.reload()
                }, 2500);
                break;
        }



    }, data)


}








jobs.showJob = function () {
    var accountid, elements;
    accountid = Util.getEl('#accountList')[0].value;

    /* NEED TO DO A QUICK FRONT END CHECK TO MAKE SURE THE USER SELECTS AN ACCOUNT */
    elements = [{
        id: 'accountList',
        value: accountid,
        msg: 'You must select an account',
        status: 'checking'
    }]

    /* THIS CHECKS TO SEE IF THE USER SELECTED AN ACCOUNT OR NOT. IF THEY DID NOT THEN THE GENERAL.SELECTCHECK
    METHOD DISPLAYS A MESSAGE AND RETURNS TRUE.  IF TRUE IS RETURNED THEN DIV WITH ID OF RESULT IS CLEARED AND
    RETURN TERMINATES ANY FURTHER EXECUTION OF THE SCRIPT*/
    if (General.selectCheck(elements)) {
        Util.getEl('#result')[0].innerHTML = "";
        return;
    }

    /* IF AN ACCOUNT IS SELECTED THEN GET DISPLAY A FORM WITH THE ACCOUNT DETAILS AND ASSIGN AN EVENT LISTENER TO THE
    FORM BUTTON */
    Util.sendRequest('/getJob', function (res) {
        Util.getEl('#result')[0].innerHTML = res.responseText;

        Util.addLis(Util.getEl('#addUpdateJobs')[0], 'click', function () {
            jobs.addUpdateJobs(accountid)
        });
    }, accountid);
}


jobs.viewJobsContact = function () {

    var accountid, elements;
    accountid = Util.getEl('#accountList')[0].value;

    /* NEED TO DO A QUICK FRONT END CHECK TO MAKE SURE THE USER SELECTS AN ACCOUNT */
    elements = [{
        id: 'accountList',
        value: accountid,
        msg: 'You must select an account',
        status: 'checking'
    }]

    /* THIS CHECKS TO SEE IF THE USER SELECTED AN ACCOUNT OR NOT. IF THEY DID NOT THEN THE GENERAL.SELECTCHECK
    METHOD DISPLAYS A MESSAGE AND RETURNS TRUE.  IF TRUE IS RETURNED THEN DIV WITH ID OF RESULT IS CLEARED AND
    RETURN TERMINATES ANY FURTHER EXECUTION OF THE SCRIPT*/
    if (General.selectCheck(elements)) {
        Util.getEl('#result')[0].innerHTML = "";
        return;
    }
    // console.log(elements[0]);
    /* IF AN ACCOUNT IS SELECTED THEN GET DISPLAY A FORM WITH THE ACCOUNT DETAILS AND ASSIGN AN EVENT LISTENER TO THE
        FORM BUTTON */
    Util.sendRequest('/jobContactTablePost', function (res) {
        Util.getEl('#result')[0].innerHTML = res.responseText;
        if (Util.getEl('#jobList')[0] == undefined) {
            return
        } else {
            Util.addLis(Util.getEl('#jobList')[0], 'change', jobs.displayJobTable);
        }


    }, accountid);


}

jobs.displayJobTable = function () {

    var jobId, elements;
    jobId = Util.getEl('#jobList')[0].value;

    elements = [{
        id: 'jobList',
        value: jobId,
        msg: 'You must select a job',
        status: 'checking'
    }]

    if (General.selectCheck(elements)) {
        Util.getEl('#contactTable')[0].innerHTML = "";
        return;
    }



    console.log(jobId);
    // return;

    Util.sendRequest('/jobContactTable', function (res) {


        Util.getEl('#contactTable')[0].innerHTML = res.responseText;






    }, jobId);


}


/* THIS METHOD ADDS OR UPDATES AN ACCOUNT */
jobs.addUpdateJobs = function (accountId) {

    var elements, data, accountId;
    elements = [{
        id: 'name',
        value: Util.getEl('#name')[0].value,
        regex: 'name',
        msg: 'Name cannot be blank and must be alpha/numeric characters only',
        status: 'checking',
        duplicates: 'account',
        field: 'name'
    }, ];

    /* THE FLAG PROPERTY GETS THE DATA-ACTION ATTRIBUTE VALUE WHICH IS DIFFERENT DEPENDING ON IF THE USER IS ADDING A NEW ACCOUNT OR UPDATING AN EXISTING ACCOUNT*/
    data = {
        flag: Util.getEl('#addUpdateJobs')[0].getAttribute('data-action'),
        masterstatus: "checking",
        acctId: accountId
    };

    // console.log(elements[0].value + ` + ` + data.acctId);

    data.elements = elements;

    // console.log(data.elements);

    data = JSON.stringify(data);




    Util.sendRequest('/addUpdateJobsProc', function (res) {

        var obj = JSON.parse(res.responseText);

        switch (obj.masterstatus) {
            case 'duplicate':
                Util.msgBox({
                    heading: {
                        text: 'ERROR',
                        background: '#FF1493',
                        color: 'white'
                    },
                    body: {
                        text: "There is already an account with that name please choose a different name"
                    }
                });
                setTimeout(Util.closeMsgBox, 2500);
                break;
            case 'errors':
                General.displayErrors(obj.elements);
                break;
            case 'err':
                Util.msgBox({
                    heading: {
                        text: 'ERROR',
                        background: '#FF1493',
                        color: 'white'
                    },
                    body: {
                        text: obj.msg
                    }
                });
                setTimeout(Util.closeMsgBox, 2500);
                break;
            case 'success':
                Util.msgBox({
                    heading: {
                        text: 'SUCCESS',
                        background: '#48E5C2',
                        color: 'white'
                    },
                    body: {
                        text: obj.msg
                    }
                });
                General.clearJobForm();
                setTimeout(function () {
                    Util.closeMsgBox();
                    location.reload()
                }, 2500);
                break;
        }
    }, data);
}













jobs.init();