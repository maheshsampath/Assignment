package com.telusko.demorest.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import com.telusko.demorest.model.AppointmentDetailsModule;

public class AppointmentDetailsRepository {
	
	List<AppointmentDetailsModule> appointments;
	Connection conn=null;
	
public AppointmentDetailsRepository() {
		
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
	
	public List<AppointmentDetailsModule> getAppointments() throws SQLException {
		
		List<AppointmentDetailsModule> appointments=new ArrayList<>();
		String query="select * from AppointmentDetails";
			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			while (rs.next()) {
				AppointmentDetailsModule a=new AppointmentDetailsModule();
				a.setId(rs.getInt(1));
				a.setDoctorId(rs.getInt(2));
				a.setUserId(rs.getInt(3));
				a.setHospitalId(rs.getInt(4));
				a.setPaid(rs.getString(5));
				a.setDate(rs.getDate(6));
				appointments.add(a);
			}

		return appointments;
	}
	
	public AppointmentDetailsModule getAppointment(int id) throws SQLException {
	
		AppointmentDetailsModule a=new AppointmentDetailsModule();
		String query="select * from AppointmentDetails where id="+id;

			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			if (rs.next()) {
				
				a.setId(rs.getInt(1));
				a.setDoctorId(rs.getInt(2));
				a.setUserId(rs.getInt(3));
				a.setHospitalId(rs.getInt(4));
				a.setPaid(rs.getString(5));
				a.setDate(rs.getDate(6));
				
			}
			

		return a;
		
	}
	public List<AppointmentDetailsModule> getAppointmentsByUser(int id) throws SQLException {
		
		List<AppointmentDetailsModule> appointments=new ArrayList<>();
		String query="select * from AppointmentDetails where userId="+id;
		
		Statement st=conn.createStatement();
		ResultSet rs=st.executeQuery(query);
		
		while (rs.next()) {
			AppointmentDetailsModule a=new AppointmentDetailsModule();
			a.setId(rs.getInt(1));
			a.setDoctorId(rs.getInt(2));
			a.setUserId(rs.getInt(3));
			a.setHospitalId(rs.getInt(4));
			a.setPaid(rs.getString(5));
			a.setDate(rs.getDate(6));
			appointments.add(a);
		}

	return appointments;
		
	}
	public List<AppointmentDetailsModule> getAppointmentsByDoc(int id) throws SQLException {
		
		List<AppointmentDetailsModule> appointments=new ArrayList<>();
		String query="select * from AppointmentDetails where doctorId="+id;
		
		Statement st=conn.createStatement();
		ResultSet rs=st.executeQuery(query);
		
		while (rs.next()) {
			AppointmentDetailsModule a=new AppointmentDetailsModule();
			a.setId(rs.getInt(1));
			a.setDoctorId(rs.getInt(2));
			a.setUserId(rs.getInt(3));
			a.setHospitalId(rs.getInt(4));
			a.setPaid(rs.getString(5));
			a.setDate(rs.getDate(6));
			appointments.add(a);
		}

	return appointments;
		
	}
	
public AppointmentDetailsModule createAppointment(AppointmentDetailsModule a) throws SQLException {
		
		String query="insert into AppointmentDetails (doctorId,userId,hospitalId,paid,date) values(?,?,?,?,?)";
			
			PreparedStatement st=conn.prepareStatement(query);
			st.setInt(1, a.getDoctorId());
			st.setInt(2, a.getUserId());
			st.setInt(3, a.getHospitalId());
			st.setString(4, a.getPaid());
			st.setDate(5, a.getDate());
			st.executeUpdate();
		
			AppointmentDetailsModule b=new AppointmentDetailsModule();
			String q="SELECT * FROM AppointmentDetails ORDER BY id DESC LIMIT 1;";
			Statement st2=conn.createStatement();
			ResultSet rs=st2.executeQuery(q);
		
			if (rs.next()) {
				
				b.setId(rs.getInt(1));
				b.setDoctorId(rs.getInt(2));
				b.setUserId(rs.getInt(3));
				b.setHospitalId(rs.getInt(4));
				b.setPaid(rs.getString(5));
				b.setDate(rs.getDate(6));
				
			}
			return b;
		
	}

public void updateAppointment(AppointmentDetailsModule a) throws SQLException {
	
	String query="update AppointmentDetails set doctorId=? ,userId=?,hospitalId=?,paid=?,date=? where id=?";
	 
		PreparedStatement st=conn.prepareStatement(query);

		st.setInt(1, a.getDoctorId());
		st.setInt(2, a.getUserId());
		st.setInt(3, a.getHospitalId());
		st.setString(4, a.getPaid());
		st.setDate(5, a.getDate());
		st.setInt(6, a.getId());
		st.executeUpdate();
	
}

public void deleteAppointment(int id) throws SQLException {

String query="delete from AppointmentDetails where id=?";
	
	PreparedStatement st=conn.prepareStatement(query);

	st.setInt(1, id);
	st.executeUpdate();
	

}



}
