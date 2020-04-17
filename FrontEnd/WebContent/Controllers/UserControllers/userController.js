var $username = "";
var $pw = "";
var $id = "";
var user = {
    userName: "",
    password: "",
    fname: "",
    lname: "",
    tp: "",
    address: "",
    type: ""
};

var userSelect;
var $rootUrl = "http://localhost:8080/demorest/webapi/userlogin/users/";
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
            user = data;
            setViewData();
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
            alertModifier('update', msg);
            $('#AlertModal').modal('show');
        },
    });

});

function editButtonClick() {
    setEditViewData();

}

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
        success: function(data) {
            if (data == undefined) {
                msg = 'User Name Exist';
                alert(msg);
            } else {
                sessionStorage.setItem("username", data.userName);
                sessionStorage.setItem("pw", data.password);
                alertModifier('update', 'success');
                $('#AlertModal').modal('show');
            }
        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'User Name Exist';
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
        }
    });


});

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
    document.getElementById("pwEdit").value = user.password;

}

function setEditData() {
    user.fname = document.getElementById("fnameEdit").value;
    user.lname = document.getElementById("lnameEdit").value;
    user.tp = document.getElementById("tpEdit").value;
    user.address = document.getElementById("addressEdit").value;
    user.password = document.getElementById("pwEdit").value;
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