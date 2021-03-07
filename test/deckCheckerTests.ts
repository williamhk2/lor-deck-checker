import { CardLockChecker, CollectionLockChecker, RegionLockChecker, RiotLockChecker } from '../src/index';
import { expect } from 'chai';
import * as fs from 'fs';
import * as path from 'path';

const testData = JSON.parse(fs.readFileSync(path.resolve('test/deckCheckerTestData.json'), 'utf8'));

describe('CardLockChecker', () => {
    it('should check decks based on card lock rule', () => {
        const expectedMarkedCards = [ 
            { code: '04SH045', count: 3 },
            { code: '04SH059', count: 2 }
        ];
        const expectedMarkedFactions = [];
        const expectedIssues = [];
        const expectedSuccess = false;

        const checker = new CardLockChecker(testData['decks']['cardLockChecker'][0]);
        const result = checker.check();

        expect(expectedMarkedCards).to.deep.equal(result.markedCards);
        expect(expectedMarkedFactions).to.deep.equal(result.markedFactions);
        expect(expectedIssues).to.deep.equal(result.issues);
        expect(expectedSuccess).to.be.equal(result.success);
    });
});

describe('CollectionLockChecker', () => {
    it('should check decks based on collection lock rule', () => {
        const expectedMarkedCards = [ 
            { code: '04SH059', count: 2 },
            { code: '04SH045', count: 1 }
        ];
        const expectedMarkedFactions = [];
        const expectedIssues = [];
        const expectedSuccess = false;

        const checker = new CollectionLockChecker(testData['decks']['collectionLockChecker'][0]);
        const result = checker.check();

        expect(expectedMarkedCards).to.deep.equal(result.markedCards);
        expect(expectedMarkedFactions).to.deep.equal(result.markedFactions);
        expect(expectedIssues).to.deep.equal(result.issues);
        expect(expectedSuccess).to.be.equal(result.success);
    });
});

describe('RegionLockChecker', () => {
    it('should check decks based on region lock rule', () => {
        const expectedMarkedCards = [];
        const expectedMarkedFactions = [{ "id": 7, "shortCode": "SH" }];
        const expectedIssues = [];
        const expectedSuccess = false;

        const checker = new RegionLockChecker(testData['decks']['regionLockChecker'][0]);
        const result = checker.check();

        expect(expectedMarkedCards).to.deep.equal(result.markedCards);
        expect(expectedMarkedFactions).to.deep.equal(result.markedFactions);
        expect(expectedIssues).to.deep.equal(result.issues);
        expect(expectedSuccess).to.be.equal(result.success);
    });
});

describe('RiotLockChecker', () => {
    it('should check decks based on riot lock rule', () => {
        const expectedMarkedCards = [ 
            { code: '04FR005', count: 3 },
            { code: '03FR006', count: 3 }
        ];
        const expectedMarkedFactions = [
            { "id": 5, "shortCode": "SI" },
            { "id": 1, "shortCode": "FR" }
        ];
        const expectedIssues = [];
        const expectedSuccess = false;

        const checker = new RiotLockChecker(testData['decks']['riotLockChecker'][0], testData['championCardCodes']);
        const result = checker.check();

        expect(expectedMarkedCards).to.deep.equal(result.markedCards);
        expect(expectedMarkedFactions).to.deep.equal(result.markedFactions);
        expect(expectedIssues).to.deep.equal(result.issues);
        expect(expectedSuccess).to.be.equal(result.success);
    });
});