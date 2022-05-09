package fr.uha.ensisa.alphapair.controller;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.uha.ensisa.alphapair.model.User;
import fr.uha.ensisa.alphapair.service.UserService;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/v1/")
public class UserController {
	

	@Autowired
	public UserService us;
	
	@PostMapping("/signup")
	public ResponseEntity<Object> userSignup(@RequestBody User user) {
		return us.userSignup(user);
	}
	
	@PostMapping("/login")
	public ResponseEntity<Object> userLogin(@RequestBody User user) {
		return us.userLogin(user);
	}
	
	@GetMapping("/logout")
	public ResponseEntity<Object> userLogout() {
		return us.userLogout();
	}
	
	@GetMapping("/islogged")
	public ResponseEntity<Object> isLogged() {
		return us.isLogged();
	}
	
	@GetMapping("/isadmin")
	public ResponseEntity<Object> isAdmin() {
		return us.isAdmin();
	}
	
	@GetMapping("/isstudentpromless")
	public ResponseEntity<Object> isStudentPromless() {
		return us.isStudentPromless();
	}
	
	@GetMapping("/getnewtokens")
	public ResponseEntity<Object> getNewTokens() {
		System.out.println("getting new token ...");
		return us.getNewTokens();
	}
	
	@PutMapping("/users/promotion")
	public ResponseEntity<Object> updateStudentPromotion(@RequestBody String rawPromotionId) {
		return us.updateStudentPromotion(rawPromotionId);
	}
	
	@PutMapping("/users/group")
	public ResponseEntity<Object> updateStudentGroup(@RequestBody String rawUpdateBody) {
		return us.updateStudentGroup(rawUpdateBody);
	}
	
	@GetMapping("/users/self")
	public ResponseEntity<Object> getSelfInfo() {
		return us.getSelfInfo();
	}
	
}