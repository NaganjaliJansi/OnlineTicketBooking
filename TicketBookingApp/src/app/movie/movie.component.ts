import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../Models/movie';
import { User } from '../Models/user';
import { MovieService } from '../Services/movie.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public id:number;
  public movie:Movie;
  public loggedUser:string;
  public user:User;
  public username:string;
  public noOfTickets:number;
  public Amount!:number;
  public popup = false;
  public paymentForm!:FormGroup;
  public tickets:number[]=[];
  constructor(private movieService:MovieService,private fb:FormBuilder, private userService:UserService, private route:ActivatedRoute, private router:Router) { }

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
      this.id=this.route.snapshot.params['id']
      console.log(this.id);
      this.movieService.getMovie(this.id).subscribe((data)=>{
        this.movie=data;
        console.log(this.movie);
        this.Amount = this.movie.costForTicket;
        this.noOfTickets = 1;
      })
      this.paymentForm = this.fb.group({
        emailId: ['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        cardNumber: [' ',[Validators.required]]
      })
    }
  }
  back(){
    this.router.navigate(['/movies']);
  }
  payNow(){
    this.movieService.setAmount(this.Amount);
    this.movieService.setMovie(this.movie);
    this.movieService.setTickets(this.tickets);
    this.router.navigate(["/bookNow"]);
    let ticket = this.getRandomIntInclusive(0,99);
    this.tickets.push(ticket);
    for(var i=1;i<this.noOfTickets;i++){
      ticket = ticket+1;
      this.tickets.push(ticket);
      console.log(this.tickets);
    }
    alert("Payment of Rs."+this.Amount+" has been done!");
  }
  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  getRandomIntInclusive(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
  decreaseValue(){
    if(this.noOfTickets>1){
      this.noOfTickets--;
      this.Amount = this.movie.costForTicket * this.noOfTickets;
    }
    else{
      this.noOfTickets=0;
      this.Amount = this.movie.costForTicket * this.noOfTickets;
    }
  } 
  increaseValue(){
    this.noOfTickets++;
    console.log(this.noOfTickets);
    this.Amount = this.movie.costForTicket * this.noOfTickets;
  }
} 
