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
    let newShip = gameBoard.placeShip(2, {x: 0, y: 0})
    let newBoard = gameBoard.getBoard();
    expect(newBoard[0]).toBe(newShip);
    expect(newBoard[1]).toBe(newShip);
    expect(newBoard[1].getLength()).toBe(2);
})

test('can not place multiple ships on same position', () => {
    let gameBoard = GameboardFactory(10);
    gameBoard.placeShip(2, {x: 0, y: 0});
    expect(() => gameBoard.placeShip(2, {x: 0, y: 0})).toThrow();
})

test('can not place ship outside of board', () => {
    let gameBoard = GameboardFactory(10);
    expect(() => gameBoard.placeShip(2, {x: 11, y: 0})).toThrow();
    expect(() => gameBoard.placeShip(2, {x: 9, y: 0})).toThrow();
    expect(() => gameBoard.placeShip(2, {x: 8, y: 0})).not.toThrow();
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

test('can generate a gameboard automatically', () => {
    let gameBoard = GameboardFactory(10);
    expect(gameBoard.generateBoard).toBeDefined();
    const ships = gameBoard.generateBoard();
    expect(ships).toBeDefined();
    expect(ships.length).toBeGreaterThan(0);
    expect(ships[0].x).toBeDefined();
    expect(ships[0].y).toBeDefined();
})

test('can get x,y from index', () => {
    let gameBoard = GameboardFactory();
    expect(gameBoard.getCoordsFromIndex(99)).toEqual([9,9]);
    expect(gameBoard.getCoordsFromIndex(23)).toEqual([3,2]);
    expect(gameBoard.getCoordsFromIndex(0)).toEqual([0,0]);
});

test('can get list of ships', () => {
    let gameBoard = GameboardFactory();
    expect(gameBoard.getShips).toBeDefined();
    let newShip = gameBoard.placeShip(2, {x: 0, y: 0});
    expect(gameBoard.getShips()[0]).toBe(newShip);
})

test('can check if hit exists', () => {
    let gameBoard = GameboardFactory();
    let newShip = gameBoard.placeShip(2, {x: 0, y: 0});
    gameBoard.receiveAttack(0,0);
    expect(gameBoard.hitExists([0,0])).toBe(true);
})

test('can check if miss exists', () => {
    let gameBoard = GameboardFactory();
    gameBoard.receiveAttack(0,0);
    expect(gameBoard.missExists([0,0])).toBe(true);
})