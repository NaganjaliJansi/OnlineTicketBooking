package com.simplilearn.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.simplilearn.entities.Movie;
import com.simplilearn.repositories.MovieRepo;
import com.simplilearn.services.MovieService;
@CrossOrigin(origins="http://localhost:4200")
@RestController
public class MovieController {
	
	@Autowired
	public MovieService service;
	@Autowired
	public MovieRepo repo;
	
	@PostMapping("/addMovie")
	public ResponseEntity<Movie> addMovie(@RequestBody Movie movie){
		Movie m = service.addMovie(movie);
		if(m!=null) {
			return new ResponseEntity<Movie>(movie,HttpStatus.CREATED);
		}
		return new ResponseEntity<Movie>(movie,HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/getMovies")
	public List<Movie> getMovies(){
		return service.getMovies();
	}
	
	@GetMapping("/getMovie/{id}")
	public ResponseEntity<Movie> getMovieById(@PathVariable int id) {
		Movie movie = service.getMovieById(id);
		if(movie!=null) 
			return new ResponseEntity<Movie>(movie,HttpStatus.CREATED);
		else
			return new ResponseEntity<Movie>(movie,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PutMapping("/update/{id}")
	public Movie update(@PathVariable int id, @RequestBody Movie movie) {
		Movie m = service.updateMovie(id,movie);
		return m;
		
	}
	
	@DeleteMapping("/delete/{id}")
	public Boolean delete(@PathVariable int id) {
		Movie movie = service.getMovieById(id);
		if(movie!=null)
			return service.deleteMovie(id);
		else
			return null;
	}
	
	@GetMapping("/getMovieByName/{name}")
	public ResponseEntity<Movie> getMovieByName(@PathVariable String name){
		Movie movie = repo.findByName(name);
		if(movie!=null) {
			return new ResponseEntity<Movie>(movie,HttpStatus.CREATED);
		}else {
			return new ResponseEntity<Movie>(movie,HttpStatus.NOT_FOUND);
		}
	}
	@GetMapping("/getMovieByLanguage/{language}")
	public Movie[] getMovieByLanguage(@PathVariable String language){
		return repo.findByLanguage(language);
	}
}
