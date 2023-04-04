package com.simplilearn.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.simplilearn.entities.User;
import com.simplilearn.repositories.UserRepo;

@Service
public class UserService {
	@Autowired
	public UserRepo repo;
	
	public User addUser(User u){
		return repo.save(u);
	}
	public List<User> getUsers(){
		return repo.findAll();
	}
	public User getUserById(int id) {
		if(repo.findById(id).isPresent()) {
			return repo.findById(id).get();
		}
		else {
			return null;
		}
	}
	public User updateUser(int id, User u) {
		if(repo.findById(id).isPresent()) {
			User user = repo.findById(id).get();
			user.setFirstName(u.getFirstName());
			user.setLastName(u.getLastName());
			user.setEmailId(u.getEmailId());
			user.setMobileNo(u.getMobileNo());
			user.setPassword(u.getPassword());
			return repo.save(u);
		}
		else {
			return null;
		}
	}
	public boolean deleteUser(int id) {
		if(repo.findById(id).isPresent()) {
			repo.deleteById(id);
			return true;
		}
		else {
			return false;
		}
	}
	
}
