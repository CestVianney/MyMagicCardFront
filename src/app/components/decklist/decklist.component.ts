import { Component, OnInit } from '@angular/core';
import { Observable, map, take } from 'rxjs';
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
        this.decklist = data;
      });
  }

  getArtFromCurrentDeck(commander: string): Observable<string> {
    return this.decklistService.getImageFromScryfall(commander).pipe(
      take(1),
      map((data) => data.image_uris.art_crop)
    );
  }
}
