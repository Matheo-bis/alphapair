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
	
	@CrossOrigin
	@PostMapping("/promotions")
	public ResponseEntity<Object> addPromotion(@RequestBody String rawPromotion) {
		return ps.addPromotion(rawPromotion);
	}
	
	@CrossOrigin
	@GetMapping("/promotions/{id}")
	public ResponseEntity<Object> getPromotion(@PathVariable String id) {
		return ps.getPromotion(id);
	}
	
	@CrossOrigin
	@GetMapping("/promotions")
	public ResponseEntity<Object> getAllPromotions() {
		return ps.getAllPromotions();
	}
	
	@CrossOrigin
	@PutMapping("/promotions/{id}")
	public ResponseEntity<Object> updatePromotionField(@PathVariable String id, @RequestBody String rawPromotionUpdate) {
		return ps.updatePromotionField(id, rawPromotionUpdate);
	}
	
	@CrossOrigin
	@DeleteMapping("/promotions/{id}")
	public ResponseEntity<Object> deletePromotion(@PathVariable String id) {
		return ps.deletePromotion(id);
	}
}
