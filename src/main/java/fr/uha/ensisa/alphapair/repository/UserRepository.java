package fr.uha.ensisa.alphapair.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import fr.uha.ensisa.alphapair.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	@Query("SELECT u FROM User u WHERE u.mail = ?1")
    List<User> findUserByMail(String mail);
	
	@Query("SELECT u FROM User u WHERE u.mail = ?1 AND u.password = ?2")
    List<User> findUserByCredentials(String mail, String password);
	
}