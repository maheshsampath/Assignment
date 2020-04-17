var user = {
    userName: "",
    password: "",
    fname: "",
    lname: "",
    tp: "",
    address: "",
    type: ""
};
$(document).ready(function() {
    $("#alertSuccess").hide();
    $("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
    // Clear status msges-------------
    $("#alertSuccess").text("");
    $("#alertSuccess").hide();
    $("#alertError").text("");
    $("#alertError").hide();

    // Form validation----------------
    var status = validateItemForm();

    // If not valid-------------------
    if (status != true) {
        $("#alertError").text(status);
        $("#alertError").show();
        return;
    }

    // If valid----------------------
    var student = getStudentCard($("#txtName").val().trim(),
        $('input[name="rdoGender"]:checked').val(),
        $("#ddlYear").val());
    $("#colStudents").append(student);
    $("#alertSuccess").text("Saved successfully.");
    $("#alertSuccess").show();
    $("#formStudent")[0].reset();
});




// REMOVE==========================================
$(document).on("click", ".remove", function(event) {
    $(this).closest(".student").remove();
    $("#alertSuccess").text("Removed successfully.");
    $("#alertSuccess").show();
});

//CLIENT-MODEL=================================================================
function validateItemForm() {
    // NAME
    if ($("#txtName").val().trim() == "") {
        return "Insert student name.";
    }

    // GENDER
    if ($('input[name="rdoGender"]:checked').length === 0) {
        return "Select gender.";
    }

    // YEAR
    if ($("#ddlYear").val() == "0") {

        return "Select year.";
    }
    return true;
}

function getStudentCard(name, gender, year) {

    var title = (gender == "Male") ? "Mr." : "Ms.";
    var yearNumber = "";

    switch (year) {
        case "1":
            yearNumber = "1st";
            break;
        case "2":
            yearNumber = "2nd";
            break;
        case "3":
            yearNumber = "3rd";
            break;
        case "4":
            yearNumber = "4th";
            break;
    }

    var student = "";

    student += "<div class=\"student card bg-light m-2\" style=\"max-width: 10rem; float: left;\">";
    student += "<div class=\"card-body\">";
    student += title + " " + name + ",";
    student += "<br>";
    student += yearNumber + " year";
    student += "</div>";
    student += "<input type=\"button\" value=\"Remove\" class=\"btn btn-danger remove\">";
    student += "</div>";
    return student;
}


//Login----------------
var input = $('.validate-input .input100');

$('.validate-form').on('submit', function() {
    var check = true;

    for (var i = 0; i < input.length; i++) {
        if (validate(input[i]) == false) {
            showValidate(input[i]);
            check = false;
        }
    }

    var $username = input[0].value;
    var $pw = input[1].value;


    var $url = "http://localhost:8080/demorest/webapi/login/" + $username;
    $.ajax({
        url: $url,
        headers: {
            "Authorization": "Basic " + btoa($username + ":" + $pw)
        },
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        success: function(data) {
            console.log(data)
            if (data.type == "user") {
                sessionStorage.setItem("username", data.userName);
                sessionStorage.setItem("pw", data.password);
                sessionStorage.setItem("userType", data.type);
                sessionStorage.setItem("id", data.id);
                window.location = "/FrontEnd/views/UserPages/appointmentControl.jsp";
            } else if (data.type == "admin") {
                sessionStorage.setItem("username", data.userName);
                sessionStorage.setItem("pw", data.password);
                sessionStorage.setItem("userType", data.type);
                window.location = "/FrontEnd/views/AdminPages/appointmentControl.jsp";
            } else {
                alert("login failed");
            }


        },
        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Invalid User Name Password';
            } else if (jqXHR.status == 404) {
                msg = 'No Access';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Invalid User Name Password.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
        },
    });
    return false;

});


$('.validate-form .input100').each(function() {
    $(this).focus(function() {
        hideValidate(this);
    });
});

function validate(input) {
    if ($(input).attr('type') == 'text') {
        if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)$/) == null) {
            return false;
        }
    } else {
        if ($(input).val().trim() == '') {
            return false;
        }
    }
}

function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}

function setCreateData() {
	var validate=true;
    user.userName = document.getElementById("inputUname").value;
    user.password = document.getElementById("inputPw").value;
    user.fname = document.getElementById("inputFname").value;
    user.lname = document.getElementById("inputLname").value;
    user.tp = document.getElementById("inputTp").value;
    user.address = document.getElementById("inputAddress").value;
    user.type = "user";
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
    	
    return validate;
}

$(document).on("click", "#formCreateBtn", function(event) {
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
                $('#confirmModel').modal();
            } else {
                $('#failModel').modal();
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
            alert(msg);
        }
    })
    }
});