package fr.uha.ensisa.alphapair.service.logic;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import fr.uha.ensisa.alphapair.model.Group;
import fr.uha.ensisa.alphapair.model.Promotion;
import fr.uha.ensisa.alphapair.model.Subject;
import fr.uha.ensisa.alphapair.model.User;
import fr.uha.ensisa.alphapair.network.Protocol;
import fr.uha.ensisa.alphapair.repository.GroupRepository;
import fr.uha.ensisa.alphapair.repository.PromotionRepository;
import fr.uha.ensisa.alphapair.repository.UserRepository;
import fr.uha.ensisa.alphapair.service.SubjectService;

@Service
public class PromotionLogic {

	@Autowired
	public GroupRepository gr;
	
	@Autowired
	public UserRepository ur;
	
	@Autowired
	public PromotionRepository pr;
	
	@Autowired
	public SubjectLogic sl;
	
	public ResponseEntity<Object> generatePromotionAssignment(String id) {
		
		// we first check that all groups contain at least 1 student. if not, cancel.
		List<Group> promotionGroups = gr.findGroupByPromotionId(id);
		for (Group group : promotionGroups) {
			if(ur.findUserByGroupId(group.getId()).size() == 0) {
				// we found a group in this promotion that does not contain any student.
				return new ResponseEntity<Object>(Protocol.SERVER_LOGIC_ERROR, HttpStatus.FORBIDDEN);
			}
		}
		
		// setCoolDown
		//if (cooldown not ok) return error;
		//cooldown = not ok;
		
		// all groups are populated and cooldown OK, proceed to assignment generation.
		int matrixSize = promotionGroups.size();
		
		// creating the cost matrix
		double[][] costMatrix = new double[matrixSize][matrixSize];
		for (int i = 0 ; i < matrixSize ; i++) {
			for (int j = 0 ; j < matrixSize ; j++) {
				costMatrix[i][j] = 3;
			}
		}
		
		@SuppressWarnings("unchecked")
		List<Subject> sortedSubjects = (List<Subject>) sl.getPromotionSubjects(id).getBody();
		
		Group group;
		List<String> choices;
		String choice;
		for (int i = 0 ; i < matrixSize ; i++) { // we loop through the groups
			
			// we get the current group 
			group = promotionGroups.get(i);
			
			// we get the current group's choices
			choices = group.getChoices(); // choices looks like ["idOfChoice1", "idOfChoice2", "idOfChoice3"]
			
			// now, for each subject id in choices, we want to get the index of that subject in sortedSubjects,
			// in order to gradually fill in the costMatrix.
			
			if (choices.size() == 3) { // if this group has made choices,
				for (int j = 0 ; j < 3 ; j++) { // we loop through the choices of the group (must have 3 choices if not 0)
					
					// we get the top #(j+1) subject choosen by the group.
					choice = choices.get(j);
					
					// now, we try to find the index k such that : sortedSubjects.get(k).getId() == choice
					for (int k = 0 ; k < sortedSubjects.size() ; k++) {
						if (sortedSubjects.get(k).getId().equals(choice)) {
							// filling up the cost matrix
							costMatrix[i][k] = (double) j;
							break;
						}
					}
				}
			} else {
				// but it is also possible that the group did not choose any subjects.
				// if so, the group only gets 3s on its costMatrix row and basically gets "what's left" as a subject.
				// just move on to the next group;
				
				continue;
			}
			 
		}
		
		// we now have a complete costMatrix that we can work with.
		
		// first, we get the new assignment based-off taht costMatrix using the AssignmentManager generate static method.
		int[] assignment = AssignmentManager.generate(costMatrix);
		
		// then, we turn this assignment into a List<String> listAssignment such that, for each index i :
		// listAssignment.get(i) is exactly sortedSubjects.get( assignment[i] ).getId()
		List<String> listAssignment = new ArrayList<>();
		for (int i = 0 ; i < matrixSize ; i++) {
			listAssignment.add(sortedSubjects.get(assignment[i]).getId());
			// (assignment[i] is the index of the subject of the ith group in sortedSubjects)
		}
		
		// then, we update the current promotion's assignment field with this listAssignment object.
		//pr.updatePromotionAssignment(id, listAssignment);
		Promotion p = pr.findPromotionById(id).get(0);
		p.setAssignment(listAssignment);
		pr.save(p);
		
		// then return the newly generated assignment.
		return new ResponseEntity<Object>(listAssignment, HttpStatus.OK);
	}

}
