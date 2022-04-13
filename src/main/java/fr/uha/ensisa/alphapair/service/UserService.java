package fr.uha.ensisa.alphapair.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import fr.uha.ensisa.alphapair.exception.APIException;
import fr.uha.ensisa.alphapair.model.User;
import fr.uha.ensisa.alphapair.network.Protocol;
import fr.uha.ensisa.alphapair.repository.UserRepository;
import fr.uha.ensisa.alphapair.security.AuthManager;
import fr.uha.ensisa.alphapair.security.CookieManager;
import fr.uha.ensisa.alphapair.security.TokenManager;

@Service
public class UserService {
	
	@Autowired
	public UserRepository ur;
	
	@Autowired
	private HttpServletRequest req;
	
	@Autowired
	private HttpServletResponse res;
	
	public ResponseEntity<Object> userSignup(User user) {
		try {
			AuthManager.getLoggedInUserMail(req.getCookies());
			// an user is already connected
			return new ResponseEntity<Object>(Protocol.ALREADY_LOGGED_IN, HttpStatus.UNAUTHORIZED);
		} catch (APIException e) {
			// no user is connected
			
			if (ur.findUserByMail(user.getMail()).size() > 0) {
				// already exisiting mail
				return new ResponseEntity<Object>(Protocol.ALREADY_USED_MAIL, HttpStatus.UNAUTHORIZED);
			}
			
			// else, proceed to signup
			ur.save(user);
			return new ResponseEntity<Object>(HttpStatus.OK);
		}
	}
	
	public ResponseEntity<Object> userLogin(User user) {
		try {
			AuthManager.getLoggedInUserMail(req.getCookies());
			// an user is already connected
			return new ResponseEntity<Object>(Protocol.ALREADY_LOGGED_IN, HttpStatus.UNAUTHORIZED);
		} catch (APIException e) {
			// no user is connected
			
			// cannot login if the provided credentials are wrong.
			if (ur.findUserByCredentials(user.getMail(), user.getPassword()).size() == 0) {
				return new ResponseEntity<Object>(Protocol.BAD_CREDENTIALS, HttpStatus.UNAUTHORIZED);
			}
			
			// else, proceed to login.
			String generatedAccessToken = TokenManager.generateAccessTokenFromUser(user);
			res.addCookie(
					CookieManager.addAuthCookie(
							CookieManager.ACCESS_TOKEN_COOKIE_NAME,
							generatedAccessToken
					)
			);
			return new ResponseEntity<Object>(HttpStatus.OK);
			
		}
	}
	
	public ResponseEntity<Object> userLogout() {
		res.addCookie(CookieManager.removeAuthCookie(CookieManager.ACCESS_TOKEN_COOKIE_NAME));
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
	
	public ResponseEntity<Object> isLogged() {
		return AuthManager.isLogged(req.getCookies());
	}
}
