"use strict";

var contact = {};

contact.init = function () {
    /* THIS IS THE ADD OR UPDATE contact BUTTON.  THE BUTTONS ARE ON TWO DIFFERENT PAGES BUT CALL THE SAME METHOD*/
    if (Util.getEl('#addUpdateContact').length != 0) {
        Util.addLis(Util.getEl('#addUpdateContact')[0], 'click', contact.addUpdatecontact);
    }

    /* IN THIS CASE I AM CHECKING FOR THE ID OF THE MAIN ELEMENT THEN ADDING A CLICK EVENT TO THE DROPDOWN BOX.
    I AM DOING THIS BECAUSE THE DROPDOWN BOX IS REUSED THROUGHOUT MY CODE AND
    I WANT THE CLICK EVENT TO BE DIFFERENT DEPENDING ON THE PAGE. */
    if (Util.getEl('#updateContact').length != 0) {
        Util.addLis(Util.getEl('#contactList')[0], 'change', contact.showcontact);
    }
    if (Util.getEl('#addUpdateContact').length != 0) {
        Util.addLis(Util.getEl('#addUpdateContact')[0], 'click', contact.addUpdatecontact);
    }

    if (Util.getEl('#manageContacts').length != 0) {
        Util.addLis(Util.getEl('#contactList')[0], 'change', contact.manageContactsTable);

    }







    if (Util.getEl('#viewDeleteContact').length != 0) {
        // Util.addLis(Util.getEl('#contactList')[0], 'change', contact.delContact);
        General.viewpdf('#result');

        (contact.delContact)();
    }
    if (Util.getEl('#contactAsset').length != 0) {
        Util.addLis(Util.getEl('#contactList')[0], 'change', contact.showAssetForm)
    }
    if (Util.getEl('.contactable').length != 0) {
        Util.addLis(Util.getEl('.contactable')[0], 'click', contact.deleteContact)
    }




    /* JQUERY CODE THAT WILL SHOW THE FILE NAME IN THE BOX */
    $("input[type=file]").change(function () {
        var fieldVal = $(this).val();
        if (fieldVal != undefined || fieldVal != "") {
            $(this).next(".custom-file-control").attr('data-content', fieldVal);
        }
    });
}


contact.addJobToServer = function () {

    var elements, data = {};

    elements = [{

        con_id: 'contactList',
        con_value: Util.getEl('#contactList')[0].value,
        acct_id: 'accountList',
        acct_value: Util.getEl('#accountList')[0].value,
        job_id: 'jobList',
        job_value: Util.getEl('#jobList')[0].value


    }];

    data.elements = elements;

    // console.log(data);

    // return
    data = JSON.stringify(data);

    Util.sendRequest('/addContactToJob', function (res) {

        Util.getEl('#result')[0].innerHTML = res.responseText;









    }, data)





}

contact.deleteJobContact = function (e) {
    var elements,
        data = {},
        rownumber;




    if (e.target.value == 'Delete') {
        if (e.target.value === 'Delete') {
            General.okayCancelMsg();
            Util.addLis(Util.getEl('#rightbtn')[0], 'click', function () {
                Util.closeMsgBox();
            });
        }
        Util.addLis(Util.getEl('#leftbtn')[0], 'click', function () {
            Util.closeMsgBox();
            data.fileid = e.target.id
            rownumber = e.target.parentNode.parentNode.rowIndex;
            // pathArr = e.target.parentNode.previousSibling.firstElementChild.href.split("/");
            // data.foldername = pathArr[pathArr.length - 2];
            // data.filename = pathArr[pathArr.length - 1];

            console.log(data.fileid);
            console.log(rownumber);

            // return
            data = JSON.stringify(data);
            Util.sendRequest('/deleteJobContact', function (res) {
                switch (res.responseText) {
                    case "success":
                        if (Util.getEl('.table')[0].rows.length > 0) {
                            Util.getEl('.table')[0].deleteRow(rownumber);
                            if (Util.getEl('.table')[0].rows.length == 1) {
                                Util.getEl('#result')[0].innerHTML = "<p>There are no job contacts to list</p>";
                            }
                        } else {
                            Util.getEl('#result')[0].innerHTML = "<p>There are no account assets to list</p>";
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
                                text: "There was a problem deleting the database record."
                            }
                        });
                        setTimeout(Util.closeMsgBox, 2500);
                        break;
                    case "fileerror":
                        Util.msgBox({
                            heading: {
                                text: 'ERROR',
                                background: '#FF1493',
                                color: 'white'
                            },
                            body: {
                                text: "There was a problem deleting the record."
                            }
                        });
                        setTimeout(Util.closeMsgBox, 2500);
                        break;
                }
            }, data);
        });

    }

}


