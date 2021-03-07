import { BaseChecker } from './base/baseChecker';
import { CheckerInterface } from './base/checkerInterface';
import { CheckResult } from '../types';

export class RegionLockChecker extends BaseChecker implements CheckerInterface {
    constructor(deckCodes: string[]) {
        super(deckCodes);
    }

    check(): CheckResult {
        this.clearData();
        let factions: number[] = [];
        let markedFactions: number[] = [];

        this.decks.map((deck) => {
            let tempFactions: number[] = [];
            let factionObjects: object = {};
            deck.factions.map((faction) => {
                if (!tempFactions.includes(faction.id)) {
                    tempFactions.push(faction.id);
                    factionObjects[faction.id] = faction;
                }
            });

            tempFactions.map((faction) => {
                if (factions.includes(faction)) {
                    if (!markedFactions.includes(faction)) {
                        markedFactions.push(faction);
                        this.markedFactions.push(factionObjects[faction]);
                    }
                } else {
                    factions.push(faction);
                }
            });
        });

        const checkResult: CheckResult = {
            success: this.markedFactions.length === 0,
            decks: this.decks,
            markedCards: this.markedCards,
            markedFactions: this.markedFactions,
            issues: this.issues,
        };
        return checkResult;
    }
}
