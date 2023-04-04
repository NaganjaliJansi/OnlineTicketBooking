package com.simplilearn.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.simplilearn.entities.User;

public interface UserRepo extends JpaRepository<User,Integer>{
	User findByemailId(String emailId);
}
