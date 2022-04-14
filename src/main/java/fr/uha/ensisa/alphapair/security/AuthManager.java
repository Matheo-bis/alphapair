package fr.uha.ensisa.alphapair.security;

import javax.servlet.http.Cookie;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import fr.uha.ensisa.alphapair.exception.APIException;

public class AuthManager {

	
	
	public static String getLoggedInUserMailFromAccessToken(Cookie[] cookies) throws APIException {
		
		String accessToken = CookieManager.getToken(cookies, CookieManager.ACCESS_TOKEN_COOKIE_NAME);
		String userMail = TokenManager.getUserMailFromToken(accessToken);
		return userMail;
	}
	
	public static String getLoggedInUserMailFromRefreshToken(Cookie[] cookies) throws APIException {
		String refreshToken = CookieManager.getToken(cookies, CookieManager.REFRESH_TOKEN_COOKIE_NAME);
		String userMail = TokenManager.getUserMailFromToken(refreshToken);
		return userMail;
	}
	
	public static ResponseEntity<Object> isLogged(Cookie[] cookies) {
		try {
			AuthManager.getLoggedInUserMailFromAccessToken(cookies);
			return new ResponseEntity<>(Boolean.TRUE, HttpStatus.OK);
		} catch (APIException e) {
			return new ResponseEntity<>(Boolean.FALSE, HttpStatus.OK);
		}
	}

	

}
