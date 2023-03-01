import {describe, expect, test} from '@jest/globals';
import { ShipFactory } from './ship';

test('can create ship objects', () => {
    expect(ShipFactory()).toBeDefined();
})

test('can create ships with speciefied length', () => {
    const ship = ShipFactory(2);
    expect(ship.getLength()).toBe(2);
})

test('returns number of times ship has been hit', () => {
    const ship = ShipFactory();
    expect(ship.getTimesHit()).toBe(0);
})

test('returns ship state property', () => {
    const ship = ShipFactory();
    expect(ship.getIsAlive()).toBe(true);
})

test('can take hits and increases hits taken', () => {
    const ship = ShipFactory();
    ship.hit();
    expect(ship.getTimesHit()).toBe(1);
})

test('can be destroyed', () => {
    const ship = ShipFactory();
    ship.hit();
    ship.hit();
    expect(ship.getIsAlive()).toBe(false);
})

test('can only take hits when alive', () => {
    const ship = ShipFactory(2);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.getTimesHit()).toBe(2);
})