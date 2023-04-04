import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../Models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public Amount:number;
  public tickets:number[];
  public movie:Movie;
  constructor(private http:HttpClient) { }
  getMovies(){
    return this.http.get<Movie[]>("http://localhost:8080/getMovies");
  }
  addMovie(movie:Movie):Observable<any>{
    return this.http.post<Movie>("http://localhost:8080/addMovie",movie);
  }
  deleteMovie(id:number){
    return this.http.delete<Movie>("http://localhost:8080/delete/"+id);
  }
  updateMovie(id:number,movie:Movie){
    return this.http.put<Movie>("http://localhost:8080/update/"+id,movie);
  }
  getMovie(id:number){
    return this.http.get<Movie>("http://localhost:8080/getMovie/"+id);
  }
  getMovieByName(name:string){
    return this.http.get<Movie>("http://localhost:8080/getMovieByName/"+name);
  }
  getMoviesByLanguage(language:string){
    return this.http.get<Movie[]>("http://localhost:8080/getMovieByLanguage/"+language);
  }
  setAmount(amount:number){
    this.Amount = amount;
  }
  getAmount(){
    return this.Amount;
  }
  setMovie(movie:Movie){
    this.movie=movie;
  }
  getSelectedMovie(){
    return this.movie;
  }
  setTickets(tickets:number[]){
    this.tickets=tickets;
  }
  getTickets(){
    return this.tickets;
  }

}


