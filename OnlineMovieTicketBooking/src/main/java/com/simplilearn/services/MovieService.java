package com.simplilearn.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.simplilearn.entities.Movie;
import com.simplilearn.repositories.MovieRepo;

@Service
public class MovieService {
	@Autowired
	public MovieRepo repo;
	
	public Movie addMovie(Movie m) {
		return repo.save(m);
	}
	
	public List<Movie> getMovies() {
		return repo.findAll();
	}
	public Movie getMovieById(int id) {
		if(repo.findById(id).isPresent()) {
			return repo.findById(id).get();
		}
		else {
			return null;
		}
	}
	public boolean deleteMovie(int id) {
		
		if(repo.findById(id).isPresent()) {
			repo.deleteById(id);
			return true;
		}
		else {
			return false;
		}
	}
	public Movie updateMovie(int id, Movie m) {
		if(repo.findById(id).isPresent()) {
			Movie movie = repo.findById(id).get();
			movie.setName(m.getName());
			movie.setImageUrl(m.getImageUrl());
			movie.setActors(m.getActors());
			movie.setCostForTicket(m.getCostForTicket());
			movie.setDirector(m.getDirector());
			movie.setLanguage(m.getLanguage());
			movie.setReleasedDate(m.getReleasedDate());
			movie.setStatus(m.status);
			return repo.save(m);
		}
		else {
			return null;
		}
	}
}
