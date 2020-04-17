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
    <title>Payments Management</title>
    <link rel="icon" type="image/png" href="/FrontEnd/images/icons/favicon.ico" />
    <link rel="stylesheet" href="/FrontEnd/css/material-icons.css">
    <link rel="stylesheet" href="/FrontEnd/css/font-awesome.min.css">
    <link rel="stylesheet" href="/FrontEnd/css/bootstrap.min.css">
    <link rel="stylesheet" href="/FrontEnd/css/customStyles.css">
    <script src="/FrontEnd/js/jquery.min.js"></script>
    <script src="/FrontEnd/js/bootstrap3.3.7.min.js"></script>
    <script src="/FrontEnd/Controllers/UserControllers/paymentController.js"></script>
    <script src="https://js.stripe.com/v3/"></script>

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
                <li class="active">
                    <a href="paymentControl.jsp"><span class="fa fa-credit-card mr-3"></span> Payments</a>
                </li>
                <li>
                    <a href="userControl.jsp"><span class="fa fa-user-circle-o mr-3"></span> Profile</a>
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
                            <h2>Manage <b>Payment details</b></h2>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover" id="listtable">
                    <thead>
                        <tr>
                            <th>Appointment Id</th>
                            <th>Date</th>
                            <th>Amount</th>
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
                            <h4 class="modal-title">Add Payment</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Appointment ID :</label>
                                <input type="text" class="form-control" id="inputappointment" required>
                            </div>
                            <div class="form-group">
                                <label>User Name :</label>
                                <select class="form-control" id="inputuname" required>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Date :</label>
                                <input type="date" class="form-control" id="inputdate" required>
                            </div>
                            <div class="form-group">
                                <label>Amount :</label>
                                <input type="text" class="form-control" id="inputamount" required>
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
                            <h4 class="modal-title">View Payment</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Appointment ID :</label>
                                <span id="appointment"></span>
                            </div>
                            <div class="form-group">
                                <label>User Name :</label>
                                <span id="uname"></span>
                            </div>
                            <div class="form-group">
                                <label>Date :</label>
                                <span id="date"></span>
                            </div>
                            <div class="form-group">
                                <label>Amount :</label>
                                <span id="amount"></span>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Close">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script src="/FrontEnd/Shared/navbarStyles/js/popper.js"></script>
</body>

</html>