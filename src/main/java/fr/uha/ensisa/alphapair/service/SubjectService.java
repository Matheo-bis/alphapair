package fr.uha.ensisa.alphapair.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import fr.uha.ensisa.alphapair.exception.APIException;
import fr.uha.ensisa.alphapair.model.Promotion;
import fr.uha.ensisa.alphapair.model.Subject;
import fr.uha.ensisa.alphapair.model.User;
import fr.uha.ensisa.alphapair.network.Protocol;
import fr.uha.ensisa.alphapair.repository.SubjectRepository;
import fr.uha.ensisa.alphapair.repository.UserRepository;
import fr.uha.ensisa.alphapair.security.AuthManager;
import fr.uha.ensisa.alphapair.service.logic.SubjectLogic;

@Service
public class SubjectService {
	
	@Autowired
	public UserRepository ur;
	
	@Autowired
	public SubjectRepository sr;
	
	@Autowired
	public SubjectLogic sl;
	
	@Autowired
	private HttpServletRequest req;
	
	@Autowired
	private HttpServletResponse res;
	
	public ResponseEntity<Object> getPromotionSubjects(String id) {
		try {
			String userMail = AuthManager.getLoggedInUserMailFromAccessToken(req.getCookies(), false);
			User user = ur.findUserByMail(userMail).get(0);
			
			if (user.getIsAdmin()) { // if user is an admin
				return sl.getPromotionSubjects(id);
				
			} else { // if user is not admin, grant access only to his current promotion subjects if defined.
				if (user.getPromotionId() != "") { // student is part of a promotion. give him his infos.
					return sl.getPromotionSubjects(user.getPromotionId());
				} else { // the student is not part of any promotion.
					return new ResponseEntity<Object>(Protocol.PROMLESS_STUDENT, HttpStatus.BAD_REQUEST);
				}
			}
			
		} catch (APIException e) {
			return e.getResponseEntity();
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
		}
	}
}
