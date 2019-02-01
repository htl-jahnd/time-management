const {
    ipcRenderer
} = require('electron')
const User = require('../../models/user');
const alertify = require('alertifyjs');
window.$ = window.jQuery = require('jquery'); 
window.Bootstrap = require('bootstrap');


window.onerror = function (msg, url, lineNo, columnNo, error) {
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1) {
        alertify.error('Script Error: See Browser Console for Detail');
    } else {
        var message = [
            'Message: ' + msg
        ].join(' - ');
        alertify.error(message);
        console.log(error)
    }

    return false;
};

$(document).ready(() => {
    $('#loading').hide();
    $('#btnShowLogin').click(showLogin)
    $('#btnShowRegister').click(showRegister)
})

function showLogin() {
    $('#signUp').addClass('invisible')
    $('#signIn').removeClass('invisible')
}

function showRegister() {
    $('#signIn').addClass('invisible')
    $('#signUp').removeClass('invisible')
}

//used in html
function signIn() {
    let name = $('#txtSignInUsername').val()
    let pwd = $('#txtSignInPassword').val()
    if (name === "" || pwd === "")
        throw new TypeError('Please enter all data.')
    let usr = new User(name, pwd)
    ipcRenderer.send('sign-in', usr)
    $('#loading').show()
}

//used in html
function signUp() {
    let name = $('#txtSignUpUsername').val()
    let pwd = $('#txtSignUpPassword').val()
    let confPwd = $('#txtSignUpPasswordConfirmation').val()
    if (name === "" || pwd === "" || confPwd === "")
        throw new TypeError('Please enter all data.')
    if (pwd !== confPwd) {
        throw new TypeError('Passwords do not match.')
    } else {
        var usr = new User(name, pwd)
        ipcRenderer.send('sign-up', pwd)
        $('#loading').show()
    }
}