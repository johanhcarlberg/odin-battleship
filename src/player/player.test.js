import { test, expect } from '@jest/globals';
import { GameboardFactory } from '../gameboard/gameboard';
import { Player, AIPlayer } from './player';

test('can create player', () => {
    const player = Player();
    expect(player).toBeDefined();
})

test('player has gameboard', () => {
    const player = Player();
    expect(player.gameBoard).toBeDefined();
    expect(player.gameBoard.getBoard().length).toBe(100);
})

test('AI player has gameboard', () => {
    const aiPlayer = AIPlayer();
    expect(aiPlayer.gameBoard).toBeDefined();
    expect(aiPlayer.gameBoard.getBoard().length).toBe(100);
})

test('AI player can generate attacks', () => {
    const aiPlayer = AIPlayer();
    expect(aiPlayer.getNextAttack).toBeDefined();
    let firstAttack = aiPlayer.getNextAttack();
    let secondAttack = aiPlayer.getNextAttack();
    expect(firstAttack).not.toEqual(secondAttack);
    expect(firstAttack.x).toBeGreaterThanOrEqual(0);
    expect(firstAttack.x).toBeLessThan(10);
})

test('AI player can attack', () => {
    const aiPlayer = AIPlayer();
    const gameboard = GameboardFactory();
    expect(gameboard.getMissedShots().length).toBe(0);
    const attack = aiPlayer.getNextAttack();
    gameboard.receiveAttack(attack.x, attack.y);
    expect(gameboard.getMissedShots().length).toBe(1);
})

test('can get current player status', () => {
    const player = Player();
    expect(player.getIsCurrentPlayer()).toBe(false);
})

test('can set current player status', () => {
    const player = Player();
    expect(player.getIsCurrentPlayer()).toBe(false);
    player.setIsCurrentPlayer(true);
    expect(player.getIsCurrentPlayer()).toBe(true);
})

test('can toggle current player status', () => {
    const player = Player();
    expect(player.getIsCurrentPlayer()).toBe(false);
    player.toggleIsCurrentPlayer();
    expect(player.getIsCurrentPlayer()).toBe(true);
})

test('Saves AI attacks in array', () => {
    const aiPlayer = AIPlayer();
    expect(aiPlayer.getPerformedAttacks().length).toBe(0);
    aiPlayer.getNextAttack();
    expect(aiPlayer.getPerformedAttacks().length).toBe(1);
})

test('can check if player is AI', () => {
    const aiPlayer = AIPlayer();
    expect(aiPlayer.isAI).toBe(true);
})

test('AI player has queue for attacks', () => {
    const aiPlayer = AIPlayer();
    expect(aiPlayer.getQueuedAttacks().length).toBe(0);
})

test('AI player can queue attacks', () => {
    const aiPlayer = AIPlayer();
    expect(aiPlayer.getQueuedAttacks().length).toBe(0);
    aiPlayer.queueAttack(0, 0);
    expect(aiPlayer.getQueuedAttacks().length).toBe(1);
})

test('AI player uses queued attacks first', () => {
    const aiPlayer = AIPlayer();
    aiPlayer.queueAttack(0,0);
    expect(aiPlayer.getNextAttack()).toEqual({x: 0, y: 0});
    expect(aiPlayer.getQueuedAttacks().length).toBe(0);
    expect(aiPlayer.getPerformedAttacks().length).toBe(1);
})

test('AI player cannot queue same attack multiple times', () => {
    const aiPlayer = AIPlayer();
    aiPlayer.queueAttack(0,0);
    aiPlayer.queueAttack(0,0);
    expect(aiPlayer.getQueuedAttacks().length).toBe(1);
})

test('can reset AI player state', () => {
    const aiPlayer = AIPlayer();
    aiPlayer.queueAttack(0,0);
    aiPlayer.getNextAttack();
    expect(aiPlayer.getPerformedAttacks().length).toBe(1);
    aiPlayer.reset();
    expect(aiPlayer.getPerformedAttacks().length).toBe(0);
})