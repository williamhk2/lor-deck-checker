import { BaseChecker } from './base/baseChecker';
import { CheckerInterface } from './base/checkerInterface';
import { CheckResult, Deck } from '../types';
import { Faction } from 'runeterra';

export class RiotLockChecker extends BaseChecker implements CheckerInterface {
    championCardCodes: string[];
    factionsPerDeck: Faction[][];
    tempMarkedFactions: number[];
    tempChampionCards: string[];
    tempMarkedChampionCards: string[];
    decksWithoutChampions: number;

    constructor(deckCodes: string[], championCardCodes: string[]) {
        super(deckCodes);
        this.championCardCodes = championCardCodes;
        this.factionsPerDeck = [];
        this.tempMarkedFactions = [];
        this.tempChampionCards = [];
        this.tempMarkedChampionCards = [];
        this.decksWithoutChampions = 0;
    }

    check(): CheckResult {
        this.clearData();
        this.decks.map((deck) => {
            this.checkChampionCards(deck);
            this.checkFactions(deck.factions);
        });

        if (this.decksWithoutChampions > 1) {
            this.issues.push('There is more than one deck without champions');
        }

        const checkResult: CheckResult = {
            success:
                this.issues.length === 0 &&
                this.markedCards.length === 0 &&
                this.markedFactions.length === 0,
            decks: this.decks,
            markedCards: this.markedCards,
            markedFactions: this.markedFactions,
            issues: this.issues,
        };
        return checkResult;
    }

    checkChampionCards(deck: Deck) {
        let cards: object = {};
        let hasChampions: boolean = false;

        deck.cards.map((card) => {
            if (cards[card.code] === undefined) cards[card.code] = card;
            if (this.championCardCodes.includes(card.code)) {
                hasChampions = true;
                if (this.tempChampionCards.includes(card.code)) {
                    if (!this.tempMarkedChampionCards.includes(card.code)) {
                        this.tempMarkedChampionCards.push(card.code);
                        this.markedCards.push(cards[card.code]);
                    }
                } else {
                    this.tempChampionCards.push(card.code);
                }
            }
        });

        if (!hasChampions) this.decksWithoutChampions++;
    }

    checkFactions(deckFactions: Faction[]): void {
        let tempFactions: number[] = [];
        let distinctDeckFactions: Faction[] = [];

        deckFactions.map((faction) => {
            if (!tempFactions.includes(faction.id)) {
                tempFactions.push(faction.id);
                distinctDeckFactions.push(faction);
            }
        });

        this.factionsPerDeck.map((factions) => {
            let equalFactions: number = 0;
            for (const item of distinctDeckFactions) {
                factions.map((faction) => {
                    if (item.id === faction.id) equalFactions++;
                });
            }
            if (equalFactions === factions.length) {
                factions.map((markedFaction) => {
                    if (!this.tempMarkedFactions.includes(markedFaction.id)) {
                        this.tempMarkedFactions.push(markedFaction.id);
                        this.markedFactions.push(markedFaction);
                    }
                });
            }
        });
        this.factionsPerDeck.push(distinctDeckFactions);
    }
}
