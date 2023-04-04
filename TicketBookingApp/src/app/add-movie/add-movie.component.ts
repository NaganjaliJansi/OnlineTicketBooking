import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../Models/movie';
import { MovieService } from '../Services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  public movie:Movie = new Movie();
  public movieId:number;
  public actors:string;
  public title:string;
  public MovieForm:FormGroup;
  public img:any=File;
  constructor(private fb:FormBuilder, private movieService:MovieService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    
    this.MovieForm = this.fb.group({
      id:[{value:this.movieId,disabled:true},[Validators.required]],
      name:['',[Validators.required]],
      director:['',[Validators.required]],
      actors:['',[Validators.required,Validators.minLength(10)]],
      costForTicket:['',[Validators.required]],
      language:['',[Validators.required]],
      releasedDate:['',[Validators.required]],
      status:['',[Validators.required]],
      
    })
  }
  onSubmit(submitForm:FormGroup){
    // const data = {
    //   name:this.movie.name,
    //   director:this.movie.director,
    //   actors:this.movie.actors,
    //   costForTicket:this.movie.costForTicket,
    //   releasedDate:this.movie.releasedDate,
    //   imageUrl:this.image,
    //   id:this.movie.id,
    //   language:this.movie.language,
    //   status:this.movie.status
    // }
    this.convertToArray();
    const movie = submitForm.value;
    const formData = new FormData();
    formData.append('movie',movie);
    formData.append("file",this.img);
    this.movieService.addMovie(movie).subscribe((data)=>{
      console.log(data);
      alert("The Movie Saved successfully!!");
    })
  }
  upload(event:any){
    const file = event.target.files[0];
    console.log(file);
    this.img=file;
  }

  convertToArray(){
    this.movie.actors=this.actors.split(',');
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  alphabetsOnly(event: { which: any; keyCode: any; }) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z\,\.]/.test(inp)) {
      return true;
    } else {
      //event.preventDefault();
      return false;
    }
  }
}