contact.manageContactsTable = function () {

    var contactId, elements, data;

    contactId = Util.getEl('#contactList')[0].value;

    elements = [{
        id: 'contactList',
        value: contactId,
        msg: 'You must select an contact',
        status: 'checking'
    }];

    if (General.selectCheck(elements)) {
        Util.getEl('#result')[0].innerHTML = "";
        // return;
    }

    data = elements;

    // data = JSON.stringify(data);
    // console.log(contactId);
    Util.sendRequest('/getManageContactTable', function (res) {
        // console.log(contactId);
        // var obj = JSON.parse(res.responseText);
        // console.log("response text " + res.responseText);
        Util.getEl('#result')[0].innerHTML = res.responseText;
        if (Util.getEl('#result')[0].length != 0) {
            Util.addLis(Util.getEl('#result')[0], 'click', contact.deleteJobContact)
        }
        (contact.getJobList)(contactId);




    }, contactId);

}



contact.getJobList = function (contactId) {


    var elements, data, contactId, accountId;


    if (Util.getEl('#accountList')[0] == undefined) {
        return
    } else {
        Util.addLis(Util.getEl('#accountList')[0], 'change', contact.getJobList);
    }
    contactId = Util.getEl('#contactList')[0].value;
    accountId = Util.getEl('#accountList')[0].value;



    elements = [{
        id: 'accountList',
        value: accountId,
        msg: 'You must select an account',
        status: 'checking',
    }];

    elements.push(contactId);



    data = elements;
    // console.log(data);
    // return
    data = JSON.stringify(data);

    // return;

    Util.sendRequest('/getJobList', function (res) {
        // console.log(contactId);
        // var obj = JSON.parse(res.responseText);
        // console.log("response text " + res.responseText);
        Util.getEl('#jobResult')[0].innerHTML = res.responseText;

        if (Util.getEl('#addConToJob').length != 0) {
            Util.addLis(Util.getEl('#jobList')[0], 'change', contact.addJobToContact)
        }








    }, data);







}

contact.addJobToContact = function () {
    var elements;


    elements = [{

        id: 'jobList',
        value: Util.getEl('#jobList')[0].value,
        msg: 'You must select a job to add a contact to.',
        status: 'checking',


    }]



    if (Util.getEl('#jobList')[0].value != 0) {



        Util.getEl('#addConToJob')[0].style.display = 'block';

        if (Util.getEl('#addContactToJob')[0].length != 0) {
            Util.addLis(Util.getEl('#addContactToJob')[0], 'click', contact.addJobToServer)

        }


    } else if (Util.getEl('#jobList')[0].value == 0) {







        if (General.selectCheck(elements)) {
            Util.getEl('#addConToJob')[0].style.display = 'none';
            // return;
        }





    }




}



// }

contact.showcontact = function () {
    var contactId, elements;
    contactId = Util.getEl('#contactList')[0].value;

    /* NEED TO DO A QUICK FRONT END CHECK TO MAKE SURE THE USER SELECTS AN contact */
    elements = [{
        id: 'contactList',
        value: contactId,
        msg: 'You must select an contact',
        status: 'checking'
    }]

    /* THIS CHECKS TO SEE IF THE USER SELECTED AN contact OR NOT. IF THEY DID NOT THEN THE GENERAL.SELECTCHECK
    METHOD DISPLAYS A MESSAGE AND RETURNS TRUE.  IF TRUE IS RETURNED THEN DIV WITH ID OF RESULT IS CLEARED AND
    RETURN TERMINATES ANY FURTHER EXECUTION OF THE SCRIPT*/
    if (General.selectCheck(elements)) {
        Util.getEl('#result')[0].innerHTML = "";
        return;
    }

    /* IF AN contact IS SELECTED THEN GET DISPLAY A FORM WITH THE contact DETAILS AND ASSIGN AN EVENT LISTENER TO THE
    FORM BUTTON */
    Util.sendRequest('/getContact', function (res) {
        Util.getEl('#result')[0].innerHTML = res.responseText;
        Util.addLis(Util.getEl('#addUpdateContact')[0], 'click', function () {
            contact.addUpdatecontact(contactId)
        });
    }, contactId);
}



