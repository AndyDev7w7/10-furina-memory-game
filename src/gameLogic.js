export const DEFAULT_SYMBOLS = ["AI", "FX", "LY", "NK", "RW", "VX", "QZ", "OR"];

export function shuffle(items, random = Math.random) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

export function createDeck(symbols = DEFAULT_SYMBOLS, random = Math.random) {
  return shuffle([...symbols, ...symbols], random).map((symbol, index) => ({
    id: `${symbol}-${index}`,
    symbol,
    flipped: false,
    matched: false,
  }));
}

export function checkMatch(first, second) {
  return Boolean(first && second && first.id !== second.id && first.symbol === second.symbol);
}

export function isVictory(deck) {
  return deck.every((card) => card.matched);
}
