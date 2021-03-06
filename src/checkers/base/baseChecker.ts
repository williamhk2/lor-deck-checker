import { Card, DeckEncoder, Faction } from 'runeterra';
import { Deck } from '../../types';

export class BaseChecker {
    decks: Array<Deck>;
    markedCards: Array<Card>;
    markedFactions: Array<Faction>;
    issues: Array<string>;

    constructor(deckCodes: Array<string>) {
        this.decks = [];
        this.markedCards = [];
        this.markedFactions = [];
        this.issues = [];
        
        deckCodes.map((deckCode) => {
            this.decks.push(this.getDeckFromCode(deckCode));
        });
    }

    getDeckFromCode(deckCode: string): Deck {
        let cards: Card[] = DeckEncoder.decode(deckCode);
        let factions: Array<Faction> = [];

        cards.map((card) => {
            if (!factions.includes(card.faction))
                factions.push(card.faction);
        });
        return { cards, factions, code: deckCode };
    }
}
