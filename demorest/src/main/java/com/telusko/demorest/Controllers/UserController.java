package com.telusko.demorest.Controllers;
import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import com.telusko.demorest.model.AppointmentDetailsModule;
import com.telusko.demorest.model.DoctorModel;
import com.telusko.demorest.model.HospitalModel;
import com.telusko.demorest.model.PaymentDetailsModel;
import com.telusko.demorest.model.UserModel;
import com.telusko.demorest.services.AppointmentDetailsRepository;
import com.telusko.demorest.services.DoctorRepository;
import com.telusko.demorest.services.HospitalRepository;
import com.telusko.demorest.services.UserRepository;
import com.telusko.demorest.services.paymentDetailsRepository;

@Path("userlogin")
public class UserController {
	AppointmentDetailsRepository appointmentRepo=new AppointmentDetailsRepository();
	DoctorRepository docRepo=new DoctorRepository();
	HospitalRepository hosptlRepo=new HospitalRepository();
	paymentDetailsRepository paymntRepo=new paymentDetailsRepository();
	UserRepository userRepo=new UserRepository();
	
	//User Controllers-------------------------------------------------------------------------------------------------------------------
	
	@Path("users/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public UserModel getUser(@PathParam("id") int id) throws SQLException {
		return userRepo.getUser(id);
	}
	
	@Path("users")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public UserModel UpdateUser(UserModel a) throws SQLException {
		
		if(userRepo.getUser(a.getId()).getId()==0) {
			userRepo.createUser(a);
		}
		else
		{
			userRepo.updateUser(a);
						
		}
		return a;
	}
	
	//Appointment Controllers-------------------------------------------------------------------------------------------------------------
	
	@Path("appointment")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<AppointmentDetailsModule> getAppointments() throws SQLException {
		return appointmentRepo.getAppointments();
	}

	@Path("appointment/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<AppointmentDetailsModule> getAppointmentsByUser(@PathParam("id") int id) throws SQLException {
		return appointmentRepo.getAppointmentsByUser(id);
	}
	@Path("appointmentByDoc/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<AppointmentDetailsModule> getAppointmentsByDoc(@PathParam("id") int id) throws SQLException {
		return appointmentRepo.getAppointmentsByDoc(id);
	}
	
	@Path("appointment")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public AppointmentDetailsModule CreateAppointment(AppointmentDetailsModule a) throws SQLException {		
		return appointmentRepo.createAppointment(a);
	}
	@Path("appointment")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public AppointmentDetailsModule UpdateAppointment(AppointmentDetailsModule a) throws SQLException {
	
			appointmentRepo.updateAppointment(a);
		
		return a;
	}
	
	//Doctor Controllers------------------------------------------------------------------------------------------------------------------
	
	@Path("doctor")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<DoctorModel> getDoctors() throws SQLException {
		return docRepo.getDoctors();
	}

	@Path("doctor/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public DoctorModel getDoctor(@PathParam("id") int id) throws SQLException {
		return docRepo.getDoctor(id);
	}
	
	@Path("doctorByHsptl/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<DoctorModel> getDoctorsByHosptl(@PathParam("id") int id) throws SQLException {
		return docRepo.getDoctorByHospital(id);
	}
	
	//Hospital Controllers---------------------------------------------------------------------------------------------------------------
	
	@Path("hospital")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<HospitalModel> getHospitas() throws SQLException {
		return hosptlRepo.getHospitals();
	}

	@Path("hospital/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public HospitalModel getHospital(@PathParam("id") int id) throws SQLException {
		return hosptlRepo.getHospital(id);
	}
	
	
	//Payment Controllers----------------------------------------------------------------------------------------------------------------
	

	@Path("payment")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public PaymentDetailsModel CreatePayment(PaymentDetailsModel a) throws SQLException {
		paymntRepo.createPayment(a);
		return a;
	}
	@Path("payment/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<PaymentDetailsModel> getpaymntbyUser(@PathParam("id") int id) throws SQLException {
		return paymntRepo.getPaymentsByUser(id);
	}

}
