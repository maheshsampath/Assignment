package com.telusko.demorest.Filters;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.StringTokenizer;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import org.apache.commons.codec.binary.Base64;

import com.telusko.demorest.model.UserModel;
import com.telusko.demorest.services.UserRepository;

@Provider
public class loginFilter implements ContainerRequestFilter{
	
	UserRepository repo=new UserRepository();
	private static final String AUTHORIZATION_HEADER_KEY="Authorization";
	private static final String AUTHORIZATION_HEADER_PREFIX="Basic";
	private static final String SECURED_URL_PREFIX="login";
	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		if(requestContext.getUriInfo().getPath().contains(SECURED_URL_PREFIX)) {
			List<String> AuthHeader=requestContext.getHeaders().get(AUTHORIZATION_HEADER_KEY);
			if(AuthHeader!=null && AuthHeader.size()>0) {
				String authToken=AuthHeader.get(0);
				authToken=authToken.replace(AUTHORIZATION_HEADER_PREFIX, "");
				byte[] valueDecoded = Base64.decodeBase64(authToken);
				String decodedString=new String(valueDecoded);
				StringTokenizer tokenizer=new StringTokenizer(decodedString,":");
				String userName=tokenizer.nextToken();
				String password=tokenizer.nextToken();
				UserModel user;
				try {
					user = repo.getLogin(userName, password);
					if(user.getId()!=0) {
						return;
					}
					else {
					Response unAuthorizeResponse=Response
							.status(200)
							.entity("No Access !")
							.build();
					
					requestContext.abortWith(unAuthorizeResponse);
					}
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			
			}
		
			else {
				return;
			}
		}
		
	}

}
