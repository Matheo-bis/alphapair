package fr.uha.ensisa.alphapair.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import fr.uha.ensisa.alphapair.exception.APIException;
import fr.uha.ensisa.alphapair.model.Group;
import fr.uha.ensisa.alphapair.model.RefreshToken;
import fr.uha.ensisa.alphapair.model.User;
import fr.uha.ensisa.alphapair.network.Protocol;
import fr.uha.ensisa.alphapair.repository.GroupRepository;
import fr.uha.ensisa.alphapair.repository.PromotionRepository;
import fr.uha.ensisa.alphapair.repository.RefreshTokenRepository;
import fr.uha.ensisa.alphapair.repository.UserRepository;
import fr.uha.ensisa.alphapair.security.AuthManager;
import fr.uha.ensisa.alphapair.security.CookieManager;
import fr.uha.ensisa.alphapair.security.TokenManager;
import fr.uha.ensisa.alphapair.service.logic.UserLogic;

@Service
public class UserService {
	
	@Autowired
	public PromotionRepository pr;
	
	@Autowired
	public UserRepository ur;
	
	@Autowired
	public GroupRepository gr;
	
	@Autowired
	public RefreshTokenRepository rtr;
	
	@Autowired
	public UserLogic ul;
	
	@Autowired
	private HttpServletRequest req;
	
