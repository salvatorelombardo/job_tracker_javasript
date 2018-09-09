"use strict"

var addjobHours = {}

addjobHours.util = function () {
    if (document.getElementById('validateinfoBtn')) {
        document.getElementById('validateinfoBtn').addEventListener('click', addjobHours.processForm, false);
    }
}

addjobHours.processForm = function () {
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
            id: 'dateFormat',
            regex: 'dateformat',
            msg: '<i class="fa fa-exclamation-triangle"></i>',
            // msg: "City cannot be blank and must be alpha/numberic characters only",
            status: "checking"
        },
        {
            id: 'text',
            regex: 'text',
            msg: '<i class="fa fa-exclamation-triangle"></i>',
            // msg: "State cannot be blank and must be a two character uppercase state abbreviation",
            status: "checking"
        },
        {
            id: 'alphaNum',
            regex: 'alphaNum',
            msg: '<i class="fa fa-exclamation-triangle"></i>',
            // msg: "Zip cannot be blank and must be a proper 5 digit zip code",
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
            addjobHours.formValidation(obj.elements);
        }


    }, obj);
}


/* I WOULD PUT THIS ON ANOTHER JAVASCRIPT FILE SO IT COULD BE RE-USED FOR OTHER PAGES */
addjobHours.formValidation = function (obj) {
    var i = 0,
        labels;

    /* CLEAR ALL FORM ERRORS FROM A POSSIBLE PREVIOUS FAILED SUBMISSION */
    addjobHours.clearFormErrors();

    labels = document.getElementsByTagName('label');

    while (i < labels.length) {
        if (labels[i].getAttribute('for') === obj[i].id && obj[i].status === 'error') {
            labels[i].innerHTML += '<span> ' + obj[i].msg + '</span>';
        }
        i++;
    }
}

addjobHours.clearFormErrors = function () {
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

addjobHours.util();