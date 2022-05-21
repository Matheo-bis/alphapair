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
import fr.uha.ensisa.alphapair.model.User;
import fr.uha.ensisa.alphapair.network.Protocol;
import fr.uha.ensisa.alphapair.repository.GroupRepository;
import fr.uha.ensisa.alphapair.repository.PromotionRepository;
import fr.uha.ensisa.alphapair.repository.RefreshTokenRepository;
import fr.uha.ensisa.alphapair.repository.UserRepository;
import fr.uha.ensisa.alphapair.security.AuthManager;
import fr.uha.ensisa.alphapair.service.logic.GroupLogic;
import fr.uha.ensisa.alphapair.service.logic.UserLogic;

@Service
public class GroupService {
	
	@Autowired
	public PromotionRepository pr;
	
	@Autowired
	public UserRepository ur;
	
	@Autowired
	public GroupRepository gr;
	
	@Autowired
	public RefreshTokenRepository rtr;
	
	@Autowired
	public GroupLogic gl;
	
	@Autowired
	private HttpServletRequest req;
	
	@Autowired
	private HttpServletResponse res;

	public ResponseEntity<Object> getPromotionGroups(String id) {
		
		try {
			// checking that user is properly connected
			String userMail = AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies(), false);
			
			// if so, get the user infos from the database
			User user = ur.findUserByMail(userMail).get(0);
			
			if (user.getIsAdmin()) // an admin wants to get a promotion's groups
				return gl.getPromotionGroups(id);
			else  { // a student wants to get its promotion's groups
				return gl.getPromotionGroups(user.getPromotionId());
			}
				

		} catch (APIException e) {
			return e.getResponseEntity();
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
		}
	}

	public ResponseEntity<Object> setGroupLocked(String id, String isLockedRaw) {
		try {
			// checking that user is properly connected
			String userMail = AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies(), false);
			
			// if so, get the user infos from the database
			User user = ur.findUserByMail(userMail).get(0);
			
			JsonNode json = new ObjectMapper().readTree(isLockedRaw);
			
			boolean isLocked = json.get("isLocked").asBoolean();
			
			if (user.getIsAdmin()) { // an admin wants to change a group's isLocked status
				gr.setGroupLocked(id, isLocked);
				return new ResponseEntity<Object>(null, HttpStatus.OK);
			}
				
			else  { // an student wants to change his group's isLocked status
				gr.setGroupLocked(user.getGroupId(), isLocked);
				return new ResponseEntity<Object>(null, HttpStatus.OK);
			}
				

		} catch (APIException e) {
			return e.getResponseEntity();
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
		}
	}
	
	
}
