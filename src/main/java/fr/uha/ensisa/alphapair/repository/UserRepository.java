package fr.uha.ensisa.alphapair.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import fr.uha.ensisa.alphapair.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	
	@Query("SELECT u FROM User u WHERE u.mail = ?1")
    List<User> findUserByMail(String mail);
	
	@Query("SELECT u FROM User u WHERE u.mail = ?1 AND u.password = ?2")
    List<User> findUserByCredentials(String mail, String password);
	
	@Query("SELECT u FROM User u WHERE u.groupId = ?1")
    List<User> findUserByGroupId(String groupId);
	
	@Query("SELECT u FROM User u WHERE u.promotionId = ?1")
    List<User> getPromotionStudents(String promotionId);
	
	@Transactional 
	@Modifying
	@Query("UPDATE User SET groupId=?2 WHERE mail=?1")
	void updateUserGroup(String mail, String groupId);
	
	@Transactional 
	@Modifying
	@Query("UPDATE User SET promotionId=?2 WHERE mail=?1")
	void updateUserPromotion(String mail, String promotionId);

	@Transactional 
	@Modifying
	@Query("UPDATE User SET promotionId='' WHERE promotionId=?1")
	void ejectPromotionUsers(String id);

	@Query("SELECT u FROM User u WHERE u.isAdmin = false")
	List<User> findAllStudents();
	
}