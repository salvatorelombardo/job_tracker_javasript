"use strict"

var updateContacts = {}

updateContacts.util = function () {
    if (document.getElementById('validateinfoBtn')) {
        document.getElementById('validateinfoBtn').addEventListener('click', updateContacts.processForm, false);
    }
}

updateContacts.processForm = function () {
    var obj = {},
        i = 0;
    obj.masterstatus = "checking"

    /* OBJ.ELEMENTS IS AN ARRAY OF OBJECTS FOR EACH FIELD */
    obj.elements = [{
            id: 'name',
            regex: 'name',
            msg: '<i class="fa fa-exclamation-triangle"></i>',
            // msg: "Name cannot be blank and must be in alpha characters only",
            status: "checking"
        },
        {
            id: 'phone',
            regex: 'phone',
            msg: '<i class="fa fa-exclamation-triangle"></i>',
            // msg: "Address cannot be blank and must be alpha/numeric characters only",
            status: "checking"
        },
        {
            id: 'phoneOpt',
            regex: 'phoneOpt',
            msg: '<i class="fa fa-exclamation-triangle"></i>',
            // msg: "City cannot be blank and must be alpha/numberic characters only",
            status: "checking"
        },
        {
            id: 'email',
            regex: 'email',
            msg: '<i class="fa fa-exclamation-triangle"></i>',
            // msg: "State cannot be blank and must be a two character uppercase state abbreviation",
            status: "checking"
        }

    ];

    while (i < obj.elements.length) {
        obj.elements[i].value = document.getElementById(obj.elements[i].id).value;
        i++;
    }

    var obj = JSON.stringify(obj);
    Ajax.sendRequest('/accountTestForm', function (res) {
        var obj = JSON.parse(res.responseText);
        console.log(obj)
        if (obj.masterstatus === 'success') {
            /* DISPLAY SUCCESS MESSAGE */
            // document.getElementById('msg').innerHTML = 'Form data was valid';
        } else {
            updateContacts.formValidation(obj.elements);
        }


    }, obj);
}


/* I WOULD PUT THIS ON ANOTHER JAVASCRIPT FILE SO IT COULD BE RE-USED FOR OTHER PAGES */
updateContacts.formValidation = function (obj) {
    var i = 0,
        labels;

    /* CLEAR ALL FORM ERRORS FROM A POSSIBLE PREVIOUS FAILED SUBMISSION */
    updateContacts.clearFormErrors();

    labels = document.getElementsByTagName('label');

    while (i < labels.length) {
        if (labels[i].getAttribute('for') === obj[i].id && obj[i].status === 'error') {
            labels[i].innerHTML += '<span> ' + obj[i].msg + '</span>';
        }
        i++;
    }
}

updateContacts.clearFormErrors = function () {
    var labels, i = 0;
    // document.getElementById('msg').innerHTML = '';
    labels = document.getElementsByTagName('label');
    while (i < labels.length) {
        if (labels[i].lastChild.nodeName.toLowerCase() === "span") {
            labels[i].removeChild(labels[i].lastChild);
        }
        i++;
    }
}

updateContacts.util();