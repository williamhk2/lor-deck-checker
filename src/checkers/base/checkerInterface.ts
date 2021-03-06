import { Card, Faction } from "runeterra";
import { CheckResult, Deck } from "../../types";

export interface CheckerInterface {
    decks: Array<Deck>;
    markedCards: Array<Card>;
    markedFactions: Array<Faction>;
    issues: Array<string>;
    check() : CheckResult;
}
