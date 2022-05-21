package fr.uha.ensisa.alphapair.service.logic;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import fr.uha.ensisa.alphapair.model.Group;
import fr.uha.ensisa.alphapair.model.Promotion;
import fr.uha.ensisa.alphapair.model.User;
import fr.uha.ensisa.alphapair.network.Protocol;
import fr.uha.ensisa.alphapair.repository.GroupRepository;
import fr.uha.ensisa.alphapair.repository.PromotionRepository;
import fr.uha.ensisa.alphapair.repository.UserRepository;

@Service
public class GroupLogic {

	@Autowired
	public PromotionRepository pr;
	
	@Autowired
	public GroupRepository gr;
	
	@Autowired
	public UserRepository ur;
	
	public ResponseEntity<Object> getPromotionGroups(String promotionId) {
		
		if (!promotionId.equals("")) { // checking that promotionId is not ""
			
			List<Promotion> targetPromotions = pr.findPromotionById(promotionId);
			if (targetPromotions.size() == 0) { // the promotion does not exist
				return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
			} else { // the promotion exists
				List<Group> groups = gr.findGroupByPromotionId(promotionId);
				
				// creating custom json response
				ObjectMapper mapper = new ObjectMapper();
				ObjectNode jsonResponse = mapper.createObjectNode();
				ArrayNode jsonGroups = mapper.createArrayNode();
			
				for (Group group : groups) {
					ObjectNode jsonGroup = jsonGroups.addObject();
					jsonGroup.put("id", group.getId());
					jsonGroup.put("promotionId", group.getPromotionId());
					jsonGroup.put("isLocked", group.getIsLocked());
					
					ArrayNode jsonGroupMembers = mapper.createArrayNode();
					
					List<User> groupUsers = ur.findUserByGroupId(group.getId());
					
					// sorting group users alphabetically
					groupUsers.sort((u1, u2) ->
						(u1.getLastName() + " " + u1.getFirstName()).compareTo(
							u2.getLastName() + " " + u2.getFirstName()
						)
					);

					
					for (User user : groupUsers) {
						ObjectNode jsonGroupUser = jsonGroupMembers.addObject();
						jsonGroupUser.put("mail", user.getMail());
						jsonGroupUser.put("name", user.getLastName() + " " + user.getFirstName());
					}
					
					jsonGroup.set("members", jsonGroupMembers);
				}
				
			    jsonResponse.set("groups", jsonGroups);
				
				return new ResponseEntity<Object>(jsonResponse, HttpStatus.OK);
				// replace this by custom JSON
			}
			
		} else {
			return new ResponseEntity<Object>(Protocol.INVALID_ARGUMENT, HttpStatus.BAD_REQUEST);
		}
	}
	
}
