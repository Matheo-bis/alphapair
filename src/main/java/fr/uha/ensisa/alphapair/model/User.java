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
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "is_admin")
	private boolean isAdmin;
	
	@Column(name = "group_id")
	private String groupId;
	
	@Column(name = "promotion_id")
	private String promotionId;
	
	// constructors
	public User() {}
	
	public User(String mail, String password, String firstName, String lastName, boolean isAdmin, String groupId, String promotionId) {
		this.mail = mail;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.isAdmin = isAdmin;
		this.groupId = groupId;
		this.promotionId = promotionId;
	}
	
	// might delete this one
	public User(String mail) {
		this.mail = mail;
		this.password = null;
	}
	
	// getters 

	public String getMail() {
		return mail;
	}

	public String getPassword() {
		return password;
	}
	
	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public boolean getIsAdmin() {
		return isAdmin;
	}

	public String getGroupId() {
		return groupId;
	}

	public String getPromotionId() {
		return promotionId;
	}

	// setters
	
	public void setMail(String mail) {
		this.mail = mail;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setIsAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public void setPromotionId(String promotionId) {
		this.promotionId = promotionId;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