contact.delContact = function () {
    // var contactId, elements;
    // contactId = Util.getEl('#contactList')[0].value;

    /* NEED TO DO A QUICK FRONT END CHECK TO MAKE SURE THE USER SELECTS AN contact */
    /*elements = [{
        id: 'contactList',
        value: contactId,
        msg: 'You must select an contact',
        status: 'checking'
    }]*/

    /* THIS CHECKS TO SEE IF THE USER SELECTED AN contact OR NOT. IF THEY DID NOT THEN THE GENERAL.SELECTCHECK
    METHOD DISPLAYS A MESSAGE AND RETURNS TRUE.  IF TRUE IS RETURNED THEN DIV WITH ID OF RESULT IS CLEARED AND
    RETURN TERMINATES ANY FURTHER EXECUTION OF THE SCRIPT*/
    /*  if (General.selectCheck(elements)) {
          Util.getEl('#result')[0].innerHTML = "";
          return;
      }
      // */
    /* IF AN contact IS SELECTED THEN GET DISPLAY A FORM WITH THE contact DETAILS AND ASSIGN AN EVENT LISTENER TO THE
    FORM BUTTON */
    Util.sendRequest('/getContactTable', function (res) {
        Util.getEl('#result')[0].innerHTML = res.responseText;
        // Util.addLis(Util.getEl('#addUpdateContact')[0], 'click', function () {
        // contact.addUpdatecontact(contactId)
        // });
    }); /*, contactId);*/
}

/* THIS METHOD ADDS OR UPDATES AN contact */
contact.addUpdatecontact = function (contactId) {
    var elements, data, contactId;
    elements = [{
            id: 'name',
            value: Util.getEl('#name')[0].value,
            regex: 'name',
            msg: 'Name cannot be blank and must be alpha/numeric characters only',
            status: 'checking'

        },
        {
            id: 'phone',
            value: Util.getEl('#phone')[0].value,
            regex: 'phone',
            msg: 'phone cannot be blank and must be alpha/numeric characters only',
            status: 'checking'
        },
        {
            id: 'phoneOpt',
            value: Util.getEl('#phoneOpt')[0].value,
            regex: 'phoneOpt',
            msg: 'phoneOpt cannot be blank and must be alpha/numeric characters only',
            status: 'checking'
        },
        {
            id: 'email',
            value: Util.getEl('#email')[0].value,
            regex: 'email',
            msg: 'email cannot be blank and must be a proper email uppercase two character abbrevation',
            duplicates: 'contact',
            status: 'checking',
            field: 'email'
        },

    ];

    /* THE FLAG PROPERTY GETS THE DATA-ACTION ATTRIBUTE VALUE WHICH IS DIFFERENT DEPENDING ON IF THE USER IS ADDING A NEW contact OR UPDATING AN EXISTING contact*/
    data = {
        flag: Util.getEl('#addUpdateContact')[0].getAttribute('data-action'),
        masterstatus: "checking",
        contactId: contactId
    };

    data.elements = elements;

    data = JSON.stringify(data);

    Util.sendRequest('/addUpdateContact', function (res) {

        var obj = JSON.parse(res.responseText);

        switch (obj.masterstatus) {
            case 'duplicate':
                Util.msgBox({
                    heading: {
                        text: 'ERROR',
                        background: 'red',
                        color: 'white'
                    },
                    body: {
                        text: "There is already an contact with that name please choose a different name"
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
                        background: 'red',
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
                        background: 'green',
                        color: 'white'
                    },
                    body: {
                        text: obj.msg
                    }
                });
                General.clearContactForm();
                setTimeout(function () {
                    Util.closeMsgBox();
                    location.reload()
                }, 2500);
                break;
        }
    }, data);
}

