package fr.uha.ensisa.alphapair.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import fr.uha.ensisa.alphapair.model.Group;
import fr.uha.ensisa.alphapair.model.Promotion;

@Repository
public interface GroupRepository extends JpaRepository<Group, String> {

	@Query("SELECT g FROM Group g WHERE g.id = ?1")
    List<Group> findGroupById(String id);
	
	@Query("SELECT g FROM Group g JOIN User u ON g.id = u.groupId WHERE u.mail = ?1")
	List<Group> findGroupByUserMail(String mail);
	
	@Query("SELECT g FROM Group g WHERE g.promotionId = ?1")
	List<Group> findGroupByPromotionId(String promotionId);

	@Transactional 
	@Modifying
	@Query("DELETE FROM Group g WHERE g.promotionId = ?1")
	void deletePromotionGroups(String id);

	@Transactional 
	@Modifying
	@Query("UPDATE Group SET isLocked=?2 WHERE id=?1")
	void setGroupLocked(String groupId, boolean isLocked);
	
	@Transactional 
	@Modifying
	@Query("UPDATE Group SET choices=?2 WHERE id=?1")
	void setGroupChoices(String groupId, List<String> choices);
	
}
