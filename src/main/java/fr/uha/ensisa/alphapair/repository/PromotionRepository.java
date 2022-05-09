package fr.uha.ensisa.alphapair.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import fr.uha.ensisa.alphapair.model.Promotion;

@Repository
public interface PromotionRepository extends JpaRepository<Promotion, String> {
	
	@Query("SELECT p FROM Promotion p WHERE p.id = ?1")
    List<Promotion> findPromotionById(String id);
	
	@Transactional 
	@Modifying
	@Query("UPDATE Promotion SET name=?2 WHERE id=?1")
	void updatePromotionName(String id, String name);
	
	@Transactional 
	@Modifying
	@Query("UPDATE Promotion SET limitDate=?2 WHERE id=?1")
	void updatePromotionLimitDate(String id, String limitDate);
	
	@Transactional 
	@Modifying
	@Query("UPDATE Promotion SET isStudentEditable=?2 WHERE id=?1")
	void updatePromotionIsStudentEditable(String id, boolean isStudentEditable);

}
