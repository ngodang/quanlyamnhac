package org.thuctap.quanlyamnhac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.thuctap.quanlyamnhac.model.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {

	Users findByUsername(String username);
	
}
