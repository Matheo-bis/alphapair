package fr.uha.ensisa.alphapair.service.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import fr.uha.ensisa.alphapair.model.Subject;
import fr.uha.ensisa.alphapair.repository.SubjectRepository;

@Service
public class SubjectLogic {

	@Autowired
	public SubjectRepository sr;

	public ResponseEntity<Object> getPromotionSubjects(String id) {
		
		List<Subject> promotionSubjects = sr.findSubjectsByPromotion(id);
		
		// sorting subjects
		promotionSubjects.sort((s1, s2) ->
			(s1.getName().split("-")[0].compareTo(s2.getName().split("-")[0]))
		);
		
		return new ResponseEntity<Object>(promotionSubjects, HttpStatus.OK);	
	}

}
