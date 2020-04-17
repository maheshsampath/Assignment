package com.telusko.demorest.Controllers;

import java.sql.SQLException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import javax.ws.rs.core.MediaType;

import com.telusko.demorest.model.UserModel;
import com.telusko.demorest.services.UserRepository;

@Path("login")
public class LoginController {

	UserRepository repo=new UserRepository();
	
	@Path("{usrName}")
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public UserModel getUser(@PathParam("usrName") String usrName) throws SQLException {
		return repo.getUser(usrName);
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public UserModel CreateUser(UserModel a) throws SQLException {
		if(repo.getUser(a.getUserName()).getId()==0) {
			repo.createUser(a);
			return a;
			}
		else {
			return null;
		}
		
	}


}
