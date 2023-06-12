import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { DeckFromUser } from '../interfaces/deck-from-user';
import { DeckListFromUserDb } from '../interfaces/deck-list-from-user';
import { DecklistService } from '../service/decklist.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.scss']
})
export class DeckDetailComponent implements OnInit {

  deck_id!: any;
  deck_detail!: DeckListFromUserDb;
  cards: DeckFromUser[] = [];
  userNameSearched: string = "";
  actualUser: string = "";
  constructor(private actRoute: ActivatedRoute, private decklistService: DecklistService, private tokenService: TokenService) {
    this.deck_id = this.actRoute.snapshot.params['id'];
    this.tokenService.checkActualUser().subscribe(response => this.actualUser = response);
   }


  ngOnInit(): void {
    this.actRoute.paramMap.subscribe((params) => {
      this.deck_id = params.get('id')!;
    });
    this.getDetailDeck();
  }

  getDetailDeck() {
    this.decklistService.getDetailDeck(this.deck_id).subscribe(
      data => {
        this.deck_detail = data;
        this.deck_detail.carteList.forEach(cardDb => {
          let card: DeckFromUser = {id: 0, name: "", img: ""};
          card.id = cardDb.id;
          card.name = cardDb.name;
          this.getImageFromScryfall(cardDb.name, card);
          this.cards.push(card);
        })
        console.log(this.cards);
      }
    );
  }

  getImageFromScryfall(name: string, card: DeckFromUser) {
    return this.decklistService.getImageFromScryfall(name).pipe(
      take(1),
      map((data) => data.image_uris.normal)).subscribe((value) => {
        card.img = value;
      });
  }



  log(){
    console.log(this.cards);
  }

}
export interface ScryfallApiResult {
    image_uris: ImageUrisScryfallResult;
}

export interface ImageUrisScryfallResult {
  small: string,
  normal: string,
  large: string,
  png: string,
  art_crop: string,
  border_crop: string
}