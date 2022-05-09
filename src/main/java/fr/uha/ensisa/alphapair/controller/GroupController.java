package fr.uha.ensisa.alphapair.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.uha.ensisa.alphapair.service.GroupService;
import fr.uha.ensisa.alphapair.service.PromotionService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/v1/")
public class GroupController {
	
	@Autowired
	public GroupService gs;
	
	@GetMapping("/promotions/{id}/groups")
	public ResponseEntity<Object> getPromotionGroups(@PathVariable String id) {
		return gs.getPromotionGroups(id);
	}
}
