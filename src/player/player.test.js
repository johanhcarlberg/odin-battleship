import { test, expect } from '@jest/globals';
import { Player } from './player';

test('can create player', () => {
    const player = Player();
    expect(player).toBeDefined();
})

test('player has gameboard', () => {
    const player = Player();
    expect(player.gameBoard).toBeDefined();
    expect(player.gameBoard.getBoard().length).toBe(100);
})