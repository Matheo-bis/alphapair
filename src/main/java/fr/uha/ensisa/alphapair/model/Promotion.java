package fr.uha.ensisa.alphapair.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "promotions")
public class Promotion {

	// attributes
	@Id
	@GenericGenerator(name = IDGenerator.generatorName, strategy = "fr.uha.ensisa.alphapair.model.IDGenerator")
    @GeneratedValue(generator = IDGenerator.generatorName)
	@Column(name = "id")
	private String id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "limit_date")
	private String limitDate;
	
	@Column(name = "is_student_editable")
	private boolean isStudentEditable;
	
	@Column(name = "assignment")
	@Convert(converter = ListToStringConverter.class)
	private List<String> assignment;

	// constructors
	public Promotion() {}
	
	public Promotion(String name, String limitDate, boolean isStudentEditable, List<String> assignment) {
		this.name = name;
		this.limitDate = limitDate;
		this.isStudentEditable = isStudentEditable;
		this.assignment = assignment;
	}
	
	// getters
	public String getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public String getLimitDate() {
		return limitDate;
	}

	public boolean getIsStudentEditable() {
		return isStudentEditable;
	}

	public List<String> getAssignment() {
		return assignment;
	}	
	
	// setters
	public void setId(String id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setLimitDate(String limitDate) {
		this.limitDate = limitDate;
	}

	public void setIsStudentEditable(boolean isStudentEditable) {
		this.isStudentEditable = isStudentEditable;
	}

	public void setAssignment(List<String> assignment) {
		this.assignment = assignment;
	}
}
