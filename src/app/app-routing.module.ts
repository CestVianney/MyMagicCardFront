import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { DecklistComponent } from './components/decklist/decklist.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { DeckDetailComponent } from './deck-detail/deck-detail.component';
import { SignupComponent } from './components/signup/signup.component';
import { NewdeckComponent } from './components/newdeck/newdeck.component';
import { CanaccessGuard } from './guards/canaccess.guard';

const routes: Routes = [
  {path: 'decklist/:user', component: DecklistComponent},
  {path: 'login', component: LoginComponent},
  {path: 'decklist/detail/:id', component: DeckDetailComponent},
  {path: 'carte/:name', component: CardDetailComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', component: HomepageComponent},
  {path: 'newdeck', component: NewdeckComponent, canActivate:[CanaccessGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
