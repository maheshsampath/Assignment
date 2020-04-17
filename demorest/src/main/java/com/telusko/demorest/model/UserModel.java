package com.telusko.demorest.model;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class UserModel {
	
	private int id;
	private String userName;
	private String password;
	private String img;
	private String fname;
	private String lname;
	private String tp;
	private String address;
	private String type;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String Img) {
		img = Img;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String Fname) {
		fname = Fname;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String Lname) {
		lname = Lname;
	}
	public String getTp() {
		return tp;
	}
	public void setTp(String Tp) {
		tp = Tp;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String Address) {
		address = Address;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	

}
