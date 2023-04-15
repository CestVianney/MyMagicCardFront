import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, of, startWith, switchMap } from 'rxjs';
import { CommanderApi } from 'src/app/interfaces/commander-api';
import { CardsService } from 'src/app/service/cards.service';

@Component({
  selector: 'app-newdeck',
  templateUrl: './newdeck.component.html',
  styleUrls: ['./newdeck.component.scss']
})
export class NewdeckComponent {

  filteredSuggestions!: Observable<CommanderApi[]>;
  myControl = new FormControl();

  constructor(private cardsService: CardsService){
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

    commander = '';
  deck = '';

  submitDeck() {}

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

  selectionnerCommander(commander: string, color: string) {
    this.commander = commander;
  }
}
