import { test, expect } from '@jest/globals';
import { GameboardFactory } from './gameboard'

test('can create gameboard', () => {
    let gameBoard = GameboardFactory();
    expect(gameBoard).toBeDefined();
});

test('can create gameboard with specified length', () => {
    const length = 12;
    let gameBoard = GameboardFactory(length);
    expect(gameBoard.getBoard()).toHaveLength(length * length);
})