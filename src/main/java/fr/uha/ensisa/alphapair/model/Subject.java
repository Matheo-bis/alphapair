package fr.uha.ensisa.alphapair.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "subjects")
public class Subject {
	
	// attributes
	@Id
	@GenericGenerator(name = IDGenerator.generatorName, strategy = "fr.uha.ensisa.alphapair.model.IDGenerator")
    @GeneratedValue(generator = IDGenerator.generatorName)
	@Column(name = "id")
	private String id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "supervisor")
	private String supervisor;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "promotion_id")
	private String promotionId;

	// constructors
	public Subject() {}
	
	public Subject(String name, String supervisor, String description, String promotionId) {
		this.name = name;
		this.supervisor = supervisor;
		this.description = description;
		this.promotionId = promotionId;
	}
	
	// getters
	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getSupervisor() {
		return supervisor;
	}

	public String getDescription() {
		return description;
	}

	public String getPromotionId() {
		return promotionId;
	}
	
	// setters
	public void setId(String id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setSupervisor(String supervisor) {
		this.supervisor = supervisor;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setPromotionId(String promotionId) {
		this.promotionId = promotionId;
	}
}
