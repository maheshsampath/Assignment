package com.telusko.demorest.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.telusko.demorest.model.DoctorModel;


public class DoctorRepository {

	List<DoctorModel> doctors;
	Connection conn=null;
	
	public DoctorRepository() {
		
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
	
	public List<DoctorModel> getDoctors() throws SQLException {
		
		List<DoctorModel> doctors=new ArrayList<>();
		String query="select * from Doctors";
			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			while (rs.next()) {
				DoctorModel a=new DoctorModel();
				a.setId(rs.getInt(1));
				a.setFname(rs.getString(2));
				a.setLname(rs.getString(3));
				a.setTp(rs.getString(4));
				a.setAddress(rs.getString(5));
				a.setSpecialization(rs.getString(6));
				a.setHospitalId(rs.getInt(7));
				doctors.add(a);
			}
			
		
			
	
		return doctors;
	}
	public List<DoctorModel> getDoctorByHospital(int id) throws SQLException {
			
			List<DoctorModel> doctors=new ArrayList<>();
			String query="select * from Doctors where hospitalId="+id;
				
				Statement st=conn.createStatement();
				ResultSet rs=st.executeQuery(query);
				
				while (rs.next()) {
					DoctorModel a=new DoctorModel();
					a.setId(rs.getInt(1));
					a.setFname(rs.getString(2));
					a.setLname(rs.getString(3));
					a.setTp(rs.getString(4));
					a.setAddress(rs.getString(5));
					a.setSpecialization(rs.getString(6));
					a.setHospitalId(rs.getInt(7));
					doctors.add(a);
				}
				
			
				
		
			return doctors;
		}
	
	public DoctorModel getDoctor(int id) throws SQLException {
	
		DoctorModel a=new DoctorModel();
		String query="select * from Doctors where id="+id;


			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			if (rs.next()) {
				
				a.setId(rs.getInt(1));
				a.setFname(rs.getString(2));
				a.setLname(rs.getString(3));
				a.setTp(rs.getString(4));
				a.setAddress(rs.getString(5));
				a.setSpecialization(rs.getString(6));
				a.setHospitalId(rs.getInt(7));
				
			}
			
		
		return a;
		
	}
	

	public void createDoctor(DoctorModel a) throws SQLException {
		
		String query="insert into Doctors (fname,lname,tp,address,specialization,hospitalId) values(?,?,?,?,?,?)";
			
			PreparedStatement st=conn.prepareStatement(query);
			st.setString(1, a.getFname());
			st.setString(2, a.getLname());
			st.setString(3, a.getTp());
			st.setString(4, a.getAddress());
			st.setString(5, a.getSpecialization());
			st.setInt(6, a.getHospitalId());
			st.executeUpdate();
		

		
	}
	
	public void updateDoctor(DoctorModel a) throws SQLException {
			
			String query="update Doctors set fname=? ,lname=?,tp=?,address=?,specialization=?,hospitalId=? where id=?";
			
				
				PreparedStatement st=conn.prepareStatement(query);

				st.setString(1, a.getFname());
				st.setString(2, a.getLname());
				st.setString(3, a.getTp());
				st.setString(4, a.getAddress());
				st.setString(5, a.getSpecialization());
				st.setInt(6, a.getHospitalId());
				st.setInt(7, a.getId());
				st.executeUpdate();
			
			
	}

	public void deleteDoctor(int id) throws SQLException {
		
		String query="delete from Doctors where id=?";
			
			PreparedStatement st=conn.prepareStatement(query);

			st.setInt(1, id);
			st.executeUpdate();

	}
	
	
}
