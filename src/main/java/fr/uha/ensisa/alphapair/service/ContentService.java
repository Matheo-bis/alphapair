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
import fr.uha.ensisa.alphapair.security.PropertyManager;

@Service
public class ContentService {
	
	@Autowired
	private HttpServletRequest req;
	
	@Autowired
	private HttpServletResponse res;
		
	/*@Autowired
	static private PropertyManager pm;*/
	
	/*@Autowired
	static private AuthManager am;*/
	
	public ResponseEntity<Object> getContent() {
		System.out.println("getting content...");
		try {
			String userMail = AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies(), true);
			
			String content = "Hello " + userMail + " from " + req.getRemoteAddr() + " ! Here is your content !";
			System.out.println("getting content OK");
			return new ResponseEntity<Object>(content, HttpStatus.OK);
			//
		} catch (APIException e) {
			System.out.println("getting content error : " + e.getResponseEntity().getBody().toString());
			return e.getResponseEntity();
		}
	}
	
	/*public ResponseEntity<Object> addPromotion(String name, Date limitDate) {
		try {
			String userMail = AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies());
			// if (userMail is not admin) return ERRORADMIN
			
			// traitement....
			
		} catch (APIException e) {
			System.out.println("getting content error : " + e.getResponseEntity().getBody().toString());
			return e.getResponseEntity();
		}
	}*/
}
