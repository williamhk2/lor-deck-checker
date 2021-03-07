# lor-deck-checker
Check lor decks, based on tournament rules.

This package is intended to be used in a lor deck checker web app (TBD).

### Deck Checkers 

Rule | Description | Singleton*
--- | --- | ---
CardLock | Every deck must have different cards from each other | TBD
CollectionLock | The amount of a card among the decks must be at most 3 (three) | Not Applicable
RegionLock | Every deck must have different regions from each other | TBD
RiotLock | Every deck must have different champions and different combination of regions from each other. Also, it is only allowed at most one deck without champions. | TBD

*A optional check for singleton decks (where the amount of a card must be at most 1 (one).

These rules are based on [@xTecna](https://github.com/xTecna/lor-deck-checker) deck checker tool. :purple_heart: