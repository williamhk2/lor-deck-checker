# lor-deck-checker
Check lor decks, based on tournament rules.

This package is intended to be used in a lor deck checker web app (TBD).

### Deck Check Rules 

Rule | Description | Singleton*
--- | --- | ---
CardLock | Every deck must have different cards from each other | TBD
CollectionLock | The amount of a card among the decks must be at most 3 (three) | Not Applicable
RegionLock | Every deck must have different regions from each other | TBD
RiotLock | Every deck must have different champions and different combination of regions from each other. Also, it is only allowed at most one deck without champions | TBD

> *A optional check for singleton decks (where the amount of a card must be at most 1 (one).

These rules are based on [@xTecna](https://github.com/xTecna/lor-deck-checker) deck checker tool. The deck decoder are from [runeterra](https://github.com/SwitchbladeBot/runeterra) project. :purple_heart:

### Usage

You can check a deck, using the example code above.

```javascript
const checks = require('lor-deck-checker');

// Supports one or more decks
let cardLock = new checks.CardLockChecker([
    "CECAEAIFDUUACBABAUAQCAIMAEBQCBQDAMAQCAYUGIAQIAIOAYAQKAIPCQMSCLAEAEBQCAQCAECRGNQBAQAQMAIBAEVA",
    "CEBAOAYJJFKGBWAB3EA5WAO5AEAQIBYNAIBQGCINENLAGBAHAQ5USAQBAQDS2AYDBEEVKZA",
    "CECAKBAHCQWTAN25AMAQGCY7G4AQEAYFAMCAGAQEB4BACBAHHMAQCAZYAA"
]);

console.log(cardLock.check());
```

> In case of RiotLock deck checker, you also will need to pass the list of champion card codes, to validate champion cards. You can use the list of cards included in test folder.

Example return from the deck check:

- `decks`: all decks with factions and cards (object definitions from [runeterra](https://github.com/SwitchbladeBot/runeterra)).
- `markedCards`: cards with issues, according to current check rules. `count` are the total of cards in all decks.
- `markedFactions`: cards with issues, according to current check rules.
- `issues`: used to show messages about issues with deck. i.e., "There is more than one deck without champions" (RiotLock).

```
{ 
  success: false,
  decks: [ 
      { 
        cards: [Array], 
        factions: [Array],
        code: 'CECAEAIFDUUACBABAUAQCAIMAEBQCBQDAMAQCAYUGIAQIAIOAYAQKAIPCQMSCLAEAEBQCAQCAECRGNQBAQAQMAIBAEVA' },
     { 
        cards: [Array],
        factions: [Array],
        code: 'CEBAOAYJJFKGBWAB3EA5WAO5AEAQIBYNAIBQGCINENLAGBAHAQ5USAQBAQDS2AYDBEEVKZA' },
     { 
        cards: [Array],
        factions: [Array],
        code: 'CECAKBAHCQWTAN25AMAQGCY7G4AQEAYFAMCAGAQEB4BACBAHHMAQCAZYAA' } 
  ],
  markedCards: [ 
     { code: '04SH045', count: 4 },
     { code: '04SH059', count: 4 } 
  ],
  markedFactions: [],
  issues: [] 
}
```
