package fr.uha.ensisa.alphapair.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "refresh_tokens")
public class RefreshToken {
	
	// attributes
	@Id
	@Column(name = "token")
	private String token;
	
	// constructors
	
	public RefreshToken() {}
	
	public RefreshToken(String token) {
		this.token = token;
	}
	
	public String getToken() {
		return this.token;
	}
}
