package com.telusko.demorest.services;

import java.util.ArrayList;
import java.sql.*;
import java.util.List;
import com.telusko.demorest.model.UserModel;

public class UserRepository {
	
	List<UserModel> users;
	Connection conn=null;
	
	public UserRepository() {
		
		String url="jdbc:mysql://localhost:3306/restDb";
		String usrName="root";
		String pw="root1234";
	
		
			try {
				Class.forName("com.mysql.jdbc.Driver");
				conn=DriverManager.getConnection(url,usrName,pw);
			} catch (ClassNotFoundException | SQLException e) {
				System.out.println(e);
			}
	}
	
	public List<UserModel> getUsers() throws SQLException {
		
		List<UserModel> users=new ArrayList<>();
		String query="select * from users";
			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			while (rs.next()) {
				UserModel a=new UserModel();
				a.setId(rs.getInt(1));
				a.setUserName(rs.getString(2));
				a.setPassword(rs.getString(3));
				a.setImg(rs.getString(4));
				a.setFname(rs.getString(5));
				a.setLname(rs.getString(6));
				a.setTp(rs.getString(7));
				a.setAddress(rs.getString(8));
				a.setType(rs.getString(9));
				users.add(a);
			}
			
		

		return users;
	}
	
	public UserModel getUser(int id) throws SQLException {
	
		UserModel user=new UserModel();
		String query="select * from users where id="+id;

			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			if (rs.next()) {
				
				user.setId(rs.getInt(1));
				user.setUserName(rs.getString(2));
				user.setPassword(rs.getString(3));
				user.setImg(rs.getString(4));
				user.setFname(rs.getString(5));
				user.setLname(rs.getString(6));
				user.setTp(rs.getString(7));
				user.setAddress(rs.getString(8));
				user.setType(rs.getString(9));
				
			}
			

		return user;
		
	}
	
	public String getUserType(String usrName) throws SQLException {
		
		String usertype="";
		String query="select type from users where userName=?";
			
			PreparedStatement st=conn.prepareStatement(query);
			st.setString(1, usrName);
			ResultSet rs=st.executeQuery();
			if (rs.next()) {
				usertype=rs.getString(1);
				
			}
		
	
		return usertype;
		
	}
	
public UserModel getLogin(String usrName,String pw) throws SQLException {
		
		UserModel user=new UserModel();
		String query="select * from users where userName=? and password=? " ;

			PreparedStatement st=conn.prepareStatement(query);
			st.setString(1, usrName);
			st.setString(2, pw);
			ResultSet rs=st.executeQuery();
			
			if (rs.next()) {
				user.setId(rs.getInt(1));
				user.setUserName(rs.getString(2));
				user.setPassword(rs.getString(3));
				user.setFname(rs.getString(4));
				user.setLname(rs.getString(5));
				user.setTp(rs.getString(6));
				user.setAddress(rs.getString(7));
				user.setType(rs.getString(8));
				
			}

		return user;
		
	}
	
	public UserModel getUserLogin(String usrName,String pw) throws SQLException {
		
		UserModel user=new UserModel();
		String query="select * from users where userName=? and password=? and type ='user'" ;

			
			PreparedStatement st=conn.prepareStatement(query);
			st.setString(1, usrName);
			st.setString(2, pw);
			ResultSet rs=st.executeQuery();
			
			if (rs.next()) {
				user.setId(rs.getInt(1));
				user.setUserName(rs.getString(2));
				user.setPassword(rs.getString(3));
				user.setFname(rs.getString(4));
				user.setLname(rs.getString(5));
				user.setTp(rs.getString(6));
				user.setAddress(rs.getString(7));
				user.setType(rs.getString(8));
				
			}
		
	
		return user;
		
	}
	
	public UserModel getAdminLogin(String usrName,String pw) throws SQLException {
		
		UserModel user=new UserModel();
		String query="select * from users where userName=? and password=? and type ='admin'" ;

			PreparedStatement st=conn.prepareStatement(query);
			st.setString(1, usrName);
			st.setString(2, pw);
			ResultSet rs=st.executeQuery();
			
			if (rs.next()) {
				user.setId(rs.getInt(1));
				user.setUserName(rs.getString(2));
				user.setPassword(rs.getString(3));
				user.setFname(rs.getString(4));
				user.setLname(rs.getString(5));
				user.setTp(rs.getString(6));
				user.setAddress(rs.getString(7));
				user.setType(rs.getString(8));
				
			}
		
	
		return user;
		
	}

	public UserModel getUser(String usrName) throws SQLException {
		
		UserModel user=new UserModel();
		String query="select * from users where userName=?" ;

			
			PreparedStatement st=conn.prepareStatement(query);
			st.setString(1, usrName);
			ResultSet rs=st.executeQuery();
			
			if (rs.next()) {
				user.setId(rs.getInt(1));
				user.setUserName(rs.getString(2));
				user.setPassword(rs.getString(3));
				user.setImg(rs.getString(4));
				user.setFname(rs.getString(5));
				user.setLname(rs.getString(6));
				user.setTp(rs.getString(7));
				user.setAddress(rs.getString(8));
				user.setType(rs.getString(9));
			}
		

		return user;
		
	}
	
	public void createUser(UserModel a) throws SQLException {
		
		String query="insert into users (userName,password,img,fname,lname,tp,address,type) values(?,?,?,?,?,?,?,?)";
			
			PreparedStatement st=conn.prepareStatement(query);
			st.setString(1, a.getUserName());
			st.setString(2, a.getPassword());
			st.setString(3, a.getImg());
			st.setString(4, a.getFname());
			st.setString(5, a.getLname());
			st.setString(6, a.getTp());
			st.setString(7, a.getAddress());
			st.setString(8, a.getType());
			st.executeUpdate();

		
	}
	
	public void updateUser(UserModel a) throws SQLException {
			
			String query="update users set userName=? ,password=?,img=?,fname=?,lname=?,tp=?,address=?,type=? where id=?";
				
				PreparedStatement st=conn.prepareStatement(query);

				st.setString(1, a.getUserName());
				st.setString(2, a.getPassword());
				st.setString(3, a.getImg());
				st.setString(4, a.getFname());
				st.setString(5, a.getLname());
				st.setString(6, a.getTp());
				st.setString(7, a.getAddress());
				st.setString(8, a.getType());
				st.setInt(9, a.getId());
				st.executeUpdate();

			
	}

	public void deleteUser(int id) throws SQLException {
		
		String query="delete from users where id=?";
			
			PreparedStatement st=conn.prepareStatement(query);

			st.setInt(1, id);
			st.executeUpdate();

	}
	

}