/* CHECK TO MAKE SURE AN contact IS SELECTED AND IF SO SHOW THE ADD ASSET FORM  */
contact.showAssetForm = function () {
    var elements;
    elements = [{
        id: 'contactList',
        value: Util.getEl('#contactList')[0].value,
        msg: "Please select an contact",
        status: "checking"
    }, ]

    if (General.selectCheck(elements)) {
        Util.getEl('.addassetform')[0].style.display = "none";
    } else {
        Util.getEl('.addassetform')[0].style.display = "block";
    }
}


contact.addAsset = function () {
    var data = {},
        json, formData, elements, error = false,
        blank;

    /* CLEAR ALL ELEMENTS */
    General.clearErrors();

    /* CREATE MY ELEMENTS ARRAY OF ERROR MESSAGES */
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
    formData.append('acctId', Util.getEl('#contactList')[0].value);

    /*console.log(Util.getEl('#file')[0]);

    console.log(Util.getEl('#file')[0].files[0]);

    return;*/


    /* SEND AJAX REQUEST AND DISPLAY APPROPRIATE MESSAGE BASED UPON RESULT */
    Util.sendRequest('/addcontactAsset', function (res) {

        data = res.responseText;
        if (!General.isJSON(data)) {
            switch (data) {
                case "filemoveerror":
                    Util.msgBox({
                        heading: {
                            text: 'ERROR',
                            background: 'red',
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
                            background: 'red',
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
                            background: 'red',
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
                            background: 'green',
                            color: 'white'
                        },
                        body: {
                            text: "contact asset was successfully added."
                        }
                    });
                    setTimeout(Util.closeMsgBox, 2500);
                    General.clearcontactAssetForm();
                    break;
            }
        } else {
            data = JSON.parse(data);
            General.displayErrors(data);
        }
    }, formData, true);

}



contact.deleteContact = function (e) {
    var data = {},
        rownumber, pathArr;
    if (e.target.value === 'Delete') {
        // console.log(e.target.id);
        General.okayCancelMsg();
        Util.addLis(Util.getEl('#rightbtn')[0], 'click', function () {
            Util.closeMsgBox();
        });

        Util.addLis(Util.getEl('#leftbtn')[0], 'click', function () {
            Util.closeMsgBox();
            // data.fileid = e.target.id.substring(1);
            data = e.target.id;
            // console.log(data);
            rownumber = e.target.parentNode.parentNode.rowIndex;

            // pathArr = e.target.parentNode.previousSibling.firstElementChild.href.split("/");

            // data.foldername = pathArr[pathArr.length - 2];
            // data.filename = pathArr[pathArr.length - 1];
            data = JSON.stringify(data);
            Util.sendRequest('/deleteContactTable', function (res) {
                switch (res.responseText) {
                    case "success":
                        if (Util.getEl('.table')[0].rows.length > 0) {
                            Util.getEl('.table')[0].deleteRow(rownumber);
                            if (Util.getEl('.table')[0].rows.length == 1) {
                                Util.getEl('#result')[0].innerHTML = "<p>There are no contact assets to list</p>";
                            }
                        } else {
                            Util.getEl('#result')[0].innerHTML = "<p>There are no contact assets to list</p>";
                        }
                        break;
                    case "dberror":
                        Util.msgBox({
                            heading: {
                                text: 'ERROR',
                                background: 'red',
                                color: 'white'
                            },
                            body: {
                                text: "There was a problem deleting the database record."
                            }
                        });
                        setTimeout(Util.closeMsgBox, 2500);
                        break;
                    case "fileerror":
                        Util.msgBox({
                            heading: {
                                text: 'ERROR',
                                background: 'red',
                                color: 'white'
                            },
                            body: {
                                text: "There was a problem deleting the file."
                            }
                        });
                        setTimeout(Util.closeMsgBox, 2500);
                        break;
                }
            }, data);
        });

    }
}

contact.init();