import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { WeatherService } from './services/weather.service';
import { PlaceComponent } from './components/place/place.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { CardWeatherhourComponent } from './components/card-weatherhour/card-weatherhour.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PlaceComponent,
    TopMenuComponent,
    CardComponent,
    CardWeatherhourComponent,
    LoginComponent,
    FavoritosComponent
    ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
