<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/FrontEnd/Shared/navbarStyles/css/style.css">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Create User</title>
    <link rel="stylesheet" href="/FrontEnd/css/material-icons.css">
    <link rel="stylesheet" href="/FrontEnd/css/font-awesome.min.css">
    <link rel="stylesheet" href="/FrontEnd/css/bootstrap.min.css">
    <link rel="stylesheet" href="/FrontEnd/css/customStyles.css">
    <script src="/FrontEnd/js/jquery.min.js"></script>
    <script src="/FrontEnd/js/bootstrap3.3.7.min.js"></script>
    <script src="/FrontEnd/Components/main.js"></script>
</head>

<body>

    <div class="modal-dialog">
        <div class="modal-content" style="border-radius:21px">
            <form id="createForm">
                <div class="modal-header" style="background: #435d7d;color: #fff;border-top-left-radius:20px;border-top-right-radius:20px">
                    <h2>Sign Up</h2>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" id="inputFname" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" id="inputLname" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Address</label>
                        <textarea class="form-control" id="inputAddress" required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="text" id="inputTp" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>User Name</label>
                        <input type="text" id="inputUname" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="inputPw" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <input type="file" name="file" size="45" id='myfile' class="form-control" />
                    </div>
                </div>
                <div class="modal-footer">
                    <a href='/FrontEnd/views/login.jsp' class="btn btn-default" data-toggle='modal'>
                        < Back to login</a>
                            <input type="button" class="btn btn-success" id="formCreateBtn" value="Save">
                </div>
            </form>
        </div>
    </div>

    <div id="confirmModel" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <form>
                    <div class="modal-header">
                        <h4 class="modal-title">Successfully</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>User creation succeeded</p>
                    </div>
                    <div class="modal-footer">
                        <a href="/FrontEnd/views/createUser.jsp" type="button" class="btn btn-default">Create another user</a>
                        <a href="/FrontEnd/views/login.jsp" class="btn btn-primary">Login</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div id="failModel" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <form>
                    <div class="modal-header">
                        <h4 class="modal-title">Failed</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p class="text-danger">User Name Exist.</p>
                    </div>
                    <div class="modal-footer">
                        <a href="#" type="button" class="btn btn-default" data-dismiss="modal">Try Again</a>
                        <a href="/FrontEnd/views/login.jsp" class="btn btn-primary">Back to Login</a>
                    </div>
                </form>
            </div>
        </div>
    </div>

</body>

</html>