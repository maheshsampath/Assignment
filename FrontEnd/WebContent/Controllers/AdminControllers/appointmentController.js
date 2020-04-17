var $username = "";
var $pw = "";
var appointment = {
    doctorId: 0,
    userId: 0,
    hospitalId: 0,
    date: "",
    paid: ""
};
var appointments = [];
var Doctors = [];
var Users = [];
var Hospitals = [];
var appointments2 = [];
var appointments3 = [];
var appointments4 = [];
var SearchAppointments = [];
var apointmenttable = ["doctorId", "userId", "hospitalId", "date", "paid"];
var appointDocTable = ["doctorId", "date"];

var $rootUrl = "http://localhost:8080/demorest/webapi/adminlogin/appointment/";
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
            appointments = data;
            $.ajax({
                url: "http://localhost:8080/demorest/webapi/adminlogin/doctor",
                headers: {
                    "Authorization": "Basic " + btoa($username + ":" + $pw)
                },
                contentType: 'application/json',
                dataType: 'json',
                type: 'GET',
                success: function(data1) {
                    Doctors = data1;
                    addDoc();
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
                            addUser();

                            $.ajax({
                                url: "http://localhost:8080/demorest/webapi/adminlogin/hospital",
                                headers: {
                                    "Authorization": "Basic " + btoa($username + ":" + $pw)
                                },
                                contentType: 'application/json',
                                dataType: 'json',
                                type: 'GET',
                                success: function(data) {
                                    Hospitals = data;
                                    addHosptl();
                                    tableCreation(appointments4);
                                }
                            });

                        }
                    });
                }
            });

        }
    });


});

function addButtonClick() {
    var select = document.getElementById("inputuserId");
    var i, L = select.options.length - 1;
    for (i = L; i >= 0; i--) {
        select.remove(i);
    }
    Users.forEach(function(item) {
        var el = document.createElement("option");
        el.text = item["fname"] + " " + item["lname"];
        el.value = item["fname"] + " " + item["lname"];
        select.add(el);
    });
    select = document.getElementById("inputhospitalId");
    var i, L = select.options.length - 1;
    for (i = L; i >= 0; i--) {
        select.remove(i);
    }
    Hospitals.forEach(function(item) {
        var el = document.createElement("option");
        el.text = item["name"];
        el.value = item["name"];
        select.add(el);
    });

}

function ViewbuttonClick(para) {
    appointments4.forEach(function(item) {
        if (item["id"] == para) {
            appointment = item;
        }
    });
    setViewData();
}

function deletebuttonClick(para) {
    $globalUrl = $rootUrl + para;

}

function editbuttonClick(para) {
    appointments4.forEach(function(appointment1) {
        if (appointment1["id"] == para) {
            appointment = appointment1;
        }
    });
    setEditViewData();
}

$(document).on("click", "#formCreateBtn", function(event) {
    setAddData();
    $url = $rootUrl;

    $.ajax({
        type: "POST",
        url: $url,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(appointment),
        dataType: 'json',
        success: function() {
            alertModifier('create', 'success');
            $('#AlertModal').modal('show');
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Fail to create Appontment due to server error';
            } else if (jqXHR.status == 404) {
                msg = 'No Access';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alertModifier('create', msg);
            $('#AlertModal').modal('show');
        }
    });


});

$(document).on("click", "#formDeleteBtn", function(event) {
    $.ajax({
        url: $globalUrl,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'DELETE',
        success: function(data) {
            alertModifier('delete', 'success');
            $('#AlertModal').modal('show');
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Cannot delete the Record \nRelated Payment Found';
            } else if (jqXHR.status == 404) {
                msg = 'No Access';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alertModifier('create', msg);
            $('#AlertModal').modal('show');
        }
    });
});

$(document).on("click", "#formEditBtn", function(event) {
    setEditData();
    $url = $rootUrl;
    $.ajax({
        type: "PUT",
        url: $url,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(appointment),
        dataType: 'json',
        success: function() {
            alertModifier('update', 'success');
            $('#AlertModal').modal('show');
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Cannot update the Record';
            } else if (jqXHR.status == 404) {
                msg = 'No Access';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alertModifier('create', msg);
            $('#AlertModal').modal('show');
        }
    });
});

