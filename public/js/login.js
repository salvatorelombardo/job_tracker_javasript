"use strict";
var login = {}

login.init = function(){
    if(Util.getEl('#loginBtn').length != 0){
        Util.addLis(Util.getEl('#loginBtn')[0], 'click', login.login);
    }
}

login.login = function(){
    var data, email, password;
    email = Util.getEl('#email');
    password = Util.getEl('#password');

    data = {}
    data.email = email[0].value;
    data.password = password[0].value;

    data = JSON.stringify(data);

    Util.sendRequest('/login', function(res){
        var obj = {};
        /* IF THE LOGIN IS SUCCESSFUL REDIRECT TO THE HOME PAGE OTHERWISE DISPLAY ERROR MESSAGE AND CLEAR INPUT BOXES */
        obj = JSON.parse(res.responseText);
        
        /* CLEAR EMAIL AND PASSWORD TEXTBOXES */
        email[0].value = "";
        password[0].value = "";
        switch(obj.masterstatus){
            case 'badlogin' : obj.bk = "red"; obj.title = "ERROR"; login.displaybox(obj); break;
            case 'err' : obj.bk = "red"; obj.title = "ERROR"; login.displaybox(obj); break;
            case 'notfound' : obj.bk = "red"; obj.title = "ERROR"; login.displaybox(obj); break;
            case 'success' : window.location = "/home";
        }
     }, data);
}

/* THIS FUNCTION DISPLAYS THE BOX.  THIS FUNCTION COULD BE MOVED TO THE GENERAL.JS FILE AS IT COULD BE USED MY MULTIPLE DIFFERENT JS FILES */
login.displaybox = function(obj){
    Util.msgBox({
        heading: {text: obj.title, background: obj.bk, color: "#FFF"},
        body: {text: obj.msg},
    });
    setTimeout(Util.closeMsgBox, 2500);
}

login.logout = function(){
    
}

login.init();