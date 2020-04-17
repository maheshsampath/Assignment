package com.telusko.demorest.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.telusko.demorest.model.PaymentDetailsModel;

public class paymentDetailsRepository {
	
	List<PaymentDetailsModel> payments;
	Connection conn=null;
	
	public paymentDetailsRepository() {
		
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
	
	public List<PaymentDetailsModel> getPayments() throws SQLException {
		
		List<PaymentDetailsModel> payments=new ArrayList<>();
		String query="select * from PaymentDetails";
			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			while (rs.next()) {
				PaymentDetailsModel a=new PaymentDetailsModel();
				a.setId(rs.getInt(1));
				a.setUserId(rs.getInt(2));
				a.setDate(rs.getDate(3));
				a.setAmount(rs.getString(4));
				a.setAppointmentId(rs.getInt(5));
				a.setPaypalId(rs.getString(6));
			
				payments.add(a);
			}

		return payments;
	}
	
	public PaymentDetailsModel getPayment(int id) throws SQLException {
	
		PaymentDetailsModel a=new PaymentDetailsModel();
		String query="select * from PaymentDetails where id="+id;

			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			if (rs.next()) {
				
				a.setId(rs.getInt(1));
				a.setUserId(rs.getInt(2));
				a.setDate(rs.getDate(3));
				a.setAmount(rs.getString(4));
				a.setAppointmentId(rs.getInt(5));
				a.setPaypalId(rs.getString(6));
				
			}
			

		return a;
		
	}
	
	public List<PaymentDetailsModel> getPaymentsByUser(int id) throws SQLException {
		
		List<PaymentDetailsModel> payments=new ArrayList<>();
		String query="select * from PaymentDetails where userId="+id;
			
			Statement st=conn.createStatement();
			ResultSet rs=st.executeQuery(query);
			
			while (rs.next()) {
				PaymentDetailsModel a=new PaymentDetailsModel();
				a.setId(rs.getInt(1));
				a.setUserId(rs.getInt(2));
				a.setDate(rs.getDate(3));
				a.setAmount(rs.getString(4));
				a.setAppointmentId(rs.getInt(5));
				a.setPaypalId(rs.getString(6));
			
				payments.add(a);
			}

		return payments;
	}
	
	public void createPayment(PaymentDetailsModel a) throws SQLException {
		
		String query="insert into PaymentDetails(userId,date,amount,appointmentId,paypalId) values(?,?,?,?,?)";

			PreparedStatement st=conn.prepareStatement(query);
			st.setInt(1, a.getUserId());
			st.setDate(2, a.getDate());
			st.setString(3, a.getAmount());
			st.setInt(4, a.getAppointmentId());
			st.setString(5, a.getPaypalId());
			st.executeUpdate();
		

		
	}
	
}
