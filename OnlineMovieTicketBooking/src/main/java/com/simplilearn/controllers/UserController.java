package com.simplilearn.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.simplilearn.entities.User;
import com.simplilearn.repositories.UserRepo;
import com.simplilearn.services.UserService;
@CrossOrigin(origins="http://localhost:4200")
@RestController
public class UserController {
	
	@Autowired
	public UserService service;
	@Autowired
	public UserRepo repo;
	
	@PostMapping("/addUser")
	public ResponseEntity<User> addUser(@RequestBody User u){
		User user = service.addUser(u);
		if(user!=null) {
			return new ResponseEntity<User>(user,HttpStatus.CREATED);
		}else {
			return new ResponseEntity<User>(user,HttpStatus.INTERNAL_SERVER_ERROR);
		}
			
	}
	
	@GetMapping("/users")
	public List<User> getUsers(){
		return service.getUsers();
	}
	
	@PutMapping("/updateUser/{id}")
	public User updateUser(@PathVariable int id, @RequestBody User u){
		User user = service.updateUser(id, u);
		return user;
	}
	@GetMapping("/user/{id}")
	public ResponseEntity<User> getUserById(@PathVariable int id){
		User user = service.getUserById(id);
		if(user!=null) {
			return new ResponseEntity<User>(user,HttpStatus.CREATED);
		}else {
			return new ResponseEntity<User>(user,HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/deleteUser/{id}")
	public Boolean deleteUser(@PathVariable int id){
		boolean result = service.deleteUser(id);
		return result;
		
	}
	@SuppressWarnings("unchecked")
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody User u) {
		int id = repo.findByemailId(u.emailId).getId();
		User user = service.getUserById(id);
		if(user!=null) {
			if(user.getPassword().equals(u.getPassword())) {
				return ResponseEntity.ok(user);
			}
			else {
				System.out.println("error is "+ (ResponseEntity<?>)ResponseEntity.internalServerError());
				return (ResponseEntity<User>)ResponseEntity.internalServerError();
			}
		}
		else {
			return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
		}
		
	}
	@GetMapping("/getUser/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable String email){
		User user = repo.findByemailId(email);
		if(user!=null) {
			return new ResponseEntity<User>(user,HttpStatus.CREATED);
		}else {
			return new ResponseEntity<User>(user,HttpStatus.NOT_FOUND);
		}
	}
	
}
