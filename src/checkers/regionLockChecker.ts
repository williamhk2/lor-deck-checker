import { BaseChecker } from './base/baseChecker';
import { CheckerInterface } from './base/checkerInterface';
import { CheckResult } from '../types';

export class RegionLockChecker extends BaseChecker implements CheckerInterface {
    constructor(deckCodes: string[]) {
        super(deckCodes);
    }

    check(): CheckResult {
        const factions: number[] = [];
        const markedFactions: number[] = [];

        this.decks.map((deck) =>
            deck.factions.map((faction) => {
                if (factions.includes(faction.id)) {
                    if (!markedFactions.includes(faction.id)) {
                        markedFactions.push(faction.id);
                        this.markedFactions.push(faction);
                    }
                } else {
                    factions.push(faction.id);
                }
            }),
        );

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
