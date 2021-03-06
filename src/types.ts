import { Card, Faction } from "runeterra";

export type Deck = {
    cards: Array<Card>;
    code: string;
    factions: Array<Faction>;
};

export type CheckResult = {
    success: boolean;
    decks: Array<Deck>;
    markedCards: Array<Card>;
    markedFactions: Array<Faction>;
    issues: Array<string>;
};