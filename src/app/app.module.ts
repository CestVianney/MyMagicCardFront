import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DecklistComponent } from './components/decklist/decklist.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DecklistComponent,
    CardDetailComponent,
    HomepageComponent,
    LoginComponent,
    DeckDetailComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
