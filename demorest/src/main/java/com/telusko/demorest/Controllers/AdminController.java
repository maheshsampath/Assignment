package com.telusko.demorest.Controllers;

import java.sql.SQLException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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

@Path("adminlogin")
public class AdminController {
	AppointmentDetailsRepository appointmentRepo=new AppointmentDetailsRepository();
	DoctorRepository docRepo=new DoctorRepository();
	HospitalRepository hosptlRepo=new HospitalRepository();
	paymentDetailsRepository paymntRepo=new paymentDetailsRepository();
	UserRepository userRepo=new UserRepository();
	
	//Appointment Controllers-------------------------------------------------------------------------------------------------------------
	
	@Path("appointment")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<AppointmentDetailsModule> getAppointments() throws SQLException {
		return appointmentRepo.getAppointments();
	}

	@Path("appointment")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public AppointmentDetailsModule CreateAppointment(AppointmentDetailsModule a) throws SQLException {
		appointmentRepo.createAppointment(a);
		return a;
	}
	
	@Path("appointment")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public AppointmentDetailsModule UpdateAppointment(AppointmentDetailsModule a) throws SQLException {
	
			appointmentRepo.updateAppointment(a);
		
		return a;
	}
	
	@Path("appointment/{id}")
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public AppointmentDetailsModule deleteAppointment(@PathParam("id") int id) throws SQLException {
		AppointmentDetailsModule a=appointmentRepo.getAppointment(id);
		if(a.getId()!=0) {
			appointmentRepo.deleteAppointment(id);
		}
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
	
	@Path("doctor")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public DoctorModel CreateDoctor(DoctorModel a) throws SQLException {
		docRepo.createDoctor(a);
		return a;
	}
	
	@Path("doctor")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public DoctorModel UpdateDoctor(DoctorModel a) throws SQLException {
		
		if(docRepo.getDoctor(a.getId()).getId()==0) {
			docRepo.createDoctor(a);
		
		}
		else
		{
			docRepo.updateDoctor(a);
		}
		return a;
	}
	
	@Path("doctor/{id}")
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public DoctorModel deleteDoctor(@PathParam("id") int id) throws SQLException {
		DoctorModel a=docRepo.getDoctor(id);
		if(a.getId()!=0) {
			docRepo.deleteDoctor(id);
		}
		return a;
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
	
	@Path("hospital")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public HospitalModel CreateHospital(HospitalModel a) throws SQLException {
		hosptlRepo.createHospital(a);
		return a;
	}
	
	@Path("hospital")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public HospitalModel UpdateHospital(HospitalModel a) throws SQLException {
		
		if(hosptlRepo.getHospital(a.getId()).getId()==0) {
			hosptlRepo.createHospital(a);
		
		}
		else
		{
			hosptlRepo.updateHospital(a);
		}
		return a;
	}
	
	@Path("hospital/{id}")
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public HospitalModel deleteHospital(@PathParam("id") int id) throws SQLException {
		HospitalModel a=hosptlRepo.getHospital(id);
		if(a.getId()!=0) {
			hosptlRepo.deleteHospital(id);
		}
		return a;
	}
	
	
	//Payment Controllers----------------------------------------------------------------------------------------------------------------
	
	@Path("payment")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<PaymentDetailsModel> getPayments() throws SQLException {
		return paymntRepo.getPayments();
	}

	@Path("payment/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public PaymentDetailsModel getPayment(@PathParam("id") int id) throws SQLException {
		return paymntRepo.getPayment(id);
	}
	
	@Path("payment")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public PaymentDetailsModel CreatePayment(PaymentDetailsModel a) throws SQLException {
		paymntRepo.createPayment(a);
		return a;
	}
	
	
	//User Controllers-------------------------------------------------------------------------------------------------------------------
	
	@Path("users")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<UserModel> getUsers() throws SQLException {
		return userRepo.getUsers();
	}

	@Path("users/{id}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public UserModel getUser(@PathParam("id") int id) throws SQLException {
		return userRepo.getUser(id);
	}
	
	@Path("users")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public UserModel CreateUser(UserModel a) throws SQLException {
		if(userRepo.getUser(a.getUserName()).getId()==0) {
			userRepo.createUser(a);
			return a;
			}
		else {
			return null;
		}
		
	}
	
	@Path("users")
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
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
	
	@Path("users/{id}")
	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	public UserModel deleteUser(@PathParam("id") int id) throws SQLException {
		UserModel a=userRepo.getUser(id);
		if(a.getId()!=0) {
			userRepo.deleteUser(id);
		}
		return a;
	}
	
	
	

}
