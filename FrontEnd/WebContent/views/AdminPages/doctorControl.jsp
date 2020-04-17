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
    <title>Doctors Management</title>
    <link rel="icon" type="image/png" href="/FrontEnd/images/icons/favicon.ico" />
    <link rel="stylesheet" href="/FrontEnd/css/material-icons.css">
    <link rel="stylesheet" href="/FrontEnd/css/font-awesome.min.css">
    <link rel="stylesheet" href="/FrontEnd/css/bootstrap.min.css">
    <link rel="stylesheet" href="/FrontEnd/css/customStyles.css">
    <script src="/FrontEnd/js/jquery.min.js"></script>
    <script src="/FrontEnd/js/bootstrap3.3.7.min.js"></script>
    <script src="/FrontEnd/Controllers/AdminControllers/doctorController.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            // Activate tooltip
            $('[data-toggle="tooltip"]').tooltip();

        });
        if (sessionStorage.getItem("userType") == null || sessionStorage.getItem("userType") == "" || sessionStorage.getItem("userType") == "user") {
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
                <li class="active">
                    <a href="doctorControl.jsp"><span class="fa fa-user-md mr-3"></span> Doctors</a>
                </li>
                <li>
                    <a href="hospitalControl.jsp"><span class="fa fa-hospital-o mr-3"></span> Hospitals</a>
                </li>
                <li>
                    <a href="paymentControl.jsp"><span class="fa fa-credit-card mr-3"></span> Payments</a>
                </li>
                <li>
                    <a href="userControl.jsp"><span class="fa fa-users mr-3"></span> Users</a>
                </li>
                <li>
                    <a href=# onclick='signOut()'><span class="fa fa-sign-out mr-3"></span> Sign Out</a>
                </li>
            </ul>

        </nav>

        <!-- Page Content  -->
        <div class="container" style="padding-right: 0px;padding-left: 0px;">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Manage <b>Doctor details</b></h2>
                        </div>
                        <div class="col-sm-6">
                            <a href="#addModal" onclick='addButtonClick()' class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add Doctor</span></a>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <input type="text" id="inputSearch" class="form-control" placeholder="First Name / Last Name">
                    <input type="button" class="btn btn-default" id="searchBtn" value="Search">
                    <input type="button" class="btn btn-warning" id="ResetBtn" value="Reset">
                </div>
                <table class="table table-striped table-hover" id="listtable">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Specialization</th>
                            <th>Hospital</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>

            </div>
        </div>
        <!-- Add Modal HTML -->
        <div id="addModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title">Add Doctor</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>First Name :</label>
                                <input type="text" class="form-control" id="inputfname" required>
                            </div>
                            <div class="form-group">
                                <label>Last Name :</label>
                                <input type="text" class="form-control" id="inputlname" required>
                            </div>
                            <div class="form-group">
                                <label>hospital :</label>
                                <select class="form-control" id="inputhospital" required>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Phone :</label>
                                <input type="text" class="form-control" id="inputtp" required>
                            </div>
                            <div class="form-group">
                                <label>Address :</label>
                                <textarea class="form-control" id="inputaddrss" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Specialization :</label>
                                <input type="text" class="form-control" id="inputspec" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                            <input type="button" class="btn btn-success" id="formCreateBtn" value="Save">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- View Modal HTML -->
        <div id="viewModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title">View Doctor</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>First Name :</label>
                                <span id="fname"></span>
                            </div>
                            <div class="form-group">
                                <label>Last Name :</label>
                                <span id="lname"></span>
                            </div>
                            <div class="form-group">
                                <label>hospital :</label>
                                <span id="hospital"></span>
                            </div>
                            <div class="form-group">
                                <label>Phone :</label>
                                <span id="tp"></span>
                            </div>
                            <div class="form-group">
                                <label>Address :</label>
                                <span id="addrss"></span>
                            </div>
                            <div class="form-group">
                                <label>Specialization :</label>
                                <span id="spec"></span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Close">
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Edit Modal HTML -->
        <div id="editModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title">Edit Doctor</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>First Name :</label>
                                <input type="text" class="form-control" id="fnameEdit" required>
                            </div>
                            <div class="form-group">
                                <label>Last Name :</label>
                                <input type="text" class="form-control" id="lnameEdit" required>
                            </div>
                            <div class="form-group">
                                <label>hospital :</label>
                                <select class="form-control" id="hospitalEdit" required>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Phone :</label>
                                <input type="text" class="form-control" id="tpEdit" required>
                            </div>
                            <div class="form-group">
                                <label>Address :</label>
                                <textarea class="form-control" id="addrssEdit" required></textarea>
                            </div>
                            <div class="form-group">
                                <label>Specialization :</label>
                                <input type="text" class="form-control" id="specEdit" required>
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
        <!-- Delete Modal HTML -->
        <div id="deleteModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title">Delete Doctor</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p>Are you sure you want to delete these Records?</p>
                            <p class="text-warning"><small>This action cannot be undone.</small></p>
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                            <input type="button" class="btn btn-danger" id="formDeleteBtn" value="Delete">
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