import { Card, Faction } from 'runeterra';

export type Deck = {
    cards: Card[];
    code: string;
    factions: Faction[];
};

export type CheckResult = {
    success: boolean;
    decks: Deck[];
    markedCards: Card[];
    markedFactions: Faction[];
    issues: string[];
};
