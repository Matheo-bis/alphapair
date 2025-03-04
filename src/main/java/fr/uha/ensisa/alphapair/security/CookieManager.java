package fr.uha.ensisa.alphapair.security;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import fr.uha.ensisa.alphapair.exception.APIException;
import fr.uha.ensisa.alphapair.network.Protocol;

public class CookieManager {
	
	public static final String ACCESS_TOKEN_COOKIE_NAME = "access_token";
	public static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
	public static final String DOMAIN = "localhost";
	
	public static Cookie addAuthCookie(String cookieName, String token) {
		Cookie cookie = new Cookie(cookieName, token);
		cookie.setMaxAge(365 * 24 * 60 * 60); // expires in 1 year
		cookie.setSecure(false);
		cookie.setHttpOnly(true);
		cookie.setDomain(DOMAIN);
		cookie.setPath("/"); // global cookie accessible every where

		return cookie;
	}
	
	public static Cookie removeAuthCookie(String cookieName) {
		Cookie cookie = new Cookie(cookieName, null);
		cookie.setMaxAge(0);
		cookie.setSecure(false);
		cookie.setHttpOnly(true);
		cookie.setDomain(DOMAIN);
		cookie.setPath("/"); // global cookie accessible every where

		return cookie;
	}

	public static String getToken(Cookie[] cookies, String name) throws APIException {
		if (cookies != null) {
			for (Cookie c : cookies) {
				if (c.getName().equals(name)) {
					return c.getValue();
				}
			}
			System.out.println("missing token");
			throw new APIException(HttpStatus.UNAUTHORIZED, Protocol.MISSING_TOKEN);
		} else {
			System.out.println("missing token");
			throw new APIException(HttpStatus.UNAUTHORIZED, Protocol.MISSING_TOKEN);
		}
		
	}
}