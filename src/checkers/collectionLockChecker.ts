import { BaseChecker } from "./base/baseChecker";
import { CheckerInterface } from "./base/checkerInterface";
import { CheckResult } from "../types";

export class CollectionLockChecker extends BaseChecker implements CheckerInterface {

    constructor(deckCodes: Array<string>) {
        super(deckCodes);
    }

    check(): CheckResult {
        const CARD_LIMIT: number = 3;
        let cardsCount: object = {};
        let cards: object = {};

        this.decks.map(deck => deck.cards.map(card => {
            if (cardsCount[card.code] === undefined) {
                cardsCount[card.code] = card.count;
                cards[card.code] = card;
            }
            else {
                cardsCount[card.code] += card.count;
            }
        }));

        for (const [key, value] of Object.entries(cardsCount)) {
            if (value > CARD_LIMIT) 
                this.markedCards.push(cards[key]);
        }

        let checkResult: CheckResult = {
            success: this.markedCards.length == 0,
            decks: this.decks,
            markedCards: this.markedCards,
            markedFactions: this.markedFactions,
            issues: this.issues
        };
        return checkResult;
    }
}