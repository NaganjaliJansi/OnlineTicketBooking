package com.simplilearn.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.simplilearn.entities.Movie;
@Repository
public interface MovieRepo extends JpaRepository<Movie,Integer>{
   Movie findByName(String name);
   Movie[] findByLanguage(String language);
}
