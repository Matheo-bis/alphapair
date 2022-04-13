package fr.uha.ensisa.alphapair.service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import fr.uha.ensisa.alphapair.exception.APIException;
import fr.uha.ensisa.alphapair.security.AuthManager;
import fr.uha.ensisa.alphapair.security.CookieManager;

@Service
public class ContentService {
	
	@Autowired
	private HttpServletRequest req;
	
	@Autowired
	private HttpServletResponse res;
	
	
	public ResponseEntity<Object> getContent() {
		try {
			String userMail = AuthManager.getLoggedInUserMail(req.getCookies());
			
			String content = "Hello " + userMail + " ! Here is your content !";
			return new ResponseEntity<Object>(content, HttpStatus.OK);
			//
		} catch (APIException e) {
			return e.getResponseEntity();
		}
	}
}
