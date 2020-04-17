<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/FrontEnd/Shared/navbarStyles/css/style.css">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Users Management</title>
    <link rel="icon" type="image/png" href="/FrontEnd/images/icons/favicon.ico" />
    <link rel="stylesheet" href="/FrontEnd/css/material-icons.css">
    <link rel="stylesheet" href="/FrontEnd/css/font-awesome.min.css">
    <link rel="stylesheet" href="/FrontEnd/css/bootstrap.min.css">
    <link rel="stylesheet" href="/FrontEnd/css/customStyles.css">
    <script src="/FrontEnd/js/jquery.min.js"></script>
    <script src="/FrontEnd/js/bootstrap3.3.7.min.js"></script>
    <script src="/FrontEnd/Controllers/UserControllers/userController.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            // Activate tooltip
            $('[data-toggle="tooltip"]').tooltip();

        });
        if (sessionStorage.getItem("userType") == null || sessionStorage.getItem("userType") == "" || sessionStorage.getItem("userType") == "admin") {
            window.location.href = "/FrontEnd/views/login.jsp";
        }
    </script>
</head>

<body>
    <div class="wrapper d-flex align-items-stretch">
        <nav id="sidebar">
            <div class="custom-menu">
                <button type="button" id="sidebarCollapse" class="btn btn-primary">
                </button>
            </div>
            <div class="img bg-wrap text-center py-4" style="background-image: url(/FrontEnd/Shared/navbarStyles/images/bg_1.jpg);">
                <div class="user-logo">
                    <div class="img" style="background-image: url(/FrontEnd/Shared/navbarStyles/images/logo.jpg);"></div>
                    <h3>Hospital Management</h3>
                </div>
            </div>
            <ul class="list-unstyled components mb-5">
                <li>
                    <a href="appointmentControl.jsp"><span class="fa fa-file-text-o mr-3"></span> Appointments</a>
                </li>
                <li>
                    <a href="doctorControl.jsp"><span class="fa fa-user-md mr-3"></span> Doctors</a>
                </li>
                <li>
                    <a href="hospitalControl.jsp"><span class="fa fa-hospital-o mr-3"></span> Hospitals</a>
                </li>
                <li>
                    <a href="paymentControl.jsp"><span class="fa fa-credit-card mr-3"></span> Payments</a>
                </li>
                <li class="active">
                    <a href="userControl.jsp"><span class="fa fa-user-circle-o mr-3"></span> Profile</a>
                </li>
                <li>
                    <a href=# onclick='signOut()'><span class="fa fa-sign-out mr-3"></span> Sign Out</a>
                </li>
            </ul>

        </nav>

        <!-- Page Content  -->
        <div class="container" style="padding-right: 0px;padding-left: 0px;">
            <div class="table-wrapper" style="background: #f5f5f5;    box-shadow: 0 0px 0px">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Manage <b>User Account</b></h2>
                        </div>
                        <div class="col-sm-6">
                            <a href="#editModal" onclick='editButtonClick()' class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE254;</i> <span>Edit</span></a>
                        </div>
                    </div>
                </div>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body">
                            <div class="modal-img" id="viewImg"></div>
                            <div class="form-group">
                                <label>First Name :</label>
                                <span id="fname"></span>
                            </div>
                            <div class="form-group">
                                <label>Last Name :</label>
                                <span id="lname"></span>
                            </div>
                            <div class="form-group">
                                <label>Address :</label>
                                <span id="address"></span>
                            </div>
                            <div class="form-group">
                                <label>Phone :</label>
                                <span id="tp"></span>
                            </div>
                            <div class="form-group">
                                <label>User Name :</label>
                                <span id="uname"></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Edit Modal HTML -->
        <div id="editModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title">Edit User</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>First Name</label>
                                <input type="text" class="form-control" id="fnameEdit" required>
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input type="text" class="form-control" id="lnameEdit" required>
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <textarea class="form-control" id="addressEdit" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Phone</label>
                                <input type="text" class="form-control" id="tpEdit" required>
                            </div>
                            <div class="form-group">
                                <label>PassWord</label>
                                <input type="password" class="form-control" id="pwEdit" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                            <input type="button" class="btn btn-info" id="formEditBtn" value="Update">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    <!-- Alert Modal HTML -->
        <div id="AlertModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title" id="alertTitle"></h4>
                        </div>
                        <div class="modal-body">
                            <p id="AlertMsg"></p>
                        </div>
                        <div class="modal-footer">
                            <input type="button" id="CloseBtn" class="btn btn-default" data-dismiss="modal" value="close">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="/FrontEnd/Shared/navbarStyles/js/popper.js"></script>
</body>

</html>