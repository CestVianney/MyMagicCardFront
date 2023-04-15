import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, of, startWith, switchMap, take } from 'rxjs';
import { CommanderApi } from 'src/app/interfaces/commander-api';
import { CardsService } from 'src/app/service/cards.service';
import { DecklistService } from 'src/app/service/decklist.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-newdeck',
  templateUrl: './newdeck.component.html',
  styleUrls: ['./newdeck.component.scss']
})
export class NewdeckComponent {

  filteredSuggestions!: Observable<CommanderApi[]>;
  myControl = new FormControl();

  constructor(private cardsService: CardsService, private decklistService: DecklistService, private tokenService: TokenService){
    this.tokenService.checkActualUser().subscribe(user => this.actualUser = user);
    this.filteredSuggestions = this.myControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        if (value.length > 2) {
          return this.cardsService.getCommandersBeginningWith(value, 'Legendary').pipe(
            map((data: any) => {
              const commanders: CommanderApi[] = [];
              data.forEach((commanderApi: any) => {
                if (commanders.length < 10) {
                  const newCommander: CommanderApi = { name: commanderApi.name, coloridentity: commanderApi.coloridentity };
                  commanders.push(newCommander);
                }
              });
              return commanders;
            })
          );
        } else {
          return of([]);
        }
      })
    );
  }
  actualUser = '';
  selectedCard = '';
    commander = '';
  deck = '';
  commanderApi: CommanderApi = {name:'', coloridentity:''};

  submitDeck() {
    this.decklistService.createDeck(this.actualUser, this.deck, this.commanderApi.name, this.commanderApi.coloridentity).subscribe((response) => console.log(response));
  }

  findCommanders() {
    console.log("Ca change == " + this.filteredSuggestions.subscribe(value => value.length));
    if(this.myControl != null && this.myControl.value.length > 2) {
    return this.cardsService.getCommandersBeginningWith(this.commander, 'Legendary').pipe(
      map((data: any) => {
        const commander: CommanderApi = {name: data.name, coloridentity: data.coloridentity};
        return commander;
      }
      )
    );
  } 
  return of();
  }

  setHoveredCommander(commander:CommanderApi){
    this.setColors();
    return this.decklistService.getImageFromScryfall(commander.name).pipe(
      take(1),
      map((data) => data.image_uris.normal)).subscribe((value) => {
        this.commanderApi = commander;
        this.selectedCard = value;
      });
  } 

  setColors(){
    var colors = [''];
    if(this.commanderApi.coloridentity != null) {
    colors = this.commanderApi.coloridentity.split('');
    }
    this.setBlue(colors.includes('U'));
    this.setWhite(colors.includes('W'));
    this.setRed(colors.includes('R'));
    this.setBlack(colors.includes('B'));
    this.setGreen(colors.includes('G'));
    
  }

  setBlue(isBlue: boolean) {
    var ile = document.getElementById('ile');
    if(null != ile) {
    ile.style.filter = isBlue ? "brightness(100%)" : "brightness(20%)"
    }
  }
  setBlack(isBlack: boolean) {
    var marais = document.getElementById('marais');
    if(null != marais) {
    marais.style.filter = isBlack ? "brightness(100%)" : "brightness(20%)"
    }
  }
  setGreen(isGreen: boolean) {
    var foret = document.getElementById('foret');
    if(null != foret) {
    foret.style.filter = isGreen ? "brightness(100%)" : "brightness(20%)"
    }
  }
  setRed(isRed: boolean) {
    var montagne = document.getElementById('montagne');
    if(null != montagne) {
    montagne.style.filter = isRed ? "brightness(100%)" : "brightness(20%)"
    }
  }
  setWhite(isWhite: boolean) {
    var plaine = document.getElementById('plaine');
    if(null != plaine) {
      plaine.style.filter = isWhite ? "brightness(100%)" : "brightness(20%)"
    }
  }
}
