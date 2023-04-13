import { Component, OnInit } from '@angular/core';
import { DeckListFromUserDb } from 'src/app/interfaces/deck-list-from-user';
import { DecklistService } from 'src/app/service/decklist.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-decklist',
  templateUrl: './decklist.component.html',
  styleUrls: ['./decklist.component.scss']
})
export class DecklistComponent implements OnInit {

  userNameSearched: string = '';
  constructor(private decklistService: DecklistService, private tokenService: TokenService) { }
  decklist: any;

  ngOnInit(): void {
    this.tokenService.checkActualUser().subscribe(response => this.userNameSearched = response);
    if(this.userNameSearched != '') {
      this.findDecksFromUser();
    }
  }

  findDecksFromUser() {
    this.decklistService.getUserDecks(this.userNameSearched).subscribe(
      data => {
        console.log(data);
        this.decklist = data;
        console.log("erreur ici");
      });
  }
}
