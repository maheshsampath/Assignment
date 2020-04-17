var $username = "";
var $pw = "";
var $id = "";
var appointment = {
    doctorId: 0,
    userId: 0,
    hospitalId: 0,
    date: "",
    paid: "no"
};
var appointments = [];
var Doctors = [];
var Hospitals = [];
var appointments2 = [];
var appointments3 = [];
var sortedappointments = [];
var apointmenttable = ["doctorId", "hospitalId", "date", "paid", ""];
var appointDocTable = ["doctorId", "date"];

var $rootUrl = "http://localhost:8080/demorest/webapi/userlogin/appointment/";
var $globalUrl = "";

$(document).ready(function() {
    $username = sessionStorage.getItem("username");
    $pw = sessionStorage.getItem("pw");
    $id = sessionStorage.getItem("id");
    $.ajax({
        url: $rootUrl + $id,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            appointments = data;
            $.ajax({
                url: "http://localhost:8080/demorest/webapi/userlogin/doctor",
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
                        url: "http://localhost:8080/demorest/webapi/userlogin/hospital",
                        headers: {
                            "Authorization": "Basic " + btoa($username + ":" + $pw)
                        },
                        contentType: 'application/json',
                        dataType: 'json',
                        type: 'GET',
                        success: function(data) {
                            Hospitals = data;
                            addHosptl();
                            tableCreation(appointments3);
                        }
                    });
                }
            });

        }
    });


});
function processPayment(para){

	  payment = {
		        userId: $id,
		        date:new Date().toISOString().slice(0,10),
		        amount: 5000,
		        appointmentId:appointment.id,
		        paypalId:para

		    }

		    $.ajax({
		        type: "POST",
		        url: "http://localhost:8080/demorest/webapi/userlogin/payment",
		        headers: {
		            "Authorization": "Basic " + btoa($username + ":" + $pw)
		        },
		        contentType: "application/json; charset=utf-8",
		        data: JSON.stringify(payment),
		        dataType: 'json',
		        success: function() {
		        	appointment.paid='yes';
		        	$("#paypal-button-container").addClass("disabledDiv");
		        	 $.ajax({
		 		        type: "PUT",
		 		        url: $rootUrl,
		 		        headers: {
		 		            "Authorization": "Basic " + btoa($username + ":" + $pw)
		 		        },
		 		        contentType: "application/json; charset=utf-8",
		 		        data: JSON.stringify(appointment),
		 		        dataType: 'json',
		 		        success: function(data) {
		 		        	$("#AlertPymentModal .close").click()
		 		        	$("#addModal .close").click(); 
		 		        	alertModifier('payment','success');
		 		        	$('#AlertModal').modal('show');
		 		        }});

		        },
		        error: function(jqXHR, exception) {
		            var msg = '';
		            if (jqXHR.status === 0) {
		                msg = 'Failed';
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
		            alertModifier('payment',msg);
		        	$('#AlertModal').modal('show');
		        },
		    });
}
function addButtonClick() {

    var select = document.getElementById("inputhospitalId");
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
        success: function(data) {
        	appointment=data;
        	$('#addModal').modal('toggle');
        	paymentAlertModifier('create', 'success');
            $('#AlertPymentModal').modal('show');
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Creation Failed due to server error';
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


function sortTable(para) {
    sortedappointments = [];
    removetble();
    var todayDate = new Date().toISOString().slice(0, 10);
    switch (para) {
        case 'all':
            appointments3.forEach(function(appointment1) {
                sortedappointments.push(appointment1);
            });
            break;
        case 'today':
            appointments3.forEach(function(appointment1) {
                if (appointment1["date"].replace('Z', '') == todayDate) {
                    sortedappointments.push(appointment1);
                }
            });
            break;
        case 'up':
            appointments3.forEach(function(appointment1) {
                if (appointment1["date"].replace('Z', '') > todayDate) {
                    sortedappointments.push(appointment1);
                }
            });
            break;
        case 'past':
            appointments3.forEach(function(appointment1) {
                if (appointment1["date"].replace('Z', '') < todayDate) {
                    sortedappointments.push(appointment1);
                }
            });
            break;
    }
    tableCreation(sortedappointments)
}

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
            tbody.appendChild(row);
        });
    }
}

function setAddData() {
    appointment.paid = "no";
    appointment.date = document.getElementById("inputdate").value;
    appointment.userId = $id;
    Hospitals.forEach(function(item) {
        if (item["name"] == document.getElementById("inputhospitalId").value) {
            appointment.hospitalId = item["id"];
        }
    });

    Doctors.forEach(function(item) {
        if (item["fname"] + " " + item["lname"] == document.getElementById("inputdoctorId").value) {
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

function addHosptl() {
    appointments2.forEach(function(appointment1) {
        var hsptlid = appointment1["hospitalId"];
        Hospitals.forEach(function(hsptl) {
            if (hsptl["id"] == hsptlid) {
                appointment1["hospitalId"] = hsptl["name"];
            }
        });
        appointments3.push(appointment1);
    });
}

function docChange() {
    removeDoctble();
    var docname = document.getElementById("inputdoctorId").value;
    var docId = '';
    Doctors.forEach(function(doc) {
        if (doc["fname"] + " " + doc["lname"] == docname) {
            docId = doc["id"];
        }
    });

    $.ajax({
        url: "http://localhost:8080/demorest/webapi/userlogin/appointmentByDoc/" + docId,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            var docAppointmnts = data;
            var table = document.getElementById("appointmntDatetable");
            var tbody = document.createElement("tbody");
            table.appendChild(tbody);
            docAppointmnts.forEach(function(item) {

                var row = document.createElement("tr");
                var cell = document.createElement("td");
                cell.textContent = item["id"];
                row.appendChild(cell);

                var cell = document.createElement("td");
                cell.textContent = item["date"].replace('Z', '');
                row.appendChild(cell);

                tbody.appendChild(row);

            });
        }
    });
}

function hsptlChange() {
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
            var el = document.createElement("option");
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

function removeDoctble() {
    var myTable = document.getElementById('appointmntDatetable');
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        myTable.deleteRow(x);
    }

}
$(document).on("click", "#CloseBtn1", function(event) {
    window.location.reload();
});
$(document).on("click", "#CloseBtn2", function(event) {
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
            case 'payment':
            	document.getElementById('AlertMsg2').innerHTML = "Payment Successfull";
            	break
        }
    } else {
        document.getElementById('alertTitle').innerHTML = "Failed";
        document.getElementById('AlertMsg').innerHTML = para2;

    }
}
function paymentAlertModifier(para1, para2) {
    if (para2 == 'success') {
        document.getElementById('alertTitle2').innerHTML = "Succeed";
        switch (para1) {
            case 'create':
                document.getElementById('AlertMsg2').innerHTML = "Record Added Successfully";
                break;
            case 'update':
                document.getElementById('AlertMsg2').innerHTML = "Record Updated Successfully";
                break;
            case 'delete':
                document.getElementById('AlertMsg2').innerHTML = "Record Deleted Successfully";
                break;
           
        }
    } else {
        document.getElementById('alertTitle2').innerHTML = "Failed";
        document.getElementById('AlertMsg2').innerHTML = para2;

    }
}
