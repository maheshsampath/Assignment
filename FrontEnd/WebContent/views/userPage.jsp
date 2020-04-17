<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>

<head>
    <meta charset="ISO-8859-1">
    <title>User details</title>
    <link rel="stylesheet" href="views/bootstrap.min.css">
    <script src="Components/jquery-3.4.1.min.js"></script>
    <script src="Components/main.js"></script>
</head>

<body>


    <script type="text/javascript">
        if (sessionStorage.getItem("userType") == null || sessionStorage.getItem("userType") == "") {
            window.location.href = "login.jsp";
        }
    </script>


    <div class="container">
        <div class="row">
            <div class="col-8">
                <h1 class="m-3">user details</h1>
                <input type="button" id="btnSave" value="appointment" class="btn btn-primary">
                <input type="button" id="btnSave" value="doctor" class="btn btn-primary">
                <input type="button" id="btnSave" value="hospital" class="btn btn-primary">
                <input type="button" id="btnSave" value="payment" class="btn btn-primary">
                <input type="button" id="btnSave" value="user" class="btn btn-primary">

            </div>
        </div>
        <br>

        <div class="row">
            <div class="col-12" id="colStudents">

            </div>
        </div>
    </div>
</body>

</html>