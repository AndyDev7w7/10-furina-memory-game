import assert from "node:assert/strict";
import { checkMatch, createDeck, isVictory, shuffle } from "../src/gameLogic.js";

const deck = createDeck(["A", "B"], () => 0.5);
assert.equal(deck.length, 4);
assert.equal(deck.filter((card) => card.symbol === "A").length, 2);
assert.equal(checkMatch({ id: "a1", symbol: "A" }, { id: "a2", symbol: "A" }), true);
assert.equal(checkMatch({ id: "a1", symbol: "A" }, { id: "a1", symbol: "A" }), false);
assert.equal(isVictory(deck.map((card) => ({ ...card, matched: true }))), true);
assert.deepEqual(shuffle([1, 2, 3], () => 0), [2, 3, 1]);

console.log("Furina Memory tests passed");
