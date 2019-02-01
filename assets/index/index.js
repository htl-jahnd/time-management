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
