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

test('can get array index from x and y coordinates', () => {
    let gameBoard = GameboardFactory(10);
    expect(gameBoard.getPos(0, 0)).toBe(0);
    expect(gameBoard.getPos(0, 1)).toBe(10);
    expect(gameBoard.getPos(0, 2)).toBe(20);
    expect(gameBoard.getPos(5, 1)).toBe(15);
})