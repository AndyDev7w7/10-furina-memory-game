(function () {
  const DEFAULT_SYMBOLS = ["AI", "FX", "LY", "NK", "RW", "VX", "QZ", "OR"];

  function shuffle(items, random = Math.random) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  }

  function createDeck(symbols = DEFAULT_SYMBOLS, random = Math.random) {
    return shuffle([...symbols, ...symbols], random).map((symbol, index) => ({
      id: `${symbol}-${index}`,
      symbol,
      flipped: false,
      matched: false,
    }));
  }

  function checkMatch(first, second) {
    return Boolean(first && second && first.id !== second.id && first.symbol === second.symbol);
  }

  function isVictory(deck) {
    return deck.every((card) => card.matched);
  }

  const board = document.querySelector("#board");
  const movesLabel = document.querySelector("#moves");
  const matchesLabel = document.querySelector("#matches");
  const restart = document.querySelector("#restart");
  const status = document.querySelector("#status");

  let deck = [];
  let selected = [];
  let lockBoard = false;
  let moves = 0;
  let matches = 0;

  function render() {
    board.innerHTML = "";
    deck.forEach((card) => {
      const button = document.createElement("button");
      button.className = `card ${card.flipped || card.matched ? "revealed" : ""}`;
      button.textContent = card.flipped || card.matched ? card.symbol : "";
      button.setAttribute("aria-label", card.flipped ? `Card ${card.symbol}` : "Hidden card");
      button.addEventListener("click", () => flip(card.id));
      board.append(button);
    });
    movesLabel.textContent = moves;
    matchesLabel.textContent = matches;
  }

  function flip(id) {
    if (lockBoard) return;
    const card = deck.find((item) => item.id === id);
    if (!card || card.flipped || card.matched) return;
    card.flipped = true;
    selected.push(card);
    if (selected.length === 2) resolveTurn();
    render();
  }

  function resolveTurn() {
    moves += 1;
    const [first, second] = selected;
    if (checkMatch(first, second)) {
      first.matched = true;
      second.matched = true;
      selected = [];
      matches += 1;
      status.textContent = isVictory(deck) ? `Victory in ${moves} moves.` : "Match found. Royal composure maintained.";
      return;
    }
    lockBoard = true;
    status.textContent = "Not a match. The stage resets.";
    window.setTimeout(() => {
      first.flipped = false;
      second.flipped = false;
      selected = [];
      lockBoard = false;
      render();
    }, 720);
  }

  function startGame() {
    deck = createDeck();
    selected = [];
    lockBoard = false;
    moves = 0;
    matches = 0;
    status.textContent = "Choose two cards.";
    render();
  }

  restart.addEventListener("click", startGame);
  startGame();
})();
