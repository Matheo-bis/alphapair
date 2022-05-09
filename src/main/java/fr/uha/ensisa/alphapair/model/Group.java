package fr.uha.ensisa.alphapair.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "groups")
public class Group {

	// attributes
	@Id
	@GenericGenerator(name = IDGenerator.generatorName, strategy = "fr.uha.ensisa.alphapair.model.IDGenerator")
    @GeneratedValue(generator = IDGenerator.generatorName)
	@Column(name = "id")
	private String id;
	
	@Column(name = "promotion_id")
	private String promotionId;
	
	@Column(name = "is_locked")
	private boolean isLocked;
	
	@Column(name = "choices")
	@Convert(converter = ListToStringConverter.class)
	private List<String> choices;

	// constructors
	public Group() {}
	
	public Group(String promotionId, boolean isLocked, List<String> choices) {
		this.promotionId = promotionId;
		this.isLocked = isLocked;
		this.choices = choices;
	}

	// getters
	public String getId() {
		return id;
	}

	public String getPromotionId() {
		return promotionId;
	}

	public boolean getIsLocked() {
		return isLocked;
	}

	public List<String> getChoices() {
		return choices;
	}
	
	// setters
	public void setId(String id) {
		this.id = id;
	}

	public void setPromotionId(String promotionId) {
		this.promotionId = promotionId;
	}

	public void setIsLocked(boolean isLocked) {
		this.isLocked = isLocked;
	}

	public void setChoices(List<String> choices) {
		this.choices = choices;
	}
}
