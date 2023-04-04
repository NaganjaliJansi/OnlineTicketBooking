package com.simplilearn.entities;


import java.util.Date;

import javax.persistence.*;

@Entity
public class Movie {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int id;
	public String name;
	public String imageUrl;
	public int costForTicket;
	public String actors[];
	public String director;
	public Date releasedDate;
	public String language;
	public boolean status;

	public Movie() {}

	public Movie(int id, String name, String imageUrl, int costForTicket, String[] actors, String director,
			Date releasedDate,String Language, boolean status) {
		super();
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.costForTicket = costForTicket;
		this.actors = actors;
		this.director = director;
		this.releasedDate = releasedDate;
		this.language = Language;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public int getCostForTicket() {
		return costForTicket;
	}

	public void setCostForTicket(int costForTicket) {
		this.costForTicket = costForTicket;
	}

	public String[] getActors() {
		return actors;
	}

	public void setActors(String[] actors) {
		this.actors = actors;
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public Date getReleasedDate() {
		return releasedDate;
	}

	public void setReleasedDate(Date releasedDate) {
		this.releasedDate = releasedDate;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
	
}
