package fr.uha.ensisa.alphapair.security;

import javax.servlet.http.Cookie;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import fr.uha.ensisa.alphapair.exception.APIException;

public class AuthManager {

	public static String getLoggedInUserMail(Cookie[] cookies) throws APIException {
		
		String accessToken = CookieManager.getToken(cookies, CookieManager.ACCESS_TOKEN_COOKIE_NAME);
		String userMail = TokenManager.getUserMailFromAccessToken(accessToken);
		return userMail;
	}
	
	public static ResponseEntity<Object> isLogged(Cookie[] cookies) {
		try {
			AuthManager.getLoggedInUserMail(cookies);
			return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
		} catch (APIException e) {
			return new ResponseEntity<>(Boolean.FALSE, HttpStatus.OK);
		}
	}
}
