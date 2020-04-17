package com.telusko.demorest.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.telusko.demorest.model.HospitalModel;

public class HospitalRepository {
	
	List<HospitalModel> hospitals;
	Connection conn=null;
	
	public HospitalRepository() {
		
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
	
	public List<HospitalModel> getHospitals() throws SQLException {
		
		List<HospitalModel> hospitals=new ArrayList<>();
		String query="select * from HospitalDetails";
			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			while (rs.next()) {
				HospitalModel a=new HospitalModel();
				a.setId(rs.getInt(1));
				a.setName(rs.getString(2));
				a.setAddress(rs.getString(3));
				a.setTp(rs.getString(4));
				hospitals.add(a);
			}
			
		

		return hospitals;
	}
	
	public HospitalModel getHospital(int id) throws SQLException {
	
		HospitalModel a=new HospitalModel();
		String query="select * from HospitalDetails where id="+id;

			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			if (rs.next()) {
				
				a.setId(rs.getInt(1));
				a.setName(rs.getString(2));
				a.setAddress(rs.getString(3));
				a.setTp(rs.getString(4));
				
			}
			

		return a;
		
	}
	
	public void createHospital(HospitalModel a) throws SQLException {
		
		String query="insert into HospitalDetails (name,address,Tp) values(?,?,?)";

			PreparedStatement st=conn.prepareStatement(query);
			st.setString(1, a.getName());
			st.setString(2, a.getAddress());
			st.setString(3, a.getTp());
			st.executeUpdate();
		

		
	}
	
	public void updateHospital(HospitalModel a) throws SQLException {
			
			String query="update HospitalDetails set name=? ,address=?,Tp=? where id=?";
				
				PreparedStatement st=conn.prepareStatement(query);

				st.setString(1, a.getName());
				st.setString(2, a.getAddress());
				st.setString(3, a.getTp());
				st.setInt(4, a.getId());
				st.executeUpdate();
			
			
	}

	public void deleteHospital(int id) throws SQLException {
		
		String query="delete from HospitalDetails where id=?";
			
			PreparedStatement st=conn.prepareStatement(query);

			st.setInt(1, id);
			st.executeUpdate();
			System.out.println("hii");

	}
	


}
