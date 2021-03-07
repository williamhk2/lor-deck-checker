import { Card, Faction } from 'runeterra';
import { CheckResult, Deck } from '../../types';

export interface CheckerInterface {
    decks: Deck[];
    markedCards: Card[];
    markedFactions: Faction[];
    issues: string[];
    check(): CheckResult;
}
