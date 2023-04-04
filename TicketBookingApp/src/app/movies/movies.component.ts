import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../Models/movie';
import { User } from '../Models/user';
import { MovieService } from '../Services/movie.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  public movies:Movie[]=[];
  public errorMessage:string="";
  public filteredData: Movie[];
  public searchText:string;
  public language:string="";
  public loggedUser:string;
  public user:User;
  public username:string;
  constructor(private movieService:MovieService,private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.getMovies(); 
    this.loggedUser = this.userService.getLoggedUser();
    this.userService.getByEmail(this.loggedUser).subscribe((data)=>{
     this.user = data;
     this.username = this.user.firstName;
   })
  }
  getMovies():any{
    this.movieService.getMovies().subscribe((data)=>{
     this.movies = data;
     this.filteredData = this.movies;
    })
  }

 performFilter(filterBy: string): Movie[] {
  if(filterBy == ""){
    this.filteredData = this.movies;
      return this.filteredData;
  }
  if (filterBy) {
      filterBy = filterBy.toLocaleLowerCase();
      this.filteredData = this.movies.filter((movie: Movie) =>
      movie.name?.toLocaleLowerCase().includes(filterBy.toLowerCase()));
      console.log(this.filteredData)
      return this.filteredData;
  } else {
    this.filteredData = this.movies;
      return this.filteredData;
  }
  console.log(this.filteredData)
      //return this.filteredData;

}
 onLanguageChange(value:string){
    this.language = value;
    if(this.language==''){ 
      this.getMovies();
    }
    else{
      this.movieService.getMoviesByLanguage(this.language).subscribe((data)=>{
        this.filteredData=data;
        console.log(data);
      }) 
    }  
 }
 getMovie(id:number){
    this.router.navigate(['/movie/',id]);
 }
}
