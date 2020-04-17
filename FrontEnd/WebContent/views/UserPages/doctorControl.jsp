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
    <script src="/FrontEnd/Controllers/UserControllers/doctorController.js"></script>
        <script src="https://www.paypal.com/sdk/js?client-id=AQx4zvzIj7DBk55SgQF0_JMY4ncrKIIszJ6zBlxkKyHQQ9Go3zisKtJIxfbe9NEXQsWp0n83rAGYTo9X&disable-funding=credit,card">
        // Required. Replace SB_CLIENT_ID with your sandbox client ID.
    </script>
    <style>
        /* Media query for mobile viewport */
        @media screen and (max-width: 400px) {
            #paypal-button-container {
                width: 100%;
            }
        }

        /* Media query for desktop viewport */
        @media screen and (min-width: 400px) {
            #paypal-button-container {
                width: 250px;
            }
        }
    </style>
    
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
                            <h2>Manage <b>Doctor details</b></h2>
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
                             <a href="addAppointmentModal" onclick='addAppontmentClick()' class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add Appointment</span></a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       <!-- Add Appointmnt Modal HTML -->
        <div id="addAppointmentModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title">Add Appointment</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Hospital Name :</label>
                                 <span id="inputhospitalId"></span>
                            </div>
                            <div class="form-group">
                                <label>Doctor Name :</label>
                                <span id="inputdoctorId"></span>
                            </div>
                            <div class="form-group" style="text-align: center;">
                                <label>Appointments On Doctor</label>
                                <table class="table table-striped table-hover" id="appointmntDatetable">
                                    <thead>
                                        <tr>
                                            <th>Appointment Id</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="form-group">
                                <label>Date :</label>
                                <input type="date" class="form-control" id="inputdate">
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
                            <input type="button" id="CloseBtn1" class="btn btn-default" data-dismiss="modal" value="close">
                        </div>
                    </form>
                </div>
            </div>
        </div>
         <!-- Alertpayment Modal HTML -->
        <div id="AlertPymentModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <form>
                        <div class="modal-header">
                            <h4 class="modal-title" id="alertTitle2"></h4>
                        </div>
                        <div class="modal-body">
                            <p id="AlertMsg2"></p>
                        </div>
                        <div class="modal-footer">
                            <input type="button" id="CloseBtn2" class="btn btn-default" data-dismiss="modal" value="close">
                            <div id="paypal-button-container"></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
        <script>
        paypal.Buttons({
            enableStandardCardFields: true,
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: 99.00
                        }
                    }],
                    application_context: {
                        shipping_preference: 'NO_SHIPPING'
                    }
                });
            },
            onApprove: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                    // This function shows a transaction success message to your buyer.
                    processPayment(details.id)
                });
            },
            onAuthorize: function(data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function(details) {
                    // This function shows a transaction success message to your buyer.
                    processPayment(details.id)
                });
            }
        }).render('#paypal-button-container');
        // This function displays Smart Payment Buttons on your web page.
    </script>
    <script src="/FrontEnd/Shared/navbarStyles/js/popper.js"></script>
</body>

</html>