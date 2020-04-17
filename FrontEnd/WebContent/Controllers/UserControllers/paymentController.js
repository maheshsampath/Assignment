var $username = "";
var $pw = "";
var $id = "";
var payment = {
    userId: 0,
    date: "",
    amount: "",
    appointmentId: 0
};
var payments = [];
var Users = [];
var paymnttable = ["appointmentId", "date", "amount"];

var $rootUrl = "http://localhost:8080/demorest/webapi/userlogin/payment/";
var $globalUrl = "";



$(document).ready(function() {
    $username = sessionStorage.getItem("username");
    $pw = sessionStorage.getItem("pw");
    $id = sessionStorage.getItem("id");

    $.ajax({
        url: $rootUrl+$id,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            payments = data;
            if (document.getElementById("listtable") != null) {
                var table = document.getElementById("listtable");
                var tbody = document.createElement("tbody");
                table.appendChild(tbody);
                payments.forEach(function(item) {
                    userSelect = item["id"];
                    var row = document.createElement("tr");
                    paymnttable.forEach(function(key) {
                        var cell = document.createElement("td");
                        if (key == "date" && item[key] != undefined) {
                            item[key] = item[key].replace('Z', '')
                        }
                        cell.textContent = item[key];
                        row.appendChild(cell);
                    });
                    var cellview = document.createElement("td");
                    cellview.innerHTML = "<a href='#viewModal' onclick='ViewbuttonClick(" + userSelect + ")' class='view' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>visibility</i></a>";
                    row.appendChild(cellview);
                    tbody.appendChild(row);
                });
            }
        }
        
    });


});



function ViewbuttonClick(para) {
    payments.forEach(function(item) {
        if (item["id"] == para) {
            payment = item;
        }
    });
    setViewData();
}


function setViewData() {
    document.getElementById("appointment").innerHTML = payment.appointmentId;
    document.getElementById("uname").innerHTML = payment.userId;
    document.getElementById("date").innerHTML = payment.date.replace('Z', '');
    document.getElementById("amount").innerHTML = payment.amount;
}


function signOut() {
    sessionStorage.clear();
    window.location = "/FrontEnd/views/login.jsp";
}

$(document).on("click", "#sidebarCollapse", function(event) {
    $('#sidebar').toggleClass('active');
});