package com.telusko.demorest.model;

public class HospitalModel {
	
	private int id;
	private String name;
	private String address;
	private String Tp;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getTp() {
		return Tp;
	}
	public void setTp(String tp) {
		Tp = tp;
	}

}
