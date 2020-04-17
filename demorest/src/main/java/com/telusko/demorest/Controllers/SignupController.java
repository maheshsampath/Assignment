package com.telusko.demorest.Controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.SQLException;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import com.telusko.demorest.model.UserModel;
import com.telusko.demorest.services.AppointmentDetailsRepository;
import com.telusko.demorest.services.UserRepository;
import org.json.JSONObject;


@Path("signup")
public class SignupController {
	UserRepository userRepo=new UserRepository();
	AppointmentDetailsRepository apprepo=new AppointmentDetailsRepository();
	

	@POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
    public UserModel CreateUser(@FormDataParam("obj") String obj,
        @FormDataParam("file") InputStream uploadedInputStream,
        @FormDataParam("file") FormDataContentDisposition fileDetail) throws SQLException {
		 UserModel user=new UserModel();
		 JSONObject obj1 = new JSONObject(obj);
		 user.setUserName(obj1.getString("userName"));
	     
	     if(userRepo.getUser(user.getUserName()).getId()==0) {
	    	 user.setUserName(obj1.getString("userName"));
	    	 user.setPassword(obj1.getString("password"));
		     user.setFname(obj1.getString("fname"));
		     user.setLname(obj1.getString("lname"));
		     user.setAddress(obj1.getString("address"));
		     user.setTp(obj1.getString("tp"));
		     user.setType(obj1.getString("type"));
		     user.setImg("/FrontEnd/userImages/" + fileDetail.getFileName());
		     
		     String uploadedFileLocation = "/Users/nayanalakshitha/eclipse-workspace/frontend/webcontent/userImages/" + fileDetail.getFileName();
	       
	         writeToFile(uploadedInputStream, uploadedFileLocation);
	         
	         userRepo.createUser(user);
				return user;

	     }
	     else {
				return null;
			}

    }

    private void writeToFile(InputStream uploadedInputStream,
            String uploadedFileLocation) {

            try {
                OutputStream out = new FileOutputStream(new File(
                        uploadedFileLocation));
                int read = 0;
                byte[] bytes = new byte[1024];

                out = new FileOutputStream(new File(uploadedFileLocation));
                while ((read = uploadedInputStream.read(bytes)) != -1) {
                    out.write(bytes, 0, read);
                }
                out.flush();
                out.close();
            } catch (IOException e) {

                e.printStackTrace();
            }

        }


}
