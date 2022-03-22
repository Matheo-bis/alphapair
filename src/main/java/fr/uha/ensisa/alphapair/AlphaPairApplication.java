package fr.uha.ensisa.alphapair;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class AlphaPairApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlphaPairApplication.class, args);
	}
	
	@GetMapping("/hello")
	public String hello(
			@RequestParam(value = "name", defaultValue = "World") String name,
			HttpServletResponse res
			) {
		
		// create a cookie
		Cookie cookie = new Cookie("username", "Jovan");
		cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
		cookie.setSecure(true);
		cookie.setHttpOnly(true);
		cookie.setPath("/"); // global cookie accessible every where

		//add cookie to response
		res.addCookie(cookie);
		
		return String.format("Hello %s!", name);
	}

}