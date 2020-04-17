package com.telusko.demorest.model;

import java.sql.Date;

public class PaymentDetailsModel {
	
	private int id;
	private int userId;
	private Date date;
	private String amount;
	private int AppointmentId;
	private String paypalId;
	
	public String getPaypalId() {
		return paypalId;
	}
	public void setPaypalId(String paypalId) {
		this.paypalId = paypalId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public int getAppointmentId() {
		return AppointmentId;
	}
	public void setAppointmentId(int appointmentId) {
		AppointmentId = appointmentId;
	}
	

}
