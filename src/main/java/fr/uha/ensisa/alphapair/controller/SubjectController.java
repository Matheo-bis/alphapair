package fr.uha.ensisa.alphapair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.uha.ensisa.alphapair.service.SubjectService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/v1/")
public class SubjectController {
	
	@Autowired
	public SubjectService ss;
	
	@GetMapping("/promotions/{id}/subjects")
	public ResponseEntity<Object> getPromotionSubjects(@PathVariable String id) {
		return ss.getPromotionSubjects(id);
	}
	
}
