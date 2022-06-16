package fr.uha.ensisa.alphapair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.uha.ensisa.alphapair.service.PromotionService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/v1/")
public class PromotionController {
	
	@Autowired
	public PromotionService ps;
	
	@PostMapping("/promotions")
	public ResponseEntity<Object> addPromotion(@RequestBody String rawPromotion) {
		return ps.addPromotion(rawPromotion);
	}
	
	@PostMapping("/promotions/populate")
	public ResponseEntity<Object> populatePromotion() {
		return ps.populatePromotion();
	}
	
	@GetMapping("/promotions/{id}")
	public ResponseEntity<Object> getPromotion(@PathVariable String id) {
		return ps.getPromotion(id);
	}
	
	@GetMapping("/promotions")
	public ResponseEntity<Object> getAllPromotions() {
		return ps.getAllPromotions();
	}
	
	@PutMapping("/promotions/{id}")
	public ResponseEntity<Object> updatePromotionField(@PathVariable String id, @RequestBody String rawPromotionUpdate) {
		return ps.updatePromotionField(id, rawPromotionUpdate);
	}
	
	@DeleteMapping("/promotions/{id}")
	public ResponseEntity<Object> deletePromotion(@PathVariable String id) {
		return ps.deletePromotion(id);
	}
	
	@PutMapping("/promotions/{id}/assignment")
	public ResponseEntity<Object> generatePromotionAssignment(@PathVariable String id) {
		return ps.generatePromotionAssignment(id);
	}
	
	@GetMapping("/promotions/{id}/students")
	public ResponseEntity<Object> getPromotionStudents(@PathVariable String id) {
		return ps.getPromotionStudents(id);
	}
}
