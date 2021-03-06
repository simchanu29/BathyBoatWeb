var globalAlertContainer, alertContainer;

var alerts = [];


function addAlert(alert) {
    alert.id = alerts.length;
    alerts.push(alert);

    var htmlAlert = '<div class="alert alert-dismissible alert-' + alert.type + '"><button type="button" id="alert_'+ alert.id +
        '" class="close" data-dismiss="alert">&times;</button>' +
        '<strong>' + alert.title + ': </strong>' + alert.body + '</div>';
    alertContainer.html(htmlAlert);

    var htmlGlobalAlert = '<div class="alert alert-dismissible alert-' + alert.type + '">' +
        '<div><strong>' + alert.title + ': </strong>' + alert.body + '</div><div>' +
        new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + '</div></div>';
    globalAlertContainer.html(htmlGlobalAlert + globalAlertContainer.html());

    var selectionCount = document.querySelectorAll("#alert_container").length;
    console.log(selectionCount);
}


$(document).ready(function () {
    globalAlertContainer = $('#global_alert_container');
    alertContainer = $('#alert_container');
});