const {
    ipcRenderer
} = require('electron')
const User = require('../models/user');
const alertify = require('alertifyjs');
window.$ = window.jQuery = require('jquery'); // not sure if you need this at all
window.Bootstrap = require('bootstrap');


window.onerror = function (msg, url, lineNo, columnNo, error) {
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1) {
        alert('Script Error: See Browser Console for Detail');
    } else {
        var message = [
            'Message: ' + msg,
            'Error object: ' + JSON.stringify(error)
        ].join(' - ');
        alertify.error(message);
    }

    return false;
};

$(document).ready(() => {
    $('#loading').hide();
    $('#btnShowLogin').click(showLogin)
    $('#btnShowRegister').click(showRegister)
    // $('#btnSignUp').click(signUp)
    // $('#btnSignIn').click(signIn)
})

function showLogin() {
    $('#signUp').addClass('invisible')
    $('#signIn').removeClass('invisible')
}

function showRegister() {
    $('#signIn').addClass('invisible')
    $('#signUp').removeClass('invisible')
}

function signIn() {
    let name = $('#txtSignInUsername').val()
    let pwd = $('#txtSignInPassword').val()
    let usr = new User(name, pwd)
    ipcRenderer.send('sign-in', usr)
    //TODO
    $('#loading').show()
}

function signUp() {
    let name = $('#txtSignUpUsername').val()
    let pwd = $('#txtSignUpPassword').val()
    let confPwd = $('#txtSignUpPasswordConfirmation').val()
    console.log(pwd + "  + " + confPwd)
    if (pwd != confPwd) {
        throw new TypeError('Passwords do not match.')
    } else {
        var usr = new User(name, pwd)
        ipcRenderer.send('sign-up', pwd)
        $('#loading').show()
    }
}