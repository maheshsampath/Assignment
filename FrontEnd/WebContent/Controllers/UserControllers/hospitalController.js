var $username = "";
var $pw = "";
var $id = "";
var Hospital = {
    name: "",
    address: "",
    tp: ""
};
var appointment = {
	    doctorId: 0,
	    userId: 0,
	    hospitalId: 0,
	    date: "",
	    paid: "no"
	};
var Hospitals = [];
var docts = [];
var hosptlId="";
var docId="";
var Searchusers = [];
var hosptltable = ["name", "address", "tp"];

var $rootUrl = "http://localhost:8080/demorest/webapi/userlogin/hospital/";
var $globalUrl = "";

$(document).ready(function() {
    $username = sessionStorage.getItem("username");
    $pw = sessionStorage.getItem("pw");
    $id = sessionStorage.getItem("id");

    $.ajax({
        url: $rootUrl,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            Hospitals = data;
            tableCreation(Hospitals);

        }
    });


});
$(document).on("click", "#ResetBtn", function() {
    removetble();
    tableCreation(Hospitals);
});

$(document).on("click", "#searchBtn", function() {
    Searchusers = [];
    removetble();
    var searchinput = document.getElementById("inputSearch").value;
    document.getElementById("inputSearch").value = '';
    Hospitals.forEach(function(item) {
        if (item["name"] == searchinput) {
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
            hosptltable.forEach(function(key) {
                var cell = document.createElement("td");
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
	removeDoctble();
    Hospitals.forEach(function(item) {
        if (item["id"] == para) {
            Hospital = item;
        }
    });
    $.ajax({
        url: "http://localhost:8080/demorest/webapi/userlogin/doctorByHsptl/"+para,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
        	docts = data;
        	 setViewData();
        }
    });
   
}

function setViewData() {
    document.getElementById("name").innerHTML = Hospital.name;
    document.getElementById("tp").innerHTML = Hospital.tp;
    document.getElementById("address").innerHTML = Hospital.address;
    var table = document.getElementById("doctable");
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    docts.forEach(function(item) {

        var row = document.createElement("tr");
        var cell = document.createElement("td");
        cell.textContent = item["fname"];
        row.appendChild(cell);

        var cell = document.createElement("td");
        cell.textContent = item["lname"];
        row.appendChild(cell);

        var cellview = document.createElement("td");
        cellview.innerHTML =  "<a href='#addAppointmentModal' onclick='addAppontmentClick("+Hospital.id +","+item["id"]+")' class='view' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE147;</i></a>";
        row.appendChild(cellview);
        
        tbody.appendChild(row);

    });
}

function addAppontmentClick(para1,para2){
	var hsptlName;
	var docName;
	hosptlId=para1;
	docId=para2;
	docts.forEach(function(item) {
		if(item["id"]==docId)
			docName=item["fname"]+" "+item["lname"];
	})
	Hospitals.forEach(function(item) {
        if (item["id"] == hosptlId)
        	hsptlName = item["name"];
    });
	$("#viewModal .close").click();
	$.ajax({
        url: "http://localhost:8080/demorest/webapi/userlogin/appointmentByDoc/"+docId,
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
	
	
	document.getElementById("inputhospitalId").innerHTML=hsptlName;
	document.getElementById("inputdoctorId").innerHTML=docName;
}

$(document).on("click", "#formCreateBtn", function(event) {
    setAddData();
    $url = "http://localhost:8080/demorest/webapi/userlogin/appointment/";

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
        	$("#addAppointmentModal .close").click();
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
function processPayment(para){
	$("#AlertPymentModal .close").click();
 	$("#addModal .close").click(); 
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
		 		        url: "http://localhost:8080/demorest/webapi/userlogin/appointment/",
		 		        headers: {
		 		            "Authorization": "Basic " + btoa($username + ":" + $pw)
		 		        },
		 		        contentType: "application/json; charset=utf-8",
		 		        data: JSON.stringify(appointment),
		 		        dataType: 'json',
		 		        success: function(data) {
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
    var myTable = document.getElementById('doctable');
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        myTable.deleteRow(x);
    }

}
function setAddData() {
    appointment.paid = "no";
    appointment.date = document.getElementById("inputdate").value;
    appointment.userId = $id;
    appointment.hospitalId = hosptlId;
    appointment.doctorId =docId
}

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
$(document).on("click", "#CloseBtn1", function(event) {
    window.location.reload();
});
$(document).on("click", "#CloseBtn2", function(event) {
    window.location.reload();
});