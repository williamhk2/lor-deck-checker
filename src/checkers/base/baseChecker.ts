import { Card, DeckEncoder, Faction } from 'runeterra';
import { Deck } from '../../types';

export class BaseChecker {
    decks: Deck[];
    markedCards: Card[];
    markedFactions: Faction[];
    issues: string[];
    cards: object;

    constructor(deckCodes: string[]) {
        this.decks = [];
        this.markedCards = [];
        this.markedFactions = [];
        this.issues = [];
        this.cards = {};

        deckCodes.map((deckCode) => {
            this.decks.push(this.getDeckFromCode(deckCode));
        });
    }

    getDeckFromCode(deckCode: string): Deck {
        const deckCards: Card[] = DeckEncoder.decode(deckCode);
        const factions: Faction[] = [];

        deckCards.map((card) => {
            if (!factions.includes(card.faction)) factions.push(card.faction);
            if (this.cards[card.code] === undefined)
                this.cards[card.code] = card;
            else this.cards[card.code].count += card.count;
        });
        return { cards: deckCards, factions, code: deckCode };
    }

    clearData() {
        this.markedCards = [];
        this.markedFactions = [];
        this.issues = [];
    }
}