$(document).on("click", "#searchBtn", function() {
    SearchAppointments = [];
    removetble();
    var searchinput = document.getElementById("inputSearch").value;
    document.getElementById("inputSearch").value = '';
    Users.forEach(function(item) {
        if (item["fname"] == searchinput || item["lname"] == searchinput) {
            appointments4.forEach(function(item2) {
                if (item2["userId"] == item["fname"] + " " + item["lname"]) {
                    SearchAppointments.push(item2)
                }
            });
        }
    });
    Doctors.forEach(function(item) {
        if (item["fname"] == searchinput || item["lname"] == searchinput) {
            appointments4.forEach(function(item2) {
                if (item2["doctorId"] == item["fname"] + " " + item["lname"]) {
                    SearchAppointments.push(item2)
                }
            });
        }
    });
    Hospitals.forEach(function(item) {
        if (item["name"] == searchinput) {
            appointments4.forEach(function(item2) {
                if (item2["hospitalId"] == item["name"]) {
                    SearchAppointments.push(item2)
                }
            });
        }
    });
    tableCreation(SearchAppointments);

});

$(document).on("click", "#ResetBtn", function() {
    removetble();
    tableCreation(appointments4)
});

function tableCreation(para) {
    if (document.getElementById("listtable") != null) {
        var table = document.getElementById("listtable");
        var tbody = document.createElement("tbody");
        table.appendChild(tbody);
        para.forEach(function(item) {
            userSelect = item["id"];
            var row = document.createElement("tr");
            apointmenttable.forEach(function(key) {
                var cell = document.createElement("td");
                if (key == "date") {
                    cell.textContent = item[key].replace('Z', '');;
                } else {
                    cell.textContent = item[key];
                }
                row.appendChild(cell);
            });
            var cellview = document.createElement("td");
            cellview.innerHTML = "<a href='#viewModal' onclick='ViewbuttonClick(" + userSelect + ")' class='view' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>visibility</i></a>";
            row.appendChild(cellview);
            var celledit = document.createElement("td");
            celledit.innerHTML = "<a href='#editModal' onclick='editbuttonClick(" + userSelect + ")' class='edit' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i></a>";
            row.appendChild(celledit);
            var celldelete = document.createElement("td");
            celldelete.innerHTML = "<a href='#deleteModal' onclick='deletebuttonClick(" + userSelect + ")' class='delete' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i></a>";
            row.appendChild(celldelete);
            tbody.appendChild(row);
        });
    }
}

function setAddData() {
    appointment.paid = "no";
    appointment.date = document.getElementById("inputdate").value;
    Hospitals.forEach(function(item) {
        if (item["name"] == document.getElementById("inputhospitalId").value) {
            appointment.hospitalId = item["id"];
        }
    });
    Users.forEach(function(item) {
        if (item["fname"] + " " + item["lname"] == document.getElementById("inputuserId").value) {
            appointment.userId = item["id"];
        }
    });
    Doctors.forEach(function(item) {
        if (item["fname"] + " " + item["lname"] == document.getElementById("inputdoctorId").value) {
            appointment.doctorId = item["id"];
        }
    });
}

function setViewData() {
    document.getElementById("doctorId").innerHTML = appointment.doctorId;
    document.getElementById("userId").innerHTML = appointment.doctorId;
    document.getElementById("hospitalId").innerHTML = appointment.hospitalId;
    document.getElementById("paid").innerHTML = appointment.paid;
    document.getElementById("date").innerHTML = appointment.date.replace('Z', '');
}

function setEditViewData() {
    var select = document.getElementById("hospitalIdEdit");
    var i, L = select.options.length - 1;
    for (i = L; i >= 0; i--) {
        select.remove(i);
    }
    Hospitals.forEach(function(item) {
        var el = document.createElement("option");
        el.text = item["name"];
        el.value = item["name"];
        select.add(el);
    });
    document.getElementById("hospitalIdEdit").value = appointment.hospitalId;

    var select1 = document.getElementById("doctorIdEdit");
    var i, L = select1.options.length - 1;
    for (i = L; i >= 0; i--) {
        select1.remove(i);
    }
    Doctors.forEach(function(item) {
        var el = document.createElement("option");
        el.text = item["fname"] + " " + item["lname"];
        el.value = item["fname"] + " " + item["lname"];
        select1.add(el);
    });
    document.getElementById("doctorIdEdit").value = appointment.doctorId;

    var select2 = document.getElementById("userIdEdit");
    var i, L = select2.options.length - 1;
    for (i = L; i >= 0; i--) {
        select2.remove(i);
    }
    Users.forEach(function(item) {
        var el = document.createElement("option");
        el.text = item["fname"] + " " + item["lname"];
        el.value = item["fname"] + " " + item["lname"];
        select2.add(el);
    });
    document.getElementById("userIdEdit").value = appointment.userId;
    document.getElementById("dateEdit").value = appointment.date.replace('Z', '');
}

