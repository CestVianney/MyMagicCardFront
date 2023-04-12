import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeckListFromUserDb } from '../interfaces/deck-list-from-user';
import { ScryfallApiResult } from '../deck-detail/deck-detail.component';

@Injectable({
  providedIn: 'root'
})
export class DecklistService {

  constructor(private http: HttpClient) { }

  getUserDecks(userName: string) {
    return this.http.get("http://localhost:8080/api/users/userDecks?username=" + userName);
  }

  getDetailDeck(id: string): Observable<DeckListFromUserDb> {
    return this.http.get("http://localhost:8080/api/decks/deck?deckId=" + id) as Observable<DeckListFromUserDb>;
  }

  getImageFromScryfall(name: string): Observable<ScryfallApiResult> {
    return this.http.get("https://api.scryfall.com/cards/named?exact="+name) as Observable<ScryfallApiResult>;
  }
}
