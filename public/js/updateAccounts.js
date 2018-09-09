"use strict"

var main = {}

main.util = function () {
    if (document.getElementById('validateinfoBtn')) {
        document.getElementById('validateinfoBtn').addEventListener('click', main.processForm, false);
    }
}

main.processForm = function () {
    var obj = {},
        i = 0;
    obj.masterstatus = "checking"

    /* OBJ.ELEMENTS IS AN ARRAY OF OBJECTS FOR EACH FIELD */
    obj.elements = [{
            id: 'name',
            regex: 'name',
            msg: '<i class="fa fa-exclamation-triangle"></i>',
            status: "checking"
        },
        {
            id: 'address',
            regex: 'address',
            msg: '<i class="fa fa-exclamation-triangle tip"></i>',
            status: "checking"
        },
        {
            id: 'city',
            regex: 'address',
            msg: '<i class="fa fa-exclamation-triangle"></i>',
            status: "checking"
        },
        {
            id: 'state',
            regex: 'state',
            msg: '<i class="fa fa-exclamation-triangle"></i>',
            status: "checking"
        },
        {
            id: 'zip',
            regex: 'zip',
            msg: '<i class="fa fa-exclamation-triangle"></i>',
            status: "checking"
        }
    ];

    while (i < obj.elements.length) {
        obj.elements[i].value = document.getElementById(obj.elements[i].id).value;
        i++;
    }

    var obj = JSON.stringify(obj);
    Ajax.sendRequest('/updateAccountPost', function (res) {
        var obj = JSON.parse(res.responseText);

        /* CLEAR ALL FORM ERRORS FROM A POSSIBLE PREVIOUS FAILED SUBMISSION */
        main.clearFormErrors();

        if (obj.masterstatus === 'success') {
            /* DISPLAY SUCCESS MESSAGE */
            // document.getElementById('msg').innerHTML = 'Form data was valid';
        } else {
            main.formValidation(obj.elements);
        }


    }, obj);
}


/* I WOULD PUT THIS ON ANOTHER JAVASCRIPT FILE SO IT COULD BE RE-USED FOR OTHER PAGES */
main.formValidation = function (obj) {
    var i = 0,
        j = 0,
        labels;

    labels = document.getElementsByTagName('label');

    while (i < labels.length) {
        j = 0;
        while (j < obj.length) {
            if (labels[i].getAttribute('for') === obj[j].id && obj[j].status === 'error') {
                labels[i].innerHTML += '<span> ' + obj[j].msg + '</span>';
                break;
            }
            j++
        }

        i++;
    }
}

main.clearFormErrors = function () {
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

main.util();