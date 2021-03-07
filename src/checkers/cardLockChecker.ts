import { BaseChecker } from './base/baseChecker';
import { CheckerInterface } from './base/checkerInterface';
import { CheckResult } from '../types';

export class CardLockChecker extends BaseChecker implements CheckerInterface {
    constructor(deckCodes: string[]) {
        super(deckCodes);
    }

    check(): CheckResult {
        this.clearData();
        let deckCards: string[] = [];
        let markedCards: string[] = [];

        this.decks.map((deck) =>
            deck.cards.map((card) => {
                if (deckCards.includes(card.code)) {
                    if (!markedCards.includes(card.code)) {
                        markedCards.push(card.code);
                        this.markedCards.push(this.cards[card.code]);
                    }
                } else {
                    deckCards.push(card.code);
                }
            }),
        );

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
