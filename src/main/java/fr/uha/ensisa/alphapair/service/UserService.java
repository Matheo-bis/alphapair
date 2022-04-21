package fr.uha.ensisa.alphapair.service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import fr.uha.ensisa.alphapair.exception.APIException;
import fr.uha.ensisa.alphapair.model.RefreshToken;
import fr.uha.ensisa.alphapair.model.User;
import fr.uha.ensisa.alphapair.network.Protocol;
import fr.uha.ensisa.alphapair.repository.RefreshTokenRepository;
import fr.uha.ensisa.alphapair.repository.UserRepository;
import fr.uha.ensisa.alphapair.security.AuthManager;
import fr.uha.ensisa.alphapair.security.CookieManager;
import fr.uha.ensisa.alphapair.security.TokenManager;

@Service
public class UserService {
	
	@Autowired
	public UserRepository ur;
	
	@Autowired
	public RefreshTokenRepository rtr;
	
	@Autowired
	private HttpServletRequest req;
	
	@Autowired
	private HttpServletResponse res;
	
	/*@Autowired
	private TokenManager tm;
	
	@Autowired
	static private AuthManager am;
	
	@Autowired
	static private CookieManager cm;*/
	
	public ResponseEntity<Object> userSignup(User user) {
		try {
			AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies());
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
			AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies());
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
			String generatedRefreshToken = TokenManager.generateRefreshTokenFromUser(user);
			System.out.println(generatedAccessToken);
			System.out.println(generatedRefreshToken);
			res.addCookie(
					CookieManager.addAuthCookie(
							CookieManager.ACCESS_TOKEN_COOKIE_NAME,
							generatedAccessToken
					)
			);
			res.addCookie(
					CookieManager.addAuthCookie(
							CookieManager.REFRESH_TOKEN_COOKIE_NAME,
							generatedRefreshToken
					)
			);
			rtr.save(new RefreshToken(generatedRefreshToken));
			return new ResponseEntity<Object>(HttpStatus.OK);
			
		}
	}
	
	public ResponseEntity<Object> userLogout() {
		// removing current accessToken
		res.addCookie(CookieManager.removeAuthCookie(CookieManager.ACCESS_TOKEN_COOKIE_NAME));
		
		// storing current refreshToken before removing it.
		try {
			String refreshToken = CookieManager.getToken(req.getCookies(), CookieManager.REFRESH_TOKEN_COOKIE_NAME);
			rtr.delete(new RefreshToken(refreshToken));
		} catch (APIException e) {
			// in case no refresh token was provided, simply ignore.
		}
		res.addCookie(CookieManager.removeAuthCookie(CookieManager.REFRESH_TOKEN_COOKIE_NAME));
		
		return new ResponseEntity<Object>(HttpStatus.OK);
	}
	
	public ResponseEntity<Object> isLogged() {
		return AuthManager.isLogged(req.getCookies());
	}
	
	public ResponseEntity<Object> getNewTokens() {
		try {
			String oldRefreshToken = CookieManager.getToken(req.getCookies(), CookieManager.REFRESH_TOKEN_COOKIE_NAME);
			
			if (rtr.findRefreshToken(oldRefreshToken).size() == 0) {
				System.out.println("missing refreshToken in database : " + oldRefreshToken);
				new ResponseEntity<Object>(Protocol.EXPIRED_TOKEN, HttpStatus.UNAUTHORIZED); 
			}
			System.out.println("OK : " + oldRefreshToken);
			
			String userMail = TokenManager.getUserMailFromToken(oldRefreshToken);
			
			User user = new User(userMail);
			
			// getting new tokens
			String newAccessToken = TokenManager.generateAccessTokenFromUser(user);
			String newRefreshToken = TokenManager.generateRefreshTokenFromUser(user);
			
			// adding new tokens to cookies
			res.addCookie(
					CookieManager.addAuthCookie(
							CookieManager.ACCESS_TOKEN_COOKIE_NAME,
							newAccessToken
					)
			);
			res.addCookie(
					CookieManager.addAuthCookie(
							CookieManager.REFRESH_TOKEN_COOKIE_NAME,
							newRefreshToken
					)
			);
			
			// updating refresh_tokens table
			rtr.delete(new RefreshToken(oldRefreshToken));
			rtr.save(new RefreshToken(newRefreshToken));
			
			return new ResponseEntity<Object>(HttpStatus.OK);
			
		} catch (APIException e) {
			// there is an issue with the provided refreshToken.
			return e.getResponseEntity();
		}
	}
}
