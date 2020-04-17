var $username = "";
var $pw = "";
var Hospital = {
    name: "",
    address: "",
    tp: ""
};
var Hospitals = [];
var hosptltable = ["name", "address", "tp"];

var $rootUrl = "http://localhost:8080/demorest/webapi/adminlogin/hospital/";
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

function ViewbuttonClick(para) {
    Hospitals.forEach(function(item) {
        if (item["id"] == para) {
            Hospital = item;
        }
    });
    setViewData();
}

function editbuttonClick(para) {
    Hospitals.forEach(function(item) {
        if (item["id"] == para) {
            Hospital = item;
        }
    });
    setEditViewData();
}

function deletebuttonClick(para) {
    $globalUrl = $rootUrl + para;

}


$(document).on("click", "#formCreateBtn", function(event) {
	$url = $rootUrl;
	if(setCreateData()){

    $.ajax({
        type: "POST",
        url: $url,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(Hospital),
        dataType: 'json',
        success: function() {
            alertModifier('create', 'success');
            $('#AlertModal').modal('show');
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Cannot Create the Record ';
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
    })
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
                msg = 'Cannot delete the Record related Items found';
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
            alertModifier('create', msg);
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
        data: JSON.stringify(Hospital),
        dataType: 'json',
        success: function() {
            alertModifier('update', 'success');
            $('#AlertModal').modal('show');
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Cannot update the Record \nRelated Items Found';
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

function setCreateData() {
	var validate=true;
    Hospital.name = document.getElementById("inputname").value;
    Hospital.tp = document.getElementById("inputTp").value;
    Hospital.address = document.getElementById("inputAddress").value;
    if (Hospital.name == "") {
    	document.getElementById("inputname").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputname").style.outline = "";
    if (Hospital.tp == "") {
    	document.getElementById("inputTp").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputTp").style.outline = "";
    	
    if (Hospital.address == "") {
    	document.getElementById("inputAddress").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputAddress").style.outline = "";
    	
    return validate;
	}
function setViewData() {
    document.getElementById("name").innerHTML = Hospital.name;
    document.getElementById("tp").innerHTML = Hospital.tp;
    document.getElementById("address").innerHTML = Hospital.address;
}

function setEditViewData() {
    document.getElementById("nameEdit").value = Hospital.name;
    document.getElementById("tpEdit").value = Hospital.tp;
    document.getElementById("addressEdit").value = Hospital.address;

}

function setEditData() {
    Hospital.name = document.getElementById("nameEdit").value;
    Hospital.tp = document.getElementById("tpEdit").value;
    Hospital.address = document.getElementById("addressEdit").value;
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