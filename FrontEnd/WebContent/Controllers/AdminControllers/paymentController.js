var $username = "";
var $pw = "";
var payment = {
    userId: 0,
    date: "",
    amount: "",
    appointmentId: 0
};
var payments = [];
var payments1 = [];
var Users = [];
var paymnttable = ["appointmentId", "userId", "date", "amount"];

var $rootUrl = "http://localhost:8080/demorest/webapi/adminlogin/payment/";
var $globalUrl = "";

$(document).ready(function() {
    $username = sessionStorage.getItem("username");
    $pw = sessionStorage.getItem("pw");

    $.ajax({
        url: $rootUrl,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            payments = data;
            $.ajax({
                url: "http://localhost:8080/demorest/webapi/adminlogin/users",
                headers: {
                    "Authorization": "Basic " + btoa($username + ":" + $pw)
                },
                contentType: 'application/json',
                dataType: 'json',
                type: 'GET',
                success: function(data2) {
                    Users = data2;
                    addUsers();
                    tableCreation(payments1);
                }
            });
        }
    });


});

$(document).on("click", "#ResetBtn", function() {
    removetble();
    tableCreation(payments1);
});

$(document).on("click", "#searchBtn", function() {
    Searchusers = [];
    removetble();
    var searchinput = document.getElementById("inputSearch").value;
    document.getElementById("inputSearch").value = '';
    payments1.forEach(function(item) {
        if (item["userId"] == searchinput) {
            Searchusers.push(item)
        }
    });
    tableCreation(Searchusers);

});
function tableCreation(para) {
	 if (document.getElementById("listtable") != null) {
         var table = document.getElementById("listtable");
         var tbody = document.createElement("tbody");
         table.appendChild(tbody);
         para.forEach(function(item) {
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
function ViewbuttonClick(para) {
    payments1.forEach(function(item) {
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


function addUsers() {
    payments.forEach(function(item) {
        var userid = item["userId"];
        Users.forEach(function(item2) {
            if (item2["id"] == userid) {
                item["userId"] = item2["fname"] + " " + item2["lname"];
            }
        });
        payments1.push(item);
    });
}

function signOut() {
    sessionStorage.clear();
    window.location = "/FrontEnd/views/login.jsp";
}

$(document).on("click", "#sidebarCollapse", function(event) {
    $('#sidebar').toggleClass('active');
});
function removetble() {
    var myTable = document.getElementById('listtable');
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        myTable.deleteRow(x);
    }

}
$(document).on("click", "#CloseBtn", function(event) {
    window.location.reload();
});