	@Autowired
	private HttpServletResponse res;

	
	public ResponseEntity<Object> userSignup(User user) {
		System.out.println(user.getIsAdmin());
		try {
			AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies(), false);
			// an user is already connected
			return new ResponseEntity<Object>(Protocol.ALREADY_LOGGED_IN, HttpStatus.UNAUTHORIZED);
		} catch (APIException e) {
			// no user is connected
			
			if (ur.findUserByMail(user.getMail()).size() > 0) {
				// already exisiting mail
				return new ResponseEntity<Object>(Protocol.ALREADY_USED_MAIL, HttpStatus.UNAUTHORIZED);
			}
			
			user.setIsAdmin(false); // make sure the student is not admin
			
			// else, proceed to signup
			ur.save(user);
			return new ResponseEntity<Object>(HttpStatus.OK);
		}
	}
	
	public ResponseEntity<Object> userLogin(User user) {
		
		try {
			AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies(), false);
			// an user is already connected
			return new ResponseEntity<Object>(Protocol.ALREADY_LOGGED_IN, HttpStatus.UNAUTHORIZED);
		} catch (APIException e) {
			// no user is connected
			
			// cannot login if the provided credentials are wrong.
			List<User> currentUser = ur.findUserByCredentials(user.getMail(), user.getPassword()); 
			if (currentUser.size() == 0) {
				return new ResponseEntity<Object>(Protocol.BAD_CREDENTIALS, HttpStatus.UNAUTHORIZED);
			}
			
			// else, proceed to login.
			String generatedAccessToken = TokenManager.generateAccessTokenFromUser(currentUser.get(0));
			String generatedRefreshToken = TokenManager.generateRefreshTokenFromUser(currentUser.get(0));
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
	
	public ResponseEntity<Object> isAdmin() {
		try {
			// checking that user is properly connected
			String userMail = AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies(), false);
			
			// if so, get the user infos from the database
			User user = ur.findUserByMail(userMail).get(0);
			
			// return the isAdmin field from the user
			return new ResponseEntity<Object>(user.getIsAdmin(), HttpStatus.OK);
		} catch (APIException e) {
			// else, the user is not properly connected.
			return e.getResponseEntity();
		}
	}
	
	public ResponseEntity<Object> isStudentPromless() {
		try {
			// checking that user is properly connected
			String userMail = AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies(), false);
			
			// if so, get the user infos from the database
			User user = ur.findUserByMail(userMail).get(0);
			
			if (user.getIsAdmin()) { // if admin, error
				return new ResponseEntity<Object>(Protocol.NOT_ADMIN_USER, HttpStatus.UNAUTHORIZED);
			} else {
				if (user.getPromotionId().equals("")) {
					System.out.println("TRUE");
					return new ResponseEntity<Object>(Boolean.TRUE, HttpStatus.OK);
				} else {
					System.out.println("FALSE");
					System.out.println(user.getPromotionId());
					return new ResponseEntity<Object>(Boolean.FALSE, HttpStatus.OK);
				}
					
			}

		} catch (APIException e) {
			return e.getResponseEntity();
		}
		
	}
	
	public ResponseEntity<Object> getNewTokens() {
		try {
			String oldRefreshToken = CookieManager.getToken(req.getCookies(), CookieManager.REFRESH_TOKEN_COOKIE_NAME);
			
			if (rtr.findRefreshToken(oldRefreshToken).size() == 0) {
				System.out.println("missing refreshToken in database : " + oldRefreshToken);
				new ResponseEntity<Object>(Protocol.EXPIRED_TOKEN, HttpStatus.UNAUTHORIZED); 
			}
			System.out.println("OK : " + oldRefreshToken);
			
			String userMail = TokenManager.getUserMailFromToken(oldRefreshToken, false);
			
			User user = ur.findUserByMail(userMail).get(0);
			
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

	public ResponseEntity<Object> updateStudentPromotion(String rawPromotionId) {
		try {
			// checking that user is properly connected
			String userMail = AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies(), false);
			
			// if so, get the user infos from the database
			User user = ur.findUserByMail(userMail).get(0);
			
			// cannot assign a promotion to an admin
			if (user.getIsAdmin())
				return new ResponseEntity<Object>(Protocol.ADMIN_USER, HttpStatus.UNAUTHORIZED);
			
			JsonNode json = new ObjectMapper().readTree(rawPromotionId);
			
			String promotionId = json.get("promotionId").asText();
			
			// cannot assign a non-existing promotion to the user
			if (pr.findPromotionById(promotionId).size() == 0 && promotionId != "") // id="" : leave current prom
				return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
			
			ur.updateUserPromotion(userMail, promotionId);
			
			// return the isAdmin field from the user
			return new ResponseEntity<Object>(null, HttpStatus.OK);
		} catch (APIException e) {
			// else, the user is not properly connected.
			return e.getResponseEntity();
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<Object> updateStudentGroup(String rawUpdateBody) {
		
		try {
			// checking that user is properly connected
			String userMail = AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies(), false);
			
			// if so, get the user infos from the database
			User user = ur.findUserByMail(userMail).get(0);
			
			JsonNode json = new ObjectMapper().readTree(rawUpdateBody);
			String groupId = json.get("groupId").asText();
			
			if (user.getIsAdmin()) { // an admin wants to change the group of a student
				
				String studentMail = json.get("mail").asText();
				List<User> targetStudents = ur.findUserByMail(studentMail);
				if (targetStudents.size() == 0) { // the student doesn't exist
					return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
				}
				User student = targetStudents.get(0);
				
				return ul.updateStudentGroup(groupId, student);
				
			} else { // a student wants to change its own group
				
				return ul.updateStudentGroup(groupId, user);
				
			}
		} catch (APIException e) {
			return e.getResponseEntity();
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
		}
		
		/*
		 * 
		 * cas 1 : un étudiant change lui même son groupe
		 * rawUpdateBody : {groupId : 8O34NFUN3}
		 * 
		 * cas 2 : l'admin change le groupe d'un étudiant
		 * rawUpdateBody : {groupId : 8O34NFUN3, mail: "yann.cotineau"}
		 */
		 
	}

	public ResponseEntity<Object> getSelfInfo() {
		try {
			// checking that user is properly connected
			String userMail = AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies(), false);
			
			// if so, get the user infos from the database
			User user = ur.findUserByMail(userMail).get(0);
			
			// we do not want to send the password to the frontend.
			user.setPassword("");			
			
			// return the user infos
			return new ResponseEntity<Object>(user, HttpStatus.OK);
		} catch (APIException e) {
			// else, the user is not properly connected.
			return e.getResponseEntity();
		}
	}
	
	
}
