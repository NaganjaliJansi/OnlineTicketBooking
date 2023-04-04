import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../Models/movie';
import { User } from '../Models/user';
import { MovieService } from '../Services/movie.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css']
})
export class BookNowComponent implements OnInit {
  public tickets:number[];
  public movie:Movie;
  public loggedUser:string;
  public user:User;
  public username:string;
  constructor(private movieService:MovieService, private router:Router, private userService:UserService) { }

  ngOnInit(): void {
  this.loggedUser = this.userService.getLoggedUser();
    this.userService.getByEmail(this.loggedUser).subscribe((data)=>{
     this.user = data;
     this.username = this.user.firstName;
   })
    if(!this.loggedUser || this.loggedUser==''){
     this.router.navigate(['/login']);
    }
    else{
    this.movie = this.movieService.getSelectedMovie();
    this.tickets = this.movieService.getTickets();
    console.log(this.movie);
    console.log( this.tickets)

  }
}
backToHome(){
  this.router.navigate(['/movies']);
}
}
