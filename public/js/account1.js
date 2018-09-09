"use strict";

var account = {};

account.init = function () {
    /* THIS IS THE ADD OR UPDATE ACCOUNT BUTTON.  THE BUTTONS ARE ON TWO DIFFERENT PAGES BUT CALL THE SAME METHOD*/
    if (Util.getEl('#addUpdateAccount').length != 0) {
        Util.addLis(Util.getEl('#addUpdateAccount')[0], 'click', account.addUpdateAccount);
    }

    /* IN THIS CASE I AM CHECKING FOR THE ID OF THE MAIN ELEMENT THEN ADDING A CLICK EVENT TO THE DROPDOWN BOX.
    I AM DOING THIS BECAUSE THE DROPDOWN BOX IS REUSED THROUGHOUT MY CODE AND
    I WANT THE CLICK EVENT TO BE DIFFERENT DEPENDING ON THE PAGE. */
    if (Util.getEl('#updateAccount').length != 0) {
        Util.addLis(Util.getEl('#accountList')[0], 'change', account.showAccount);
    }
    if (Util.getEl('#addUpdateAccount').length != 0) {
        Util.addLis(Util.getEl('#addUpdateAccount')[0], 'click', account.addUpdateAccount);
    }

    if (Util.getEl('#addAsset').length != 0) {
        Util.addLis(Util.getEl('#addAsset')[0], 'click', account.addAsset);
    }


    if (Util.getEl('#viewDeleteAccountAsset').length != 0) {
        Util.addLis(Util.getEl('#accountList')[0], 'change', account.getAccountAssetTable);
        General.viewpdf('#result');
    }
    if (Util.getEl('#accountAsset').length != 0) {
        Util.addLis(Util.getEl('#accountList')[0], 'change', account.showAssetForm)
    }
    if (Util.getEl('.assettable').length != 0) {
        Util.addLis(Util.getEl('.assettable')[0], 'click', account.deleteAsset)
    }

    /* JQUERY CODE THAT WILL SHOW THE FILE NAME IN THE BOX */
    $("input[type=file]").change(function () {
        var fieldVal = $(this).val();
        if (fieldVal != undefined || fieldVal != "") {
            $(this).next(".custom-file-control").attr('data-content', fieldVal);
        }
    });
}

account.showAccount = function () {
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
    Util.sendRequest('/getAccount', function (res) {
        Util.getEl('#result')[0].innerHTML = res.responseText;
        Util.addLis(Util.getEl('#addUpdateAccount')[0], 'click', function () {
            account.addUpdateAccount(accountid)
        });
    }, accountid);
}

/* THIS METHOD ADDS OR UPDATES AN ACCOUNT */
account.addUpdateAccount = function (accountId) {
    var elements, data, accountId;
    elements = [{
            id: 'name',
            value: Util.getEl('#name')[0].value,
            regex: 'name',
            msg: 'Name cannot be blank and must be alpha/numeric characters only',
            status: 'checking',
            duplicates: 'account',
            field: 'name'
        },
        {
            id: 'address',
            value: Util.getEl('#address')[0].value,
            regex: 'address',
            msg: 'Address cannot be blank and must be alpha/numeric characters only',
            status: 'checking'
        },
        {
            id: 'city',
            value: Util.getEl('#city')[0].value,
            regex: 'name',
            msg: 'City cannot be blank and must be alpha/numeric characters only',
            status: 'checking'
        },
        {
            id: 'state',
            value: Util.getEl('#state')[0].value,
            regex: 'state',
            msg: 'State cannot be blank and must be a proper state uppercase two character abbrevation',
            status: 'checking'
        },
        {
            id: 'zip',
            value: Util.getEl('#zip')[0].value,
            regex: 'zip',
            msg: 'Zip cannot be blank and must be 5 digit zip code',
            status: 'checking'
        },
    ];

    /* THE FLAG PROPERTY GETS THE DATA-ACTION ATTRIBUTE VALUE WHICH IS DIFFERENT DEPENDING ON IF THE USER IS ADDING A NEW ACCOUNT OR UPDATING AN EXISTING ACCOUNT*/
    data = {
        flag: Util.getEl('#addUpdateAccount')[0].getAttribute('data-action'),
        masterstatus: "checking",
        acctId: accountId
    };

    console.log(data);

    data.elements = elements;

    // console.log(data.elements);

    data = JSON.stringify(data);
    // console.log(data);
    // return;


    Util.sendRequest('/addUpdateAccount', function (res) {

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
                General.clearAccountForm();
                setTimeout(function () {
                    Util.closeMsgBox();
                    location.reload()
                }, 2500);
                break;
        }
    }, data);
}

/* CHECK TO MAKE SURE AN ACCOUNT IS SELECTED AND IF SO SHOW THE ADD ASSET FORM  */
account.showAssetForm = function () {
    var elements;
    elements = [{
        id: 'accountList',
        value: Util.getEl('#accountList')[0].value,
        msg: "Please select an account",
        status: "checking"
    }, ]

    if (General.selectCheck(elements)) {
        Util.getEl('.addassetform')[0].style.display = "none";
    } else {
        Util.getEl('.addassetform')[0].style.display = "block";
    }
}


account.addAsset = function () {
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
    formData.append('acctId', Util.getEl('#accountList')[0].value);

    /*console.log(Util.getEl('#file')[0]);

    console.log(Util.getEl('#file')[0].files[0]);*/
    // console.log(formData);
    // return


    /* SEND AJAX REQUEST AND DISPLAY APPROPRIATE MESSAGE BASED UPON RESULT */
    Util.sendRequest('/addAccountAsset', function (res) {

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

account.getAccountAssetTable = function () {
    var acctId, elements;
    acctId = Util.getEl('#accountList')[0].value;

    /* NEED TO DO A QUICK FRONT END CHECK TO MAKE SURE THIS SELECTS AN ACCOUNT */
    elements = [{
        id: 'accountList',
        value: acctId,
        msg: 'You must select an account',
        status: 'checking'
    }]

    if (General.selectCheck(elements)) {
        Util.getEl('#result')[0].innerHTML = "";
        return;
    }


    Util.sendRequest('/getAssetTable', function (res) {
        Util.getEl('#result')[0].innerHTML = res.responseText;
    }, acctId);
}

account.deleteAsset = function (e) {
    var data = {},
        rownumber, pathArr;
    if (e.target.value === 'Delete') {
        General.okayCancelMsg();
        Util.addLis(Util.getEl('#rightbtn')[0], 'click', function () {
            Util.closeMsgBox();
        });

        Util.addLis(Util.getEl('#leftbtn')[0], 'click', function () {
            Util.closeMsgBox();
            data.fileid = e.target.id.substring(1);
            rownumber = e.target.parentNode.parentNode.rowIndex;
            pathArr = e.target.parentNode.previousSibling.firstElementChild.href.split("/");
            data.foldername = pathArr[pathArr.length - 2];
            data.filename = pathArr[pathArr.length - 1];
            data = JSON.stringify(data);
            Util.sendRequest('/deleteAccountAsset', function (res) {
                switch (res.responseText) {
                    case "success":
                        if (Util.getEl('.table')[0].rows.length > 0) {
                            Util.getEl('.table')[0].deleteRow(rownumber);
                            if (Util.getEl('.table')[0].rows.length == 1) {
                                Util.getEl('#result')[0].innerHTML = "<p>There are no account assets to list</p>";
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

account.init();