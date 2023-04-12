import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, take, Observable } from 'rxjs';
import { DeckFromUser } from '../interfaces/deck-from-user';
import { DeckListFromUserDb } from '../interfaces/deck-list-from-user';
import { JsonFromScryfall } from '../interfaces/json-from-scryfall';
import { DecklistService } from '../service/decklist.service';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.component.html',
  styleUrls: ['./deck-detail.component.css']
})
export class DeckDetailComponent implements OnInit {

  deck_id!: any;
  deck_detail!: DeckListFromUserDb;
  cards: DeckFromUser[] = [];
  userNameSearched: string = "";
  constructor(private actRoute: ActivatedRoute, private decklistService: DecklistService) {
    this.deck_id = this.actRoute.snapshot.params['id'];
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
          // card.img = 
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
      map((data) => data.image_uris.small)).subscribe((value) => {
        // ici, vous pouvez utiliser la valeur "value" comme vous le souhaitez
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