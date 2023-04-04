import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { BookNowComponent } from './book-now/book-now.component';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies/movies.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {path:"movies",component:MoviesComponent},
  {path:"movie/:id",component:MovieComponent },
  {path:"bookNow",component:BookNowComponent},
  {path:"users",component:UserListComponent},
  {path:"signUp",component:SignUpComponent},
  {path:"editUser/:id",component:SignUpComponent},
  {path:"login",component:LoginComponent},
  {path:"addMovie",component:AddMovieComponent},
  {path:"**",redirectTo:"movies",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
