import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaceComponent } from './components/place/place.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: 'main', component: MainComponent},
  { path: 'place/:name', component: PlaceComponent },
  { path: 'login', component: LoginComponent},
  { path: 'favoritos', component: FavoritosComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
