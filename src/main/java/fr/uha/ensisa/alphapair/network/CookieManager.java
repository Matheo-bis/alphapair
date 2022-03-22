package fr.uha.ensisa.alphapair.network;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieManager {
	
	public static final String COOKIE_NAME = "token";
	
	public static Boolean isLogged(Cookie[] cookies) {
		if (cookies == null) {
			return Boolean.FALSE;
		}
			
	    for (Cookie c : cookies) {
	    	if (c.getName().equals(COOKIE_NAME)) {
	    		return Boolean.TRUE;
	    	}
	    }
	    return Boolean.FALSE;
	}
	
	public static Cookie addAuthCookie(String mail) {
		Cookie cookie = new Cookie(COOKIE_NAME, mail);
		cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
		cookie.setSecure(true);
		cookie.setHttpOnly(true);
		cookie.setPath("/"); // global cookie accessible every where

		return cookie;
	}
	
	public static Cookie removeAuthCookie() {
		Cookie cookie = new Cookie(COOKIE_NAME, null);
		cookie.setMaxAge(0);
		cookie.setSecure(true);
		cookie.setHttpOnly(true);
		cookie.setPath("/"); // global cookie accessible every where

		return cookie;
	}
}