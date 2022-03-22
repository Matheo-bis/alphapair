package fr.uha.ensisa.alphapair.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	// attributes
	
	@Id
	@Column(name = "mail")
	private String mail;
	
	@Column(name = "password")
	private String password;
	
	// constructors
	public User() {}
	
	public User(String mail, String password) {
		this.mail = mail;
		this.password = password;
	}

	public String getMail() {
		return mail;
	}

	public String getPassword() {
		return password;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
