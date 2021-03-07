import { BaseChecker } from './base/baseChecker';
import { CheckerInterface } from './base/checkerInterface';
import { CheckResult } from '../types';

export class CollectionLockChecker
    extends BaseChecker
    implements CheckerInterface {
    constructor(deckCodes: string[]) {
        super(deckCodes);
    }

    check(): CheckResult {
        this.clearData();
        const CARD_LIMIT: number = 3;

        for (const [key, value] of Object.entries(this.cards)) {
            if (value.count > CARD_LIMIT) {
                this.markedCards.push(this.cards[key]);
            }
        }

        const checkResult: CheckResult = {
            success: this.markedCards.length === 0,
            decks: this.decks,
            markedCards: this.markedCards,
            markedFactions: this.markedFactions,
            issues: this.issues,
        };
        return checkResult;
    }
}
