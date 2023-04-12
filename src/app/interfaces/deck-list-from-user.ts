import { DeckFromUser } from "./deck-from-user";

export interface DeckListFromUserDb {
    name: string;
    carteList: Array<DeckFromUser>;
  }