function setEditData() {
    appointment.date = document.getElementById("dateEdit").value;
    Hospitals.forEach(function(item) {
        if (item["name"] == document.getElementById("hospitalIdEdit").value) {
            appointment.hospitalId = item["id"];
        }
    });
    Users.forEach(function(item) {
        if (item["fname"] + " " + item["lname"] == document.getElementById("userIdEdit").value) {
            appointment.userId = item["id"];
        }
    });
    Doctors.forEach(function(item) {
        if (item["fname"] + " " + item["lname"] == document.getElementById("doctorIdEdit").value) {
            appointment.doctorId = item["id"];
        }
    });
}

function addDoc() {
    appointments.forEach(function(appointment1) {
        var docid = appointment1["doctorId"];
        Doctors.forEach(function(doc) {
            if (doc["id"] == docid) {
                appointment1["doctorId"] = doc["fname"] + " " + doc["lname"];
            }
        });
        appointments2.push(appointment1);
    });
}

function addUser() {
    appointments2.forEach(function(appointment1) {
        var usrid = appointment1["userId"];
        Users.forEach(function(user) {
            if (user["id"] == usrid) {
                appointment1["userId"] = user["fname"] + " " + user["lname"];
            }
        });
        appointments3.push(appointment1);
    });
}

function addHosptl() {
    appointments3.forEach(function(appointment1) {
        var hsptlid = appointment1["hospitalId"];
        Hospitals.forEach(function(hsptl) {
            if (hsptl["id"] == hsptlid) {
                appointment1["hospitalId"] = hsptl["name"];
            }
        });
        appointments4.push(appointment1);
    });
}

function docChange() {
    removeDoctble();
    var doc = document.getElementById("inputdoctorId").value;
    var table = document.getElementById("appointmntDatetable");
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    appointments4.forEach(function(item) {
        if (item["doctorId"] == doc) {
            console.log(item["doctorId"]);
            console.log(item["date"]);
            var row = document.createElement("tr");
            var cell = document.createElement("td");
            cell.textContent = item["doctorId"];
            row.appendChild(cell);

            var cell = document.createElement("td");
            cell.textContent = item["date"].replace('Z', '');
            row.appendChild(cell);

            tbody.appendChild(row);
        }
    });

}

function hsptlChange() {
    removeDoctble();
    var hsptlname = document.getElementById("inputhospitalId").value;
    var hsptlId = '';
    Hospitals.forEach(function(item) {
        if (item["name"] == hsptlname) {
            hsptlId = item["id"];
        }
    });
    var select = document.getElementById("inputdoctorId");
    var i, L = select.options.length - 1;
    for (i = L; i >= 0; i--) {
        select.remove(i);
    }
    var el = document.createElement("option");
    el.text = "";
    el.value = "";
    select.add(el);
    Doctors.forEach(function(item) {
        if (item["hospitalId"] == hsptlId) {
            el = document.createElement("option");
            el.text = item["fname"] + " " + item["lname"];
            el.value = item["fname"] + " " + item["lname"];
            select.add(el);
        }

    });

}

function signOut() {
    sessionStorage.clear();
    window.location = "/FrontEnd/views/login.jsp";
}

$(document).on("click", "#sidebarCollapse", function() {
    $('#sidebar').toggleClass('active');
});

function removetble() {
    var myTable = document.getElementById('listtable');
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        myTable.deleteRow(x);
    }

}

function removeDoctble() {
    var myTable = document.getElementById('appointmntDatetable');
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        myTable.deleteRow(x);
    }

}
$(document).on("click", "#CloseBtn", function(event) {
    window.location.reload();
});

function alertModifier(para1, para2) {
    if (para2 == 'success') {
        document.getElementById('alertTitle').innerHTML = "Succeed";
        switch (para1) {
            case 'create':
                document.getElementById('AlertMsg').innerHTML = "Record Added Successfully";
                break;
            case 'update':
                document.getElementById('AlertMsg').innerHTML = "Record Updated Successfully";
                break;
            case 'delete':
                document.getElementById('AlertMsg').innerHTML = "Record Deleted Successfully";
                break;
        }
    } else {
        document.getElementById('alertTitle').innerHTML = "Failed";
        document.getElementById('AlertMsg').innerHTML = para2;

    }
}