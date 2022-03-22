package fr.uha.ensisa.alphapair.controller;

import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import fr.uha.ensisa.alphapair.model.User;
import fr.uha.ensisa.alphapair.network.CookieManager;
import fr.uha.ensisa.alphapair.network.Protocol;
import fr.uha.ensisa.alphapair.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserController {
	
	@Autowired
	public UserRepository pr;

	
	// obtenir la liste de tous les projets
	@ResponseBody
	@GetMapping("/users")
	public List<User> LIST_USERS(HttpServletRequest request) {
		
		/*Cookie[] cookies = request.getCookies();
	    for (Cookie c : cookies) {
	    	System.out.println(c.getName() + " " + c.getValue());
	    }*/
		
		
		return pr.findAll();
	}
	
	@PostMapping("/signup")
	public int userSignup(@RequestBody User user, HttpServletRequest request) {
		
		// cannot signup if the user is already logged in an account.
		if (CookieManager.isLogged(request.getCookies()))
			return Protocol.REPLY_AUTH_ERROR;

		// cannot signup if an user already has provided mail.
		if (pr.findUserByMail(user.getMail()).size() > 0)
			return Protocol.REPLY_DB_ERROR;
		
		// else, proceed to signup.
		pr.save(user);
		return Protocol.REPLY_OK;
	}
	
	@PostMapping("/login")
	public int userLogin(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) {

		// cannot login if the user is already logged in an account.
		if (CookieManager.isLogged(request.getCookies()))
			return Protocol.REPLY_AUTH_ERROR;
		
		// cannot login if the provided credentials are wrong.
		if (pr.findUserByCredentials(user.getMail(), user.getPassword()).size() == 0)
			return Protocol.REPLY_DB_ERROR;
		
		// else, proceed to login.
		response.addCookie(CookieManager.addAuthCookie(user.getMail()));
		return Protocol.REPLY_OK;
	}
	
	@GetMapping("/logout")
	public int userLogout(HttpServletResponse response) {
		
		response.addCookie(CookieManager.removeAuthCookie());
		return Protocol.REPLY_OK;
	}
	
	@GetMapping("/content")
	public String getContent(HttpServletRequest request) {
		
		// cannot give content if the user is not logged in an account.
		if (!CookieManager.isLogged(request.getCookies()))
			return "";
		
		String user = "";
		Cookie[] cookies = request.getCookies();
	    for (Cookie c : cookies) {
	    	if (c.getName().equals(CookieManager.COOKIE_NAME))
	    		user = c.getValue();
	    }
		
		return "Hello " + user + "! Here is your content!";
	}
	
	@GetMapping("/islogged")
	public int isLogged(HttpServletRequest request) {
		if (CookieManager.isLogged(request.getCookies()))
			return Protocol.REPLY_OK;
		return Protocol.REPLY_AUTH_ERROR;
	}
	
}