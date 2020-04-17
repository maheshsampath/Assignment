var $username = "";
var $pw = "";
var user = {
    userName: "",
    password: "",
    fname: "",
    lname: "",
    tp: "",
    address: "",
    type: ""
};

var usertable = ["fname", "lname", "tp", "address"];
var users = [];
var Searchusers = [];
var userSelect;
var $rootUrl = "http://localhost:8080/demorest/webapi/adminlogin/users/";
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
            users = data;
            tableCreation(users);
        }
    });

});

function tableCreation(para) {
    var table = document.getElementById("listtable"); // set this to your table
    var tbody = document.createElement("tbody");
    table.appendChild(tbody);
    para.forEach(function(item) {
        userSelect = item["id"];
        var row = document.createElement("tr");
        usertable.forEach(function(key) {
            var cell = document.createElement("td");
            cell.textContent = item[key];
            row.appendChild(cell);
        });
        var cellview = document.createElement("td");
        cellview.innerHTML = "<a href='#viewModal' onclick='ViewUserbuttonClick(" + userSelect + ")' class='view' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>visibility</i></a>";
        row.appendChild(cellview);
        var celledit = document.createElement("td");
        celledit.innerHTML = "<a href='#editModal' onclick='editUserbuttonClick(" + userSelect + ")' class='edit' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i></a>";
        row.appendChild(celledit);
        var celldelete = document.createElement("td");
        celldelete.innerHTML = "<a href='#deleteModal' onclick='deleteUserbuttonClick(" + userSelect + ")' class='delete' data-toggle='modal'><i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i></a>";
        row.appendChild(celldelete);
        tbody.appendChild(row);
    });

}

function removetble() {
    var myTable = document.getElementById('listtable');
    var rowCount = myTable.rows.length;
    for (var x = rowCount - 1; x > 0; x--) {
        myTable.deleteRow(x);
    }

}

function ViewUserbuttonClick(para) {

    $url = $rootUrl + para;
    $.ajax({
        url: $url,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            user = data;
            setViewData();
        }
    });
}

function editUserbuttonClick(para) {
    $url = $rootUrl + para;
    $.ajax({
        url: $url,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            user = data;
            setEditViewData();
        }
    });
}

function deleteUserbuttonClick(para) {
    $globalUrl = $rootUrl + para;

}

$(document).on("click", "#formCreateBtn", function() {
    if(setCreateData()){
    var formData = new FormData($('#createForm')[0]);

    formData.append('file', $('input[type=file]')[0].files[0]);
    formData.append('obj', JSON.stringify(user));
    $.ajax({
        data: formData,
        type: 'POST',
        contentType: false,
        processData: false,

        url: "http://localhost:8080/demorest/webapi/signup/",
        success: function(data, textStatus, jqXHR) {
            if (textStatus != "nocontent") {
            	alertModifier('create', 'success');
                $('#AlertModal').modal('show');
            } else {
            	alertModifier('create', 'User Name Exist');
                $('#AlertModal').modal('show');

            }
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Cannot delete the Record \nRelated Items found Found';
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
            alertModifier('update', 'User Name Exist');
            $('#AlertModal').modal('show');
        }
    })
    }
});

$(document).on("click", "#formDeleteBtn", function() {
    $.ajax({
        url: $globalUrl,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'DELETE',
        success: function() {
        	alertModifier('delete', 'success');
            $('#AlertModal').modal('show');
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Cannot delete the Record \nRelated Items found Found';
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
            alertModifier('update', msg);
            $('#AlertModal').modal('show');
        },
    });

});

$(document).on("click", "#formEditBtn", function() {
    setEditData();
    $url = $rootUrl;

    $.ajax({
        type: "PUT",
        url: $url,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(user),
        dataType: 'json',
        success: function() {

        	alertModifier('update', 'success');
            $('#AlertModal').modal('show');
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Cannot Update the Record \nRelated Items found Found';
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
            alertModifier('update', msg);
            $('#AlertModal').modal('show');
        },
    });

});

$(document).on("click", "#searchBtn", function() {
    Searchusers = [];
    removetble();
    var searchinput = document.getElementById("inputSearch").value;
    document.getElementById("inputSearch").value = '';
    users.forEach(function(item) {
        if (item["fname"] == searchinput || item["lname"] == searchinput) {
            Searchusers.push(item)
        }
    });
    tableCreation(Searchusers);

});

$(document).on("click", "#ResetBtn", function() {
    removetble();
    tableCreation(users)
});

function setCreateData() {
	var validate=true;
    user.userName = document.getElementById("inputUname").value;
    user.password = document.getElementById("inputPw").value;
    user.fname = document.getElementById("inputFname").value;
    user.lname = document.getElementById("inputLname").value;
    user.tp = document.getElementById("inputTp").value;
    user.address = document.getElementById("inputAddress").value;
    user.type = document.getElementById("inputType").value;
    if (user.userName == "") {
    	document.getElementById("inputUname").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputUname").style.outline = "";
    if (user.password == "") {
    	document.getElementById("inputPw").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputPw").style.outline = "";
    if (user.fname == "") {
    	document.getElementById("inputFname").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputFname").style.outline = "";
    if (user.tp == "") {
    	document.getElementById("inputTp").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputTp").style.outline = "";
    	
    if (user.address == "") {
    	document.getElementById("inputAddress").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputAddress").style.outline = "";
    if (user.lname == "") {
    	document.getElementById("inputLname").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputLname").style.outline = "";
    if (user.type == "") {
    	document.getElementById("inputType").style.outline = "solid red 2px";
	    validate=false;
	  }
    else
    	document.getElementById("inputType").style.outline = "";
    	
    return validate;
}

function setViewData() {
    document.getElementById("fname").innerHTML = user.fname;
    document.getElementById("lname").innerHTML = user.lname;
    document.getElementById("address").innerHTML = user.address;
    document.getElementById("tp").innerHTML = user.tp;
    document.getElementById("uname").innerHTML = user.userName;
    var urlString = 'url(' + user.img + ')';
    document.getElementById("viewImg").style.backgroundImage = urlString;
}

function setEditViewData() {
    document.getElementById("fnameEdit").value = user.fname;
    document.getElementById("lnameEdit").value = user.lname;
    document.getElementById("addressEdit").value = user.address;
    document.getElementById("tpEdit").value = user.tp;
}

function setEditData() {
    user.fname = document.getElementById("fnameEdit").value;
    user.lname = document.getElementById("lnameEdit").value;
    user.tp = document.getElementById("tpEdit").value;
    user.address = document.getElementById("addressEdit").value;
}

function signOut() {
    sessionStorage.clear();
    window.location = "/FrontEnd/views/login.jsp";
}

$(document).on("click", "#sidebarCollapse", function() {
    $('#sidebar').toggleClass('active');
});
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