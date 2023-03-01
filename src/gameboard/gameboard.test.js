import { test, expect } from '@jest/globals';
import { GameboardFactory } from './gameboard'

test('can create gameboard', () => {
    let gameBoard = GameboardFactory();
    expect(gameBoard).toBeDefined();
});

test('can create gameboard with specified length', () => {
    let gameBoard = GameboardFactory(10);
    expect(gameBoard.getBoard()).toHaveLength(100);
})