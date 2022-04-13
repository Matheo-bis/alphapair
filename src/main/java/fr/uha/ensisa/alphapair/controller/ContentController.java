package fr.uha.ensisa.alphapair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.uha.ensisa.alphapair.service.ContentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ContentController {

	@Autowired
	public ContentService cs;
	
	@GetMapping("/content")
	public ResponseEntity<Object> getContent() {
		return cs.getContent();
	}
	
}
