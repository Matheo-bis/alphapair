package fr.uha.ensisa.alphapair.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import fr.uha.ensisa.alphapair.model.Subject;
import fr.uha.ensisa.alphapair.model.User;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, String> {

	@Query("Select s FROM Subject s WHERE s.promotionId = ?1")
	List<Subject> findSubjectsByPromotion(String id);
	
	@Transactional 
	@Modifying
	@Query("DELETE FROM Subject s WHERE s.promotionId = ?1")
	void deletePromotionSubjects(String id);
	
}
