"use strict";

var General = {}

/* THIS CHECKS TO SEE IF A RETURN IS A JSON STRING OR JUST A STRING */
General.isJSON = function (data) {
    try {
        JSON.parse(data);
        return true;
    } catch (e) {
        return false;
    }
}

/* THE CONTID IS THE ID OF THE CONTAINING DIV IN WHICH THE ANCHOR ELEMENTS ARE FOUND */
General.viewpdf = function (contId) {
    Util.addLis(Util.getEl(contId)[0], 'click', function (e) {
        if (e.target.nodeName.toUpperCase() == 'A') {
            e.preventDefault();
            window.open(e.target.href, '_blank');
        }
    });
}

General.selectCheck = function (data) {
    this.clearErrors();
    var i = 0,
        error = false;
    while (i < data.length) {
        if (data[i].value == 0) {
            data[i].status = "error";
            error = true;
        }
        i++;
    }
    if (error) {
        this.displayErrors(data);
        return true;
    } else {
        return false;
    }
}


General.displayErrors = function (data) {
    General.clearErrors();
    var i = 0,
        error = false;

    while (i < data.length) {
        if (data[i].status === "error") {

            /* THIS IS THE NEW WAY I DECIDED TO GENERATE MY ERROR MESSAGES. IT USES THE LABEL FOR ATTRIBUTE WHICH IS THE SAME AS THE ID TO CREATE THE SPAN ELEMENTS. */
            Util.getEl('label[for="' + data[i].id + '"]')[0].innerHTML += ' <i class="fa fa-exclamation-circle error" aria-hidden="true" data-toggle="popover" data-trigger="hover" title="ERROR" data-content="' + data[i].msg + '" id="p' + data[i].id + '"></i>';

            //Util.getEl('#' + data[i].id)[0].previousElementSibling.innerHTML += ' <i class="fa //fa-exclamation-circle error" aria-hidden="true" data-toggle="popover" data-trigger="hover" //title="ERROR" data-content="' + data[i].msg + '" id="p' + data[i].id + '"></i>';

            $('#p' + data[i].id).popover();
        }
        i++;
    }
}

/* THIS WILL CLEAR ANY ITALIC ELEMENTS THAT WERE PREVIOUS ERRORS SO THAT THEY DO NOT GET REPEATED. */
General.clearErrors = function () {
    var labels, i = 0;
    labels = Util.getEl('label');
    while (i < labels.length) {
        if (labels[i].lastChild.nodeName.toUpperCase() === "I") {
            labels[i].removeChild(labels[i].lastChild);
        }
        i++;
    }
}

General.clearAccountForm = function () {
    Util.getEl('#name')[0].value = "";
    Util.getEl('#address')[0].value = "";
    Util.getEl('#state')[0].value = "";
    Util.getEl('#city')[0].value = "";
    Util.getEl('#zip')[0].value = "";
}

General.clearAccountAssetForm = function () {
    Util.getEl('#name')[0].value = "";
    Util.getEl('#file')[0].value = "";
    Util.getEl('#accountList')[0].value = "0";
}

General.clearJobForm = function () {
    Util.getEl('#name')[0].display = "none";
    Util.getEl('#accountList')[0].value = "0";
}

General.clearContactForm = function () {
    Util.getEl('#name')[0].value = "";
    Util.getEl('#phone')[0].value = "";
    Util.getEl('#phoneOpt')[0].value = "";
    Util.getEl('#email')[0].value = ""
}

General.okayCancelMsg = function () {
    General.actionresult = false;
    Util.msgBox({
        heading: {
            text: 'CAUTION',
            background: '#FF1493'
        },
        body: {
            text: 'You are about to permently delete this records.  If that is what you want to do click "Okay" otherwise click "Cancel"'
        },
        leftbtn: {
            text: 'Okay',
            background: '#48E5C2',
            display: 'block'
        },
        rightbtn: {
            text: 'Cancel',
            background: '#FF1493',
            display: 'block'
        }
    });
}



// SAL 5/5/2018 form stylings object

General.formModal = function () {
    General.actionresult = false;
    Util.formModal({
        // heading: {
        // text: 'CAUTION',
        // background: 'red'
        // },
        formModal: {
            // text: 'You are about to permently delete this records.  If that is what you want to do click "Okay" otherwise click "Cancel"'
            background: 'white',
            padding: '15px'
        },
        leftbtn: {
            // text: 'Okay',
            background: '#FF1493',
            color: 'white'
            // display: 'block'
        },
        rightbtn: {
            // text: 'Cancel',
            background: '#FF1493',
            color: 'white'
            // display: 'block'
        }
    });
}