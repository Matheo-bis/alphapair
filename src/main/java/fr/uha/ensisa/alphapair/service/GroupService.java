package fr.uha.ensisa.alphapair.service;

import java.util.ArrayList;
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
import fr.uha.ensisa.alphapair.model.Promotion;
import fr.uha.ensisa.alphapair.model.Subject;
import fr.uha.ensisa.alphapair.model.User;
import fr.uha.ensisa.alphapair.network.Protocol;
import fr.uha.ensisa.alphapair.repository.GroupRepository;
import fr.uha.ensisa.alphapair.repository.PromotionRepository;
import fr.uha.ensisa.alphapair.repository.RefreshTokenRepository;
import fr.uha.ensisa.alphapair.repository.SubjectRepository;
import fr.uha.ensisa.alphapair.repository.UserRepository;
import fr.uha.ensisa.alphapair.security.AuthManager;
import fr.uha.ensisa.alphapair.service.logic.GroupLogic;
import fr.uha.ensisa.alphapair.service.logic.UserLogic;

@Service
public class GroupService {
	
	@Autowired
	public PromotionRepository pr;
	
	@Autowired
	public SubjectRepository sr;
	
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
	
	public ResponseEntity<Object> getGroup(String id) {
		try {
			String userMail = AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies(), false);
			User user = ur.findUserByMail(userMail).get(0);
			Group g;
			
			if (user.getIsAdmin()) { // if user is an admin
				g = gr.findGroupById(id).get(0);
				return new ResponseEntity<Object>(g, HttpStatus.OK);
			} else { // if user is not admin, grant access only to his current group if defined.
				System.out.println("not admin!");
				if (!user.getGroupId().equals("")) { // student is part of a group. give him his infos.
					System.out.println(user.getGroupId());
					g = gr.findGroupById(user.getGroupId()).get(0);
					return new ResponseEntity<Object>(g, HttpStatus.OK);
				} else { // the student is not part of any promotion.
					return new ResponseEntity<Object>(null, HttpStatus.OK);
				}
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

	public ResponseEntity<Object> setGroupChoices(String choicesRaw) {
		try {
			// checking that user is properly connected
			String userMail = AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies(), false);
			
			// if so, get the user infos from the database
			User user = ur.findUserByMail(userMail).get(0);
			
			if (user.getIsAdmin()) { // an admin does not have the permission to change a group's choices
				return new ResponseEntity<Object>(Protocol.SERVER_LOGIC_ERROR, HttpStatus.FORBIDDEN);
			}
			// we now know that the user is a student.
			
			// if the student is not part of a group :
			if (user.getGroupId().equals("")) {
				return new ResponseEntity<Object>(Protocol.SERVER_LOGIC_ERROR, HttpStatus.FORBIDDEN);
			}
		
			
			JsonNode json = new ObjectMapper().readTree(choicesRaw);
			
			List<String> newChoices = new ArrayList<>();
			
			newChoices.add(json.get("choice1").asText());
			newChoices.add(json.get("choice2").asText());
			newChoices.add(json.get("choice3").asText());
			
			// checking that the provided choices ids are properly defined : 
			// no null, no "", choiceI != choiceJ, and each id references a subject that is part of the student's promotion.
			List<String> encouteredIds = new ArrayList<>();
			
			for (String choice : newChoices) {
				if (choice == null || choice.equals("")) {
					return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
				} else {
					if (encouteredIds.contains(choice)) { // an id is present twice in the choices : invalid argument
						return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
					} else {
						encouteredIds.add(choice);
					}
				}
				if (!sr.getById(choice).getPromotionId().equals(user.getPromotionId())) {
					// a student cannot choose a subject that is outside of his current promotion.
					return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
				}
			}
			
			Group g = gr.getById(user.getGroupId());
			g.setChoices(newChoices);
			gr.save(g);
			
			
			//gr.setGroupChoices(user.getGroupId(), newChoices);
			return new ResponseEntity<Object>(null, HttpStatus.OK);
			 
	
				
		} catch (APIException e) {
			return e.getResponseEntity();
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
		}
	}
	
	
}
