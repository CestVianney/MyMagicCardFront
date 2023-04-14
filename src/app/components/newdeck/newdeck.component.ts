import { Component } from '@angular/core';
import { CommanderApi } from 'src/app/interfaces/commander-api';
import { CardsService } from 'src/app/service/cards.service';

@Component({
  selector: 'app-newdeck',
  templateUrl: './newdeck.component.html',
  styleUrls: ['./newdeck.component.scss']
})
export class NewdeckComponent {

  constructor(private cardsService: CardsService){}
  
  listCartesApi: CommanderApi[] = [];
  commander = '';
  deck = '';

  submitDeck() {}

  findCommanders() {
    if(this.commander.length > 2) {
    this.listCartesApi = [];
    return this.cardsService.getCommandersBeginningWith(this.commander, 'Legendary').subscribe((data: CommanderApi[]) => {
      data.forEach(commanderApi => {
        if(this.listCartesApi.length < 10) {
        var newCarte: CommanderApi = {name: commanderApi.name, coloridentity: commanderApi.coloridentity};
        this.listCartesApi.push(newCarte);
        }
      })
    });
  } 
  return null;
  }

  selectionnerCommander(commander: string, color: string) {
    this.commander = commander;
  }
}
