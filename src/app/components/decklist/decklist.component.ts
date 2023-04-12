import { Component, OnInit } from '@angular/core';
import { DeckListFromUserDb } from 'src/app/interfaces/deck-list-from-user';
import { DecklistService } from 'src/app/service/decklist.service';

@Component({
  selector: 'app-decklist',
  templateUrl: './decklist.component.html',
  styleUrls: ['./decklist.component.css']
})
export class DecklistComponent implements OnInit {

  userNameSearched: string = "";
  constructor(private decklistService: DecklistService) { }

  decklist: any;

  ngOnInit(): void {
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
