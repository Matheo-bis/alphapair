package fr.uha.ensisa.alphapair.service.logic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import fr.uha.ensisa.alphapair.model.Group;
import fr.uha.ensisa.alphapair.model.User;
import fr.uha.ensisa.alphapair.network.Protocol;
import fr.uha.ensisa.alphapair.repository.GroupRepository;
import fr.uha.ensisa.alphapair.repository.UserRepository;

@Service
public class UserLogic {
	
	@Autowired
	public UserRepository ur;
	
	@Autowired
	public GroupRepository gr;
	
	public ResponseEntity<Object> updateStudentGroup(String targetGroupId, User student) {
		
		int MAX_GROUP_CAPACITY = 2;
		
		if (!student.getPromotionId().equals("")) { // the student is currently in a promotion
			
			List<Group> targetGroups = new ArrayList<Group>();
			List<Group> currentGroups = new ArrayList<Group>();
			
			// checking that targetGroupId references either an existing group in the same promotion as student, or ""
			if (!targetGroupId.equals("")) {
				targetGroups = gr.findGroupById(targetGroupId);
				if (targetGroups.size() == 0)
					// it means that the group doesn't exist
					return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
				else if (!targetGroups.get(0).getPromotionId().equals(student.getPromotionId())) {
					// it means that the group does exist but is not in the same promotion as the student 
					return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
				}
			}
			
			currentGroups = gr.findGroupByUserMail(student.getMail());
			if (currentGroups.size() == 0) { // the student is not part of a group
				
				if (!targetGroupId.equals("")) { // if targetGroupId="", no need to do anything
					// checking that the user is actually able to enter the targetGroup :
					//	- targetGroup must have capacity (at most MAX_GROUP_CAPACITY users per group)
					//	- targetGroup must be unlocked
					Group targetGroup = targetGroups.get(0);
					int targetGroupPopulation = ur.findUserByGroupId(targetGroupId).size();
					if (targetGroup.getIsLocked() || targetGroupPopulation == MAX_GROUP_CAPACITY) {
						return new ResponseEntity<Object>(Protocol.SERVER_LOGIC_ERROR, HttpStatus.NOT_ACCEPTABLE);
					} else {
						ur.updateUserGroup(student.getMail(), targetGroupId);
						return new ResponseEntity<Object>(null, HttpStatus.OK);
					}
				} else {
					return new ResponseEntity<Object>(null, HttpStatus.OK);
				}
				
			} else { // the student is part of a group
				
				Group currentGroup = currentGroups.get(0);
				
				if (targetGroupId.equals("")) { // the user wants to leave its current group
					if (currentGroup.getIsLocked()) { // cannot leave the current group because it is locked
						return new ResponseEntity<Object>(Protocol.SERVER_LOGIC_ERROR, HttpStatus.NOT_ACCEPTABLE);
					} else {
						ur.updateUserGroup(student.getMail(), "");
						return new ResponseEntity<Object>(null, HttpStatus.OK);
					}
				} else { // the user wants to move to another group
					Group targetGroup = targetGroups.get(0);
					int targetGroupPopulation = ur.findUserByGroupId(targetGroupId).size();
					if (currentGroup.getIsLocked() || targetGroup.getIsLocked() || targetGroupPopulation == MAX_GROUP_CAPACITY) {
						return new ResponseEntity<Object>(Protocol.SERVER_LOGIC_ERROR, HttpStatus.NOT_ACCEPTABLE);
					} else {
						ur.updateUserGroup(student.getMail(), targetGroupId);
						return new ResponseEntity<Object>(null, HttpStatus.OK);
					}
				}
			}
			
		} else { // the student is not currently in a promotion
			return new ResponseEntity<Object>(Protocol.PROMLESS_STUDENT, HttpStatus.UNAUTHORIZED);
		}
		
	}
	
}
