var $username = "";
var $pw = "";
var Doctor = {
    fname: "",
    lname: "",
    tp: "",
    address: "",
    specialization: "",
    hospitalId: 0
};
var Doctors = [];
var Hospitals = [];
var Docs1 = [];
var doctortable = ["fname", "lname", "specialization", "hospitalId", "tp"];

var $rootUrl = "http://localhost:8080/demorest/webapi/adminlogin/doctor/";
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
            Doctors = data;
            $.ajax({
                url: "http://localhost:8080/demorest/webapi/adminlogin/hospital",
                headers: {
                    "Authorization": "Basic " + btoa($username + ":" + $pw)
                },
                contentType: 'application/json',
                dataType: 'json',
                type: 'GET',
                success: function(data2) {
                    Hospitals = data2;
                    addHosptl();
                    tableCreation(Docs1)
                }
            });
        }
    });


});
$(document).on("click", "#ResetBtn", function() {
    removetble();
    tableCreation(Docs1)
});

$(document).on("click", "#searchBtn", function() {
    Searchusers = [];
    removetble();
    var searchinput = document.getElementById("inputSearch").value;
    document.getElementById("inputSearch").value = '';
    Docs1.forEach(function(item) {
        if (item["fname"] == searchinput || item["lname"] == searchinput) {
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
            doctortable.forEach(function(key) {
                var cell = document.createElement("td");
                cell.textContent = item[key];
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

function addButtonClick() {
    var select = document.getElementById("inputhospital");
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
    Docs1.forEach(function(item) {
        if (item["id"] == para) {
            Doctor = item;
        }
    });
    setViewData();
}

function editbuttonClick(para) {
    Docs1.forEach(function(item) {
        if (item["id"] == para) {
            Doctor = item;
        }
    });
    setEditViewData();
}

function deletebuttonClick(para) {
    $globalUrl = $rootUrl + para;

}


$(document).on("click", "#formCreateBtn", function(event) {
    if(setCreateData()){
    $url = $rootUrl;

    $.ajax({
        type: "POST",
        url: $url,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(Doctor),
        dataType: 'json',
        success: function() {
            alertModifier('create', 'success');
            $('#AlertModal').modal('show');
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Cannot create record due to server error';
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
        },
    });
    }
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
                msg = 'Cannot delete the Record \nRelated items Found';
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
            alertModifier('delete', msg);
            $('#AlertModal').modal('show');
        },
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
        data: JSON.stringify(Doctor),
        dataType: 'json',
        success: function() {
            alertModifier('update', 'success');
            $('#AlertModal').modal('show');

        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Update failed \nRelated record found';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
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
            alertModifier('delete', msg);
            $('#AlertModal').modal('show');

        }
    });

});

function setViewData() {
    document.getElementById("fname").innerHTML = Doctor.fname;
    document.getElementById("lname").innerHTML = Doctor.lname;
    document.getElementById("hospital").innerHTML = Doctor.hospitalId;
    document.getElementById("tp").innerHTML = Doctor.tp;
    document.getElementById("addrss").innerHTML = Doctor.address;
    document.getElementById("spec").innerHTML = Doctor.specialization;
}

function setEditViewData() {
    document.getElementById("fnameEdit").value = Doctor.fname;
    document.getElementById("lnameEdit").value = Doctor.lname;
    document.getElementById("tpEdit").value = Doctor.tp;
    document.getElementById("addrssEdit").value = Doctor.address;
    document.getElementById("specEdit").value = Doctor.specialization;

    var select = document.getElementById("hospitalEdit");
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
    document.getElementById("hospitalEdit").value = Doctor.hospitalId;

}

function setEditData() {
    Doctor.fname = document.getElementById("fnameEdit").value;
    Doctor.lname = document.getElementById("lnameEdit").value;
    Doctor.tp = document.getElementById("tpEdit").value;
    Doctor.address = document.getElementById("addrssEdit").value;
    Doctor.specialization = document.getElementById("specEdit").value;
    Hospitals.forEach(function(item) {
        if (item["name"] == document.getElementById("hospitalEdit").value) {
            Doctor.hospitalId = item["id"];
        }
    });
}

function setCreateData() {
	var validate=true;
    Doctor.fname = document.getElementById("inputfname").value;
    Doctor.lname = document.getElementById("inputlname").value;
    Doctor.tp = document.getElementById("inputtp").value;
    Doctor.address = document.getElementById("inputaddrss").value;
    Doctor.specialization = document.getElementById("inputspec").value;
    Hospitals.forEach(function(item) {
        if (item["name"] == document.getElementById("inputhospital").value) {
            Doctor.hospitalId = item["id"];
        }
    });
    if (Doctor.fname == "") {
    	document.getElementById("inputfname").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputfname").style.outline = "";
    if (Doctor.tp == "") {
    	document.getElementById("inputtp").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputtp").style.outline = "";
    	
    if (Doctor.address == "") {
    	document.getElementById("inputaddrss").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputaddrss").style.outline = "";
    if (Doctor.lname == "") {
    	document.getElementById("inputlname").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputlname").style.outline = "";
    if (Doctor.specialization == "") {
    	document.getElementById("inputspec").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputspec").style.outline = "";
    	
    return validate;
}


function addHosptl() {
    Doctors.forEach(function(doc1) {
        var hsptlid = doc1["hospitalId"];
        Hospitals.forEach(function(hsptl) {
            if (hsptl["id"] == hsptlid) {
                doc1["hospitalId"] = hsptl["name"];
            }
        });
        Docs1.push(doc1);
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