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

test('can place ships', () => {
    let gameBoard = GameboardFactory(10);
    expect(gameBoard[0]).toBeUndefined();
    let newBoard = gameBoard.placeShip(2, {x: 0, y: 0})
    expect(newBoard[0]).toBeDefined();
    expect(newBoard[1]).toBeDefined();
    expect(newBoard[1].getLength()).toBe(2);
})

test('can receive attacks', () => {
    let gameBoard = GameboardFactory(10);
    gameBoard.receiveAttack(0, 0);
    let missedShots = gameBoard.getMissedShots();
    expect(missedShots[0]).toEqual([0,0]);
    gameBoard.receiveAttack(1,1);
    missedShots = gameBoard.getMissedShots();
    expect(missedShots[1]).toEqual([1,1]);
})



test('ship receives attack', () => {
    let gameBoard = GameboardFactory(10);
    gameBoard.placeShip(2, {x: 0, y: 0});
    gameBoard.receiveAttack(0, 0);
    let pos = gameBoard.getPos(0, 0);
    const ship = gameBoard.getBoard()[pos];
    expect(ship.getTimesHit()).toBe(1);
})

test('ship cannot receive multiple attacks on same position', () => {
    let gameBoard = GameboardFactory(10);
    gameBoard.placeShip(2, {x: 0, y: 0});
    gameBoard.receiveAttack(0, 0);
    gameBoard.receiveAttack(0, 0);
    let pos = gameBoard.getPos(0, 0);
    const ship = gameBoard.getBoard()[pos];
    expect(ship.getTimesHit()).toBe(1);
})

test('check if single ship is sunk', () => {
    let gameBoard = GameboardFactory(10);
    gameBoard.placeShip(2, {x: 0, y: 0});
    expect(gameBoard.isAllSunk()).toBe(false);
    gameBoard.receiveAttack(0,0);
    gameBoard.receiveAttack(1,0);
    expect(gameBoard.isAllSunk()).toBe(true);
})

test('check if multiple ships are sunk', () => {
    let gameBoard = GameboardFactory(10);
    gameBoard.placeShip(2, {x: 0, y: 0});
    gameBoard.placeShip(2, {x: 0, y: 1});
    expect(gameBoard.isAllSunk()).toBe(false);
    gameBoard.receiveAttack(0,0);
    gameBoard.receiveAttack(1,0);
    expect(gameBoard.isAllSunk()).toBe(false);
    gameBoard.receiveAttack(0,1);
    gameBoard.receiveAttack(1,1);
    expect(gameBoard.isAllSunk()).toBe(true);
})