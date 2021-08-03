import { NotFoundComponent } from './componets/not-found/not-found.component';
import { BlogEditComponent } from './componets/blog-components/blog-edit/blog-edit.component';
import { DashboardComponent } from './componets/dashboard/dashboard.component';
import { PhotoAlbumComponent } from './componets/photo-album/photo-album.component';
import { BlogComponent } from './componets/blog-components/blog/blog.component';
import { LoginComponent } from './componets/login/login.component';
import { HomeComponent } from './componets/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'blogs',component:BlogComponent},
  {path:'blogs/:id',component:BlogComponent},
  {path:'photo-album',component:PhotoAlbumComponent, canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'dashboard/:id',component:BlogEditComponent, canActivate:[AuthGuard]},
  {path:'not-found',component:NotFoundComponent},
  {path:'**',redirectTo:'/not-found'}
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
