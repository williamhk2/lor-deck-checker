import { Card, DeckEncoder, Faction } from 'runeterra';
import { Deck } from '../../types';

export class BaseChecker {
    decks: Deck[];
    markedCards: Card[];
    markedFactions: Faction[];
    issues: string[];

    constructor(deckCodes: string[]) {
        this.decks = [];
        this.markedCards = [];
        this.markedFactions = [];
        this.issues = [];

        deckCodes.map((deckCode) => {
            this.decks.push(this.getDeckFromCode(deckCode));
        });
    }

    getDeckFromCode(deckCode: string): Deck {
        const cards: Card[] = DeckEncoder.decode(deckCode);
        const factions: Faction[] = [];

        cards.map((card) => {
            if (!factions.includes(card.faction)) factions.push(card.faction);
        });
        return { cards, factions, code: deckCode };
    }

    clearData() {
        this.markedCards = [];
        this.markedFactions = [];
        this.issues = [];
    }
}
