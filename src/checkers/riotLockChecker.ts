import { BaseChecker } from "./base/baseChecker";
import { CheckerInterface } from "./base/checkerInterface";
import { CheckResult } from "../types";
import { Faction } from "runeterra";

export class RiotLockChecker extends BaseChecker implements CheckerInterface {
    championCardCodes: Array<string>;
    
    constructor(deckCodes: Array<string>, championCardCodes: Array<string>) {
        super(deckCodes);
        this.championCardCodes = championCardCodes;
    }

    check(): CheckResult {
        let championCards: Array<string> = [];
        let markedChampionCards: Array<string> = [];
        let markedFactions: Array<number> = [];
        let cards: object = {};
        let factions: Array<Array<Faction>> = [];
        let decksWithoutChampions = 0;

        this.decks.map(deck => {
            let champions: Array<string> = [];
            deck.cards.map(card => {
                if (cards[card.code] === undefined)
                    cards[card.code] = card;
                if (this.championCardCodes.includes(card.code) && !champions.includes(card.code))
                    champions.push(card.code);
            });
            let addedFactions: Array<number> = [];
            let thisDeckFactions: Array<Faction> = [];
            deck.factions.map(faction => {
                if (!addedFactions.includes(faction.id)) {
                    addedFactions.push(faction.id);
                    thisDeckFactions.push(faction);
                }
            });
            factions.map(factionsList => {
                let equalFactions: number = 0;
                for (let item of thisDeckFactions) {
                    factionsList.map(faction => {
                        if (item.id === faction.id)
                            equalFactions++;
                    });
                }
                if (equalFactions === factionsList.length) {
                    factionsList.map(markedFaction => {
                        if (!markedFactions.includes(markedFaction.id)) {
                            markedFactions.push(markedFaction.id);
                            this.markedFactions.push(markedFaction);
                        }
                    });
                }
            });
            factions.push(thisDeckFactions);
            champions.map(champion => {
                if (championCards.includes(champion)) {
                    if (!markedChampionCards.includes(champion)) {
                        markedChampionCards.push(champion);
                        this.markedCards.push(cards[champion]);
                    }
                }
                else {
                    championCards.push(champion);
                }
            });
            if(champions.length === 0)
                decksWithoutChampions++;
        });

        if (decksWithoutChampions > 1) {
            this.issues.push('There is more than one deck without champions');
        }

        let checkResult: CheckResult = {
            success: (this.issues.length === 0) && (this.markedCards.length === 0) 
                && (this.markedFactions.length === 0),
            decks: this.decks,
            markedCards: this.markedCards,
            markedFactions: this.markedFactions,
            issues: this.issues
        };
        return checkResult;
    }
}