package fr.uha.ensisa.alphapair.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

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
	
	@GetMapping("/test")
	public ResponseEntity<Object> getTest() {
		
		// create object mapper
		ObjectMapper mapper = new ObjectMapper();

		// create new node
		ObjectNode obj = mapper.createObjectNode();
		
		ArrayNode addresses = mapper.createArrayNode();

		// create address
		ObjectNode address1 = addresses.addObject();
		address1.put("city", "Lahore");
		address1.put("country", "Pakistan");
		
		ObjectNode address2 = addresses.addObject();
		address2.put("city", "Mulhouse");
		address2.put("country", "France");

		// add address node
		obj.set("addresses", addresses);
		
		return new ResponseEntity<Object>(obj, HttpStatus.OK);
		
	}
	
